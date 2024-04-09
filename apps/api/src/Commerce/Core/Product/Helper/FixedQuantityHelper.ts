import { FixedQuantityAttribute } from "$/Commerce/Product/Attribute/FixedQuantityAttribute";
import { ProductItem } from "../Item/ProductItem";
import { ProductAttrComputer } from "./ProductAttrComputer";

export class FixedQuantityHelper
{
	public fixedQuantity: boolean | null = null;

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