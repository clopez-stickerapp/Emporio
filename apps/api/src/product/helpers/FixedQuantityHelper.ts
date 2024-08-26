import { FixedQuantityAttribute } from "$/configuration/attributes/FixedQuantityAttribute";
import { ProductAttrComputer, ProductItem } from "@stickerapp-org/nomisma";

export class FixedQuantityHelper
{
	public fixedQuantity: boolean = false;

	public constructor( protected attrComputer: ProductAttrComputer, protected productItem: ProductItem ) {}

	public evaluate(): void
	{
		let fixedQuantity: boolean | null = null;

		if ( this.productItem.hasAttribute( FixedQuantityAttribute.getName() ) )
		{
			fixedQuantity = this.productItem.getAttribute<boolean>( FixedQuantityAttribute.getName() ) ?? null;
		}

		if ( fixedQuantity === null )
		{
			fixedQuantity = this.attrComputer.isInFilteredValues( FixedQuantityAttribute.getName(), true );
		}

		this.fixedQuantity = fixedQuantity;
	}
}