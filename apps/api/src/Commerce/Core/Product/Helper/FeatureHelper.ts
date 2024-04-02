import { FeatureAttribute } from "../../../Product/Attribute/Sticker/FeatureAttribute";
import { ProductItem } from "../Item/ProductItem";
import { MultiValueHelper } from "./MultiValueHelper";
import { ProductAttrComputer } from "./ProductAttrComputer";

export class FeatureHelper extends MultiValueHelper
{
    public constructor( protected attrComputer: ProductAttrComputer, protected item: ProductItem )
	{
		super( item, FeatureAttribute.ALIAS );
	}

    public doesSupportEffectLayer(): boolean
    {
		return this.attrComputer.isAvailable( FeatureAttribute.ALIAS, FeatureAttribute.EFFECT_LAYER );
    }

    public doesSupportFeature( feature: string ): boolean
    {
		return this.attrComputer.isAvailable( FeatureAttribute.ALIAS, feature );
    }

    public setFeature( featureName: string, value: boolean ): void
    {
		this.insertOrDeleteOne( featureName, value );
    }

	public hasFeature( featureName: string ): boolean
	{
		return this.has( featureName );
	}
}
