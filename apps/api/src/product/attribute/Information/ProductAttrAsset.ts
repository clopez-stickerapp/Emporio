import { AssetConfig } from "$/configuration/interface/AssetConfig";
import { AttributeValueSingle } from "../AttributeValue";

export class ProductAttrAsset {
	public constructor( private config: AssetConfig ) {}

	public getWizardIcon( attributeValue: AttributeValueSingle ): string | undefined {
		return this.config.values[ attributeValue.toString() ]?.images?.wizard;
	}

	public isAvailable( attributeValue: AttributeValueSingle ): boolean {
		return this.config.values[ attributeValue.toString() ]?.available ?? true;
	}

	public getUnavailableValues(): string[] {
		return Object.keys( this.config.values ).filter( attributeValue => !this.isAvailable( attributeValue ) );
	}

	public getAttributeName(): string {
		return this.config.name;
	}
}
