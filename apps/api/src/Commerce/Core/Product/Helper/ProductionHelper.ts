import { DeliveryRollItemMarginAttribute } from "../../../Product/Attribute/DeliveryRollItemMarginAttribute";
import { DeliveryRollTopEdgeMarginAttribute } from "../../../Product/Attribute/DeliveryRollTopEdgeMarginAttribute";
import { CutDirectionAttribute } from "../../../Product/Attribute/Sticker/CutDirectionAttribute";
import { DeliveryAttribute } from "../../../Product/Attribute/Sticker/DeliveryAttribute";
import { ProductionLineAttribute } from "../../../Product/Attribute/Sticker/ProductionLineAttribute";
import { WhiteLayerAttribute } from "../../../Product/Attribute/Sticker/WhiteLayerAttribute";
import { ProductService } from "../../ProductService";
import { ProductItem } from "../Item/ProductItem";
import { FeatureHelper } from "./FeatureHelper";
import { ProductAttrComputer } from "./ProductAttrComputer";

export class ProductionHelper
{
    public constructor( 
		protected ps:            ProductService, 
		protected attrComputer:  ProductAttrComputer, 
		protected item:          ProductItem, 
		protected featureHelper: FeatureHelper 
	) {}

    /**
     * Will unset production settings if the product doesn't have a recommended production setting.
     */
    public unsetSettingsAutomatically(): void
    {
        if ( !this.isRecommended( ProductionLineAttribute.ALIAS ) )
        {
            this.item.removeAttribute( ProductionLineAttribute.ALIAS );
        }

        if ( !this.isRecommended( DeliveryAttribute.ALIAS ) )
        {
            this.item.removeAttribute( DeliveryAttribute.ALIAS );
        }

        if ( !this.isRecommended( WhiteLayerAttribute.ALIAS ) )
        {
            this.item.removeAttribute( WhiteLayerAttribute.ALIAS );
        }

        if ( !this.isRecommended( CutDirectionAttribute.ALIAS ) )
        {
            this.item.removeAttribute( CutDirectionAttribute.ALIAS );
        }
    }

    /**
     * Will automatically detect production settings (if missing) that are required by Magnus and his team.
     * 
     * @return void
     */
    public setSettingsAutomatically(): void
    {
		if ( !this.getProductionLine() && this.attrComputer.isSupported( ProductionLineAttribute.ALIAS ) )
        {
			const productionLine = this.detectSuitableProductionLine();

			if ( productionLine )
			{
				this.setProductionLine( productionLine );
			}
        }

        if ( !this.getDelivery() && this.attrComputer.isSupported( DeliveryAttribute.ALIAS ) )
        {
			const delivery = this.detectSuitableDelivery();

			if ( delivery )
			{
				this.setDelivery( delivery );
			}
        }

        if ( !this.getWhiteLayerSetting() && this.attrComputer.isSupported( WhiteLayerAttribute.ALIAS ) )
        {
			const whiteLayerSetting = this.detectSuitableWhiteLayerSetting();

			if ( whiteLayerSetting )
			{
				this.setWhiteLayerSetting( whiteLayerSetting );
			}
        }
        else if ( this.getWhiteLayerSetting() && !this.featureHelper.doesSupportEffectLayer() )
        {
            this.item.removeAttribute( WhiteLayerAttribute.ALIAS );
        }

        if ( !this.getCutDirection() && this.attrComputer.isSupported( CutDirectionAttribute.ALIAS ) )
        {
			const cutDirection = this.detectSuitableCutDirection();

			if ( cutDirection )
			{
				this.setCutDirection( cutDirection );
			}
        }
    }

    public detectSuitableProductionLine(): string | null
    {
		if ( this.attrComputer.isAvailable( ProductionLineAttribute.ALIAS, ProductionLineAttribute.LASER ) )
		{
			return ProductionLineAttribute.LASER;
		}

		return this.attrComputer.getDefaultValue( ProductionLineAttribute.ALIAS );
    }

    public detectSuitableDelivery(): string | null
    {
		// TODO: Should probably check the product for the recommended value first.
		if ( this.attrComputer.isAvailable( DeliveryAttribute.ALIAS, DeliveryAttribute.DELIVERY_SINGLE ) )
		{
			return DeliveryAttribute.DELIVERY_SINGLE;
		}

		return this.attrComputer.getDefaultValue( DeliveryAttribute.ALIAS );
    }

    public detectSuitableWhiteLayerSetting(): string | null
    {
		if ( this.featureHelper.doesSupportEffectLayer() && this.attrComputer.isAvailable( WhiteLayerAttribute.ALIAS, WhiteLayerAttribute.ALPHA ) )
		{
			return WhiteLayerAttribute.ALPHA;
		}

		return null;
    }

    public detectSuitableCutDirection(): string | null
    {
		if ( this.attrComputer.isAvailable( CutDirectionAttribute.ALIAS, CutDirectionAttribute.AUTO ) )
		{
			return CutDirectionAttribute.AUTO;
		}

		return this.attrComputer.getDefaultValue( CutDirectionAttribute.ALIAS );
    }

	// TODO: Move to ProductAttrComputer?
	private isRecommended( attributeName: string ): boolean 
	{
		if ( this.attrComputer.isRequired( attributeName ) )
		{
			return true;
		}
		else if ( this.attrComputer.isSupported( attributeName ) )
		{
			const product = this.ps.findProduct( this.item.getProductFamilyName(), this.item.getProductName() );
			
			return product.isAttrRecommendedFor( attributeName );
		}

		return false;
	}

    /* SET AND GET */
    public getWhiteLayerSetting(): string | undefined
    {
        return this.item.getAttribute( WhiteLayerAttribute.ALIAS );
    }

    public setWhiteLayerSetting( value: string ): void
    {
        this.item.setAttribute( WhiteLayerAttribute.ALIAS, value );
    }

    public getCutDirection(): string | undefined
    {
        return this.item.getAttribute( CutDirectionAttribute.ALIAS );
    }

    public setCutDirection( value: string ): void
    {
        this.item.setAttribute( CutDirectionAttribute.ALIAS, value );
    }

    public getDelivery(): string | undefined
    {
        return this.item.getAttribute( DeliveryAttribute.ALIAS );
    }

    public setDelivery( value: string ): void
    {
        this.item.setAttribute( DeliveryAttribute.ALIAS, value );
    }

    public getProductionLine(): string | undefined
    {
        return this.item.getAttribute( ProductionLineAttribute.ALIAS );
    }

    public setProductionLine( value: string ): void
    {
        this.item.setAttribute( ProductionLineAttribute.ALIAS, value );
    }

    public getDeliveryRollItemMargin(): number | undefined
    {
        return this.item.getAttribute( DeliveryRollItemMarginAttribute.ALIAS );
    }

    public setDeliveryRollItemMargin( value: number ): void
    {
        this.item.setAttribute( DeliveryRollItemMarginAttribute.ALIAS, value );
    }

    public getDeliveryRollTopEdgeMargin(): number | undefined
    {
        return this.item.getAttribute( DeliveryRollTopEdgeMarginAttribute.ALIAS );
    }

    public setDeliveryRollTopEdgeMargin( value: number ): void
    {
        this.item.setAttribute( DeliveryRollTopEdgeMarginAttribute.ALIAS, value );
    }
}
