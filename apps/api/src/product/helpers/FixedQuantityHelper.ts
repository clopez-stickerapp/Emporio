import { FixedQuantityAttribute } from "$/configuration/Attribute/FixedQuantityAttribute";
import { ProductItem } from "../ProductItem";
import { ProductAttrComputer } from "./ProductAttrComputer";

export class FixedQuantityHelper
{
	public fixedQuantity: boolean = false;

	public constructor( protected attrComputer: ProductAttrComputer, protected productItem: ProductItem ) {}

	public evaluate(): void
	{
		let fixedQuantity: boolean | null = null;

		if ( this.productItem.hasAttribute( FixedQuantityAttribute.ALIAS ) )
		{
			fixedQuantity = this.productItem.getAttribute<boolean>( FixedQuantityAttribute.ALIAS ) ?? null;
		}

		if ( fixedQuantity === null )
		{
			fixedQuantity = this.attrComputer.isInFilteredValues( FixedQuantityAttribute.ALIAS, true );
		}

		this.fixedQuantity = fixedQuantity;
	}
}