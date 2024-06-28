export class Collection<T extends { getAttributeName(): string }> {
	protected name: string;
	protected values: Record<string, T> = {};

	public constructor( name: string ) {
		this.name = name;
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
}