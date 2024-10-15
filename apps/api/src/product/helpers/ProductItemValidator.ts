import { ProductService } from '../ProductService';
import { ProductAttrNotSupportedException } from '$/product/exceptions/ProductAttrNotSupportedException';
import { ProductAttrValueNotSupportedException } from '$/product/exceptions/ProductAttrValueNotSupportedException';
import { ProductItemInvalidException } from '$/product/exceptions/ProductItemInvalidException';
import { ProductItemOutOfStockException } from '$/product/exceptions/ProductItemOutOfStockException';
import { isEmpty, toArray } from '../../../Util';
import { ProductAttrConstraint } from '../attribute/Constraint/ProductAttrConstraint';
import { ProductAttrAsset } from '../attribute/Asset/ProductAttrAsset';
import { CollectionType } from '$/configuration/interface/CollectionConfig';
import { ProductAttrComputer, ProductItem } from '@stickerapp-org/nomisma';
import { ProductFamily } from '../ProductFamily';

export class ProductItemValidator {
	protected ps: ProductService;
	protected attrComputer: ProductAttrComputer;

	public constructor(ps: ProductService) {
		this.ps = ps;
		this.attrComputer = new ProductAttrComputer();
	}

	/**
	 * Validates a ProductItem. If invalid, an error will be thrown.
	 *
	 * @param item The ProductItem to validate.
	 * @param allowUnsupportedAttributeAliases Determines whether it should allow unsupported attribute aliases.
	 * @param allowUnsuggestedAttributeValues Determines whether it should allow unsuggested attribute values.
	 * @param checkAgainstFilteredValues Determines whether it should check against filtered values. Will be applied only if allowUnsuggestedAttributeValues is set to false.
	 */
	public validate(
		item: ProductItem,
		allowUnsupportedAttributeAliases: boolean = true,
		allowUnsuggestedAttributeValues: boolean = false,
		checkAgainstFilteredValues: boolean = true,
	): void {
		const map = this.ps.getProductMap(item.getProductFamilyName(), item.getProductName());

		this.attrComputer.evaluate(item, map, checkAgainstFilteredValues);

		const productFamily = this.ps.retrieveProductFamily(item.getProductFamilyName());
		const product = productFamily.getProduct(item.getProductName());

		if (productFamily.calculateUnits(item) <= 0) {
			throw new ProductItemInvalidException("Item units can't be zero.");
		}

		for (const instance of [product, productFamily]) {
			const test = () => {
				try {
					return instance.attributes.test(item.getAttributes());
				} catch (e) {
					return false;
				}
			};

			if (!test()) {
				const errors: string[] = [];

				for (const [attrName, attribute] of Object.entries(instance.attributes.getAll())) {
					const attrValueRequired = attribute.attrValue;
					if (attrValueRequired !== undefined) {
						const attrValueOnItem = item.getAttribute(attrName) ?? [];
						const requireAll = attribute.requireAll && attribute.instance.isMultiValue();
						const valid = toArray(attrValueRequired)[requireAll ? 'every' : 'some']((value) => toArray(attrValueOnItem).includes(value));
						if (!valid) {
							let error = `${attrName} must ${attribute.instance.isMultiValue() ? 'include ' : 'be '}`;
							if (Array.isArray(attrValueRequired)) {
								error += (requireAll ? 'all ' : 'one ') + 'of the following: ';
							}
							error += toArray(attrValueRequired).join(', ');
							errors.push(error);
						}
					}
				}

				const title = `Attributes don't match ${instance instanceof ProductFamily ? 'family' : 'product'} recipe`;
				throw new ProductItemInvalidException(`${title} - ${errors.map((e) => `${e}`).join('; ')}`);
			}
		}

		const assets = this.ps.retrieveCollection<ProductAttrAsset>(CollectionType.Asset, productFamily.getAssetCollectionName())?.getAll();

		for (let [attrName, value] of Object.entries(item.getAttributes())) {
			if (Array.isArray(value)) {
				value = value.filter((v) => !isEmpty(v));
			}

			const attr = productFamily.attributes.get(attrName)?.instance;

			if (!attr) {
				if (!allowUnsupportedAttributeAliases) {
					throw new ProductAttrNotSupportedException(`Attribute name "${attrName}" is not supported by family`);
				}

				continue;
			}

			if (attr.canBe(value)) {
				const attrValues = Array.isArray(value) ? value : [value];

				if (!allowUnsuggestedAttributeValues && !isEmpty(value) && !attr.isDynamicValue()) {
					for (const attrValue of attrValues) {
						if (!this.attrComputer.isInSuggestedValues(attrName, attrValue)) {
							throw new ProductAttrValueNotSupportedException(`"${attrValue}" is not suggested as ${attrName}`);
						}
					}
				}

				for (const attrValue of attrValues) {
					const productAttrValue = attr.getAttrValue(attrValue);

					if (
						productAttrValue &&
						this.ps
							.retrieveCollection<ProductAttrConstraint>(CollectionType.Constraint, productFamily.getConstraintsCollectionName())
							?.get(attrName)
							?.getConstraint(productAttrValue)
							?.testOnItem(item) === false
					) {
						throw new ProductItemInvalidException(`Failed due to constraints related to "${productAttrValue}" (${attrName})`);
					}
				}

				if (assets && attrName in assets) {
					const asset = assets[attrName];

					for (const attrValue of attrValues) {
						if (!asset.isAvailable(attrValue)) {
							throw new ProductItemOutOfStockException(`${attrName} "${attrValue}" is out of stock`);
						}
					}
				}
			}
		}
	}
}
