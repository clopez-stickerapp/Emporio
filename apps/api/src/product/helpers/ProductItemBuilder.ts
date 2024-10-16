import { ProductFamily } from '../ProductFamily';
import { Product } from '../Product';
import { ProductItem, AttributesMap, ProductAttrComputer } from '@stickerapp-org/nomisma';
import { toArray } from '../../../Util';

export class ProductItemBuilder {
	// TODO: Replace ProductItemBuilder with a single function "createItem" ?
	protected computer: ProductAttrComputer = new ProductAttrComputer();

	public createItem(productFamily: ProductFamily, product: Product, map: AttributesMap, useFilters: boolean = true): ProductItem {
		const attributes = productFamily.attributes.getAll();
		const item = new ProductItem(productFamily.getName(), product.getName());

		for (const [attrName, attribute] of Object.entries(attributes)) {
			const attrValueOnFamily = attribute.attrValue;
			const attrValueOnProduct = product.attributes.getValue(attrName);
			for (const value of [attrValueOnProduct, attrValueOnFamily].filter((v) => v !== undefined).map(toArray)) {
				item.setAttribute(attrName, attribute.instance.isMultiValue() ? value : value[0]);
				break;
			}
		}

		this.computer.evaluate(item, map, useFilters);

		for (const { instance } of Object.values(attributes).filter((attr) => attr.required && !item.hasAttribute(attr.instance.getName()))) {
			const attrValue = this.computer.getDefaultValue(instance.getName()) ?? [];
			if (!Array.isArray(attrValue)) {
				item.setAttribute(instance.getName(), attrValue);
				this.computer.evaluate(item, map, useFilters);
			}
		}

		return item;
	}
}
