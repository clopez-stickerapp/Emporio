import { CutDirectionAttribute } from "../../../Product/Attribute/Sticker/CutDirectionAttribute";
import { DeliveryAttribute } from "../../../Product/Attribute/Sticker/DeliveryAttribute";
import { ProductionLineAttribute } from "../../../Product/Attribute/Sticker/ProductionLineAttribute";
import { WhiteLayerAttribute } from "../../../Product/Attribute/Sticker/WhiteLayerAttribute";
import { ProductService } from "../../ProductService";
import { ProductItem } from "../Item/ProductItem";
import { FeatureHelper } from "./FeatureHelper";
import { ProductAttrComputer } from "./ProductAttrComputer";
import { ProductItemHelper } from "./ProductItemHelper";

export class ProductionHelper
{
	private itemHelper: ProductItemHelper;

    public constructor( 
		protected ps:            ProductService, 
		protected attrComputer:  ProductAttrComputer, 
		protected item:          ProductItem, 
		protected featureHelper: FeatureHelper 
	)
	{
		this.itemHelper = new ProductItemHelper( this.item );
	}

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
		if ( !this.itemHelper.getProductionLine() && this.attrComputer.isSupported( ProductionLineAttribute.ALIAS ) )
        {
			const productionLine = this.detectSuitableProductionLine();

			if ( productionLine )
			{
				this.itemHelper.setProductionLine( productionLine );
			}
        }

        if ( !this.itemHelper.getDelivery() && this.attrComputer.isSupported( DeliveryAttribute.ALIAS ) )
        {
			const delivery = this.detectSuitableDelivery();

			if ( delivery )
			{
				this.itemHelper.setDelivery( delivery );
			}
        }

        if ( !this.itemHelper.getWhiteLayer() && this.attrComputer.isSupported( WhiteLayerAttribute.ALIAS ) )
        {
			const whiteLayerSetting = this.detectSuitableWhiteLayerSetting();

			if ( whiteLayerSetting )
			{
				this.itemHelper.setWhiteLayer( whiteLayerSetting );
			}
        }
        else if ( this.itemHelper.getWhiteLayer() && !this.featureHelper.doesSupportEffectLayer() )
        {
            this.item.removeAttribute( WhiteLayerAttribute.ALIAS );
        }

        if ( !this.itemHelper.getCutDirection() && this.attrComputer.isSupported( CutDirectionAttribute.ALIAS ) )
        {
			const cutDirection = this.detectSuitableCutDirection();

			if ( cutDirection )
			{
				this.itemHelper.setCutDirection( cutDirection );
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
}
