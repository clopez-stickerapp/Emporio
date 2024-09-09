import { AssetConfig } from "$/configuration/interface/AssetConfig";
import { AttributeValueSingle } from "@stickerapp-org/nomisma";

export class ProductAttrAsset {
	protected name: string;
	protected assets: AssetConfig[ "values" ];

	public constructor( config: AssetConfig ) {
		this.name = config.name;
		this.assets = config.values;
	}

	public getWizardIcon( attributeValue: AttributeValueSingle ): string | undefined {
		return this.assets[ attributeValue.toString() ]?.images?.wizard;
	}

	public isAvailable( attributeValue: AttributeValueSingle ): boolean {
		return this.assets[ attributeValue.toString() ]?.available ?? true;
	}

	public getUnavailableValues(): string[] {
		return Object.keys( this.assets ).filter( attributeValue => !this.isAvailable( attributeValue ) );
	}

	public getAttributeName(): string {
		return this.name;
	}
}
