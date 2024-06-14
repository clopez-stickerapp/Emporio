import { ProductService } from "../ProductService";
import { ProductItemConditionableParam } from "../condition/ProductItemConditionableParam";
import { ProductFamily } from "../ProductFamily";

export class ProductItemConditionablesMap {
	public map: Record<string, ProductItemConditionableParam> = {};

	public constructor(ps: ProductService, productFamily: ProductFamily) {
		const productNameConditionable = new ProductItemConditionableParam("item.productName", "Product name", false, false, "string");
		for (const product of Object.values(productFamily.getProducts())) {
			productNameConditionable.values.push(product.getName());
		}
		this.map['item.productName'] = productNameConditionable;
		const unitConditionable = new ProductItemConditionableParam("item.units", "Units", true, false, "float");
		this.map['item.units'] = unitConditionable;
		const attrs = [...Object.entries(productFamily.getRequiredAttrs()), ...Object.entries(productFamily.getSupportedAttrs())];
		for (const [alias, productAttrClassRef] of attrs) {
			const productAttr = ps.retrieveAttribute(productAttrClassRef);
			const values: string[] = [];
			for (const attrValue of productAttr.getValues()) {
				values.push(attrValue.getValue().toString());
			}
			const productAttrConditionable = new ProductItemConditionableParam(`item.attributes.${alias}`, alias, productAttr.isDynamicValue(), productAttr.isMultiValue(), productAttr.getValueType(), values);
			this.map[`item.attributes.${alias}`] = productAttrConditionable;
		}
	}
}