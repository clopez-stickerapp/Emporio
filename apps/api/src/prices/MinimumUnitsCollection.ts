import { DynamicValueConfig } from "$/configuration/interface/DynamicValueConfig";
import { ProductDynamicValue } from "$/product/value/ProductDynamicValue";

export class MinimumUnitsCollection extends ProductDynamicValue{
	protected collectionName: string;

	public constructor( config: DynamicValueConfig ) {
		super( config );

		this.collectionName = config.name;
	}

	public getCollectionName(): string {
		return this.collectionName;
	}
}
