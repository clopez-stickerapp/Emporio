import { MinUnitsConfig } from "$/configuration/interface/MinUnitsConfig";
import { ProductDynamicValue } from "$/product/value/ProductDynamicValue";

export class MinimumUnitsCollection extends ProductDynamicValue{
	protected collectionName: string;

	public constructor( config: MinUnitsConfig ) {
		super( config );

		this.collectionName = config.name;
	}

	public getCollectionName(): string {
		return this.collectionName;
	}
}
