export class RuleCollection<T extends { getAttributeName(): string }> {
	protected name: string;
	protected rules: Record<string, T> = {};

	public constructor( name: string ) {
		this.name = name;
	}

	public addRule( rule: T ): T {
		if ( rule.getAttributeName() in this.rules ) {
			throw new Error( `Rules for ${ rule.getAttributeName() } already exists.` );
		}

		return this.rules[ rule.getAttributeName() ] = rule;
	}
	
	public getRule( name: string ): T | null {
		return name in this.rules ? this.rules[ name ] : null;
	}

	public getRules(): Record<string, T> {
		return this.rules;
	}

	public getCollectionName(): string {
		return this.name;
	}
}