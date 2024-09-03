import { CollectionConfig, CollectionType } from "$/configuration/interface/CollectionConfig";

export type CollectionItem = { 
	getAttributeName(): string 
};

export class Collection<T extends CollectionItem> {
	protected name: string;
	protected type: CollectionType;
	protected values: Record<string, T> = {};

	public constructor( config: CollectionConfig ) {
		this.name = config.name;
		this.type = config.type;
	}

	public add( value: T ): T {
		if ( value.getAttributeName() in this.values ) {
			throw new Error( `Value for ${ value.getAttributeName() } already exists.` );
		}

		return this.values[ value.getAttributeName() ] = value;
	}
	
	public get( name: string ): T | null {
		return name in this.values ? this.values[ name ] : null;
	}

	public getAll(): Record<string, T> {
		return this.values;
	}

	public getCollectionName(): string {
		return this.name;
	}

	public getType(): CollectionType {
		return this.type;
	}
}