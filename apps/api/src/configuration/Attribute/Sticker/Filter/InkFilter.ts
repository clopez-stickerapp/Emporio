import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ProductAttrFilter } from "$/product/attribute/Filter/ProductAttrFilter";
import { InkAttribute } from "../InkAttribute";
import { LaminateAttribute } from "../LaminateAttribute";

export class InkFilter extends ProductAttrFilter {
    public constructor() {
        super( InkAttribute.ALIAS );

        this.createFilter( [] );

        this.createFilter( [
            InkAttribute.INVISIBLE_INK,
            InkAttribute.PINK_INK
		] )
			.conditionBuilder
			.addCondition( "item.attributes.laminate", ConditionOperators.IN, [
				LaminateAttribute.GLOSSY_NO_UV,
				LaminateAttribute.UNCOATED
			] );
    }
}
