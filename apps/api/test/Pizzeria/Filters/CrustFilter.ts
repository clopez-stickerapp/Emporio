import { ProductAttrFilter } from "$/product/attribute/Filter/ProductAttrFilter";
import { ProductAttrFilterMode } from "$/product/attribute/Filter/ProductAttrFilterMode";
import { CrustAttribute, CrustValues } from "../Attributes/CrustAttribute";

export const CrustFilter = new ProductAttrFilter( {
	name: CrustAttribute.getName(),
	mode: ProductAttrFilterMode.MODE_HIGHEST_SCORE_WINS,
	rules: [ {
		keys: [ 
			CrustValues.THIN,
			CrustValues.THICK,
			CrustValues.STUFFED
		],
		conditions: {}
	} ]
} );