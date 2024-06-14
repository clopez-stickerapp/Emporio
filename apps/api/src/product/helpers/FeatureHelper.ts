import { FeatureAttribute } from "$/configuration/Attribute/Sticker/FeatureAttribute";
import { ProductItem } from "../ProductItem";
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
		return this.doesSupportFeature( FeatureAttribute.EFFECT_LAYER );
    }

    public doesSupportFeature( feature: string ): boolean
    {
		return this.attrComputer.isAvailable( FeatureAttribute.ALIAS, feature );
    }

    public setFeature( featureName: string, value: boolean ): void
    {
		if ( value )
		{
			this.insertOne( featureName );
		}
		else
		{
			this.deleteOne( featureName );
		}
    }
}
