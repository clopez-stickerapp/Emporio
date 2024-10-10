import { ProductService } from '../ProductService';
import { ProductItem, ProductAttrComputer, ProductItemHelper } from '@stickerapp-org/nomisma';
import { ProductionLineAttribute, ProductionLines } from '$/configuration/attributes/ProductionLineAttribute';
import { CutDirectionAttribute, CutDirectionAttributeValues } from '$/configuration/attributes/CutDirectionAttribute';
import { DeliveryAttribute, DeliveryTypes } from '$/configuration/attributes/DeliveryAttribute';
import { WhiteLayerAttribute, WhiteLayerValues } from '$/configuration/attributes/WhiteLayerAttribute';
import { FeatureAttribute, ProductFeatures } from '$/configuration/attributes/FeatureAttribute';
import { ProductNames } from '$data/ConditionValueResolver';

export class ProductionHelper {
	private itemHelper: ProductItemHelper;

	public constructor(
		protected ps: ProductService,
		protected attrComputer: ProductAttrComputer,
		protected item: ProductItem,
	) {
		this.itemHelper = new ProductItemHelper(this.item);
	}

	/**
	 * Will unset production settings if the product doesn't have a recommended production setting.
	 */
	public unsetSettingsAutomatically(): void {
		if (!this.isRecommended(ProductionLineAttribute.getName())) {
			this.item.removeAttribute(ProductionLineAttribute.getName());
		}

		if (!this.isRecommended(DeliveryAttribute.getName())) {
			this.item.removeAttribute(DeliveryAttribute.getName());
		}

		if (!this.isRecommended(WhiteLayerAttribute.getName())) {
			this.item.removeAttribute(WhiteLayerAttribute.getName());
		}

		// TEMPORARY SOLUTION
		// We don't want to remove cut direction for labels_on_roll products. When PIM
		// is in place, we'll add cut_direction as a required attribute on the family,
		// which will remove the need for checking the product name.
		if (!this.isRecommended(CutDirectionAttribute.getName()) && this.item.getProductName() !== ProductNames.PRODUCT_LABELS_ON_ROLL) {
			this.item.removeAttribute(CutDirectionAttribute.getName());
		}
	}

	/**
	 * Will automatically detect production settings (if missing) that are required by Magnus and his team.
	 *
	 * @return void
	 */
	public setSettingsAutomatically(): void {
		if (!this.itemHelper.getProductionLine() && this.attrComputer.isSupported(ProductionLineAttribute.getName())) {
			const productionLine = this.detectSuitableProductionLine();

			if (productionLine) {
				this.itemHelper.setProductionLine(productionLine);
			}
		}

		if (!this.itemHelper.getDelivery() && this.attrComputer.isSupported(DeliveryAttribute.getName())) {
			const delivery = this.detectSuitableDelivery();

			if (delivery) {
				this.itemHelper.setDelivery(delivery);
			}
		}

		if (!this.itemHelper.getWhiteLayer() && this.attrComputer.isSupported(WhiteLayerAttribute.getName())) {
			const whiteLayerSetting = this.detectSuitableWhiteLayerSetting();

			if (whiteLayerSetting) {
				this.itemHelper.setWhiteLayer(whiteLayerSetting);
			}
		} else if (this.itemHelper.getWhiteLayer() && !this.attrComputer.isAvailable(FeatureAttribute.getName(), ProductFeatures.EFFECT_LAYER)) {
			this.item.removeAttribute(WhiteLayerAttribute.getName());
		}

		if (!this.itemHelper.getCutDirection() && this.attrComputer.isSupported(CutDirectionAttribute.getName())) {
			const cutDirection = this.detectSuitableCutDirection();

			if (cutDirection) {
				this.itemHelper.setCutDirection(cutDirection);
			}
		}
	}

	public detectSuitableProductionLine(): string | null {
		if (this.attrComputer.isAvailable(ProductionLineAttribute.getName(), ProductionLines.LASER)) {
			return ProductionLines.LASER;
		}

		return this.attrComputer.getDefaultValue(ProductionLineAttribute.getName());
	}

	public detectSuitableDelivery(): string | null {
		// TODO: Should probably check the product for the recommended value first.
		if (this.attrComputer.isAvailable(DeliveryAttribute.getName(), DeliveryTypes.SINGLE)) {
			return DeliveryTypes.SINGLE;
		}

		return this.attrComputer.getDefaultValue(DeliveryAttribute.getName());
	}

	public detectSuitableWhiteLayerSetting(): string | null {
		if (
			this.attrComputer.isAvailable(FeatureAttribute.getName(), ProductFeatures.EFFECT_LAYER) &&
			this.attrComputer.isAvailable(WhiteLayerAttribute.getName(), WhiteLayerValues.ALPHA)
		) {
			return WhiteLayerValues.ALPHA;
		}

		return null;
	}

	public detectSuitableCutDirection(): string | null {
		if (this.attrComputer.isAvailable(CutDirectionAttribute.getName(), CutDirectionAttributeValues.AUTO)) {
			return CutDirectionAttributeValues.AUTO;
		}

		return this.attrComputer.getDefaultValue(CutDirectionAttribute.getName());
	}

	// TODO: Move to ProductAttrComputer?
	private isRecommended(attributeName: string): boolean {
		if (this.attrComputer.isRequired(attributeName)) {
			return true;
		} else if (this.attrComputer.isSupported(attributeName)) {
			const product = this.ps.retrieveProductFamily(this.item.getProductFamilyName()).getProduct(this.item.getProductName());

			return product.getAttributeManager().has(attributeName);
		}

		return false;
	}
}
