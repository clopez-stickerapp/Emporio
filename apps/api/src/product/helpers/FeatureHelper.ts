import { FeatureAttribute, ProductFeatures } from "$/configuration/attributes/FeatureAttribute";
import { ProductAttrComputer, ProductItem, MultiValueHelper } from "@stickerapp-org/nomisma";

export class FeatureHelper extends MultiValueHelper
{
    public constructor( protected attrComputer: ProductAttrComputer, protected item: ProductItem )
	{
		super( item, FeatureAttribute.getName() );
	}

    public doesSupportEffectLayer(): boolean
    {
		return this.doesSupportFeature( ProductFeatures.EFFECT_LAYER );
    }

    public doesSupportFeature( feature: string ): boolean
    {
		return this.attrComputer.isAvailable( FeatureAttribute.getName(), feature );
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
