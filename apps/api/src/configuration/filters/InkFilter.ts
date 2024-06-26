import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ProductAttrFilter } from "$/product/attribute/Filter/ProductAttrFilter";
import { InkAttribute, InkValues } from "../../../attributes/InkAttribute";
import { LaminateValues } from "../../../attributes/LaminateAttribute";

export class InkFilter extends ProductAttrFilter {
    public constructor() {
        super( InkAttribute.getName() );

        this.createFilter( [] );

        this.createFilter( [
            InkValues.INVISIBLE_INK,
            InkValues.PINK_INK
		] )
			.conditionBuilder
			.addCondition( "item.attributes.laminate", ConditionOperators.IN, [
				LaminateValues.GLOSSY_NO_UV,
				LaminateValues.UNCOATED
			] );
    }
}
