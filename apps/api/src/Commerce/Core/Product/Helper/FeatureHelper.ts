import { FeatureAttribute } from "../../../Product/Attribute/Sticker/FeatureAttribute";
import { ProductItem } from "../Item/ProductItem";
import { ProductAttrComputer } from "./ProductAttrComputer";

export class FeatureHelper
{
    public constructor( protected attrComputer: ProductAttrComputer, protected item: ProductItem ) {}

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
        let features = this.getFeatures();

		if ( !value && features.length )
		{
			features = features.filter( feature => feature != featureName );
		}
		else if ( !features.includes( featureName ) )
		{
			features.push( featureName );
		}

		this.setFeatures( features );
    }

    public hasFeature( featureName: string ): boolean
    {
		return this.getFeatures().includes( featureName );
    }

	public getFeatures(): string[]
	{
		return this.item.getAttribute( FeatureAttribute.ALIAS ) ?? [];
	}

	public setFeatures( features: string[] ): void
	{
		this.item.setAttribute( FeatureAttribute.ALIAS, features );
	}
}
