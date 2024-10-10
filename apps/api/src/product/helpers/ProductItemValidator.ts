import { ProductService } from '../ProductService';
import { ProductAttrNotSupportedException } from '$/product/exceptions/ProductAttrNotSupportedException';
import { ProductAttrValueNotSupportedException } from '$/product/exceptions/ProductAttrValueNotSupportedException';
import { ProductItemInvalidException } from '$/product/exceptions/ProductItemInvalidException';
import { ProductItemOutOfStockException } from '$/product/exceptions/ProductItemOutOfStockException';
import { isEmpty } from '../../../Util';
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

    /**
     * TODO:
     * - Does units match? float / int
     * - Does attr match?
     */

    for (const instance of [productFamily, product]) {
      if (!instance.getAttributeManager().test(item.getAttributes())) {
        let msg: string = `Attributes don't match ${instance instanceof ProductFamily ? 'family' : 'product'} recipe - `;

        for (const [attrName, attrValue] of Object.entries(instance.getAttributeManager().getAllValues())) {
          if (attrValue !== undefined && attrValue !== item.getAttribute(attrName)) {
            const text = Array.isArray(attrValue) ? `one of the following: ${attrValue.join(', ')}` : `${attrValue}`;
            msg += `${attrName} must ${this.ps.retrieveAttribute(attrName).isMultiValue() ? 'include' : 'be'} ${text}`;
          }
        }

        throw new ProductItemInvalidException(msg);
      }
    }

    const assets = this.ps.retrieveCollection<ProductAttrAsset>(CollectionType.Asset, productFamily.getAssetCollectionName())?.getAll();

    for (let [attrName, value] of Object.entries(item.getAttributes())) {
      if (Array.isArray(value)) {
        value = value.filter((v) => !isEmpty(v));
      }

      if (!productFamily.getAttributeManager().has(attrName)) {
        if (!allowUnsupportedAttributeAliases) {
          throw new ProductAttrNotSupportedException(`Attribute name "${attrName}" is not supported by family`);
        }

        continue;
      }

      const attr = productFamily.getAttribute(attrName);

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
