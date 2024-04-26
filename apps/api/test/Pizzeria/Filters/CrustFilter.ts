import { ProductAttrFilter } from "../../../src/Commerce/Core/Product/Attribute/Filter/ProductAttrFilter";
import { CrustAttribute } from "../Attributes/CrustAttribute";

export class CrustFilter extends ProductAttrFilter {
	public constructor() {
		super( CrustAttribute.NAME );

		this.createFilter( [
			CrustAttribute.THIN,
			CrustAttribute.THICK,
			CrustAttribute.STUFFED,
		] );
	}
}