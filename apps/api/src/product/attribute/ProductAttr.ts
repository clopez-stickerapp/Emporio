import { AttributeConfig } from "$/configuration/interface/AttributeConfig";
import { ProductAttrValueInvalidException } from "$/product/exceptions/ProductAttrValueInvalidException";
import { isEmpty } from "../../../Util";
import { AttributeValue, AttributeValueSingle } from "./AttributeValue";
import { ProductAttrValueType } from "./ProductAttrValueType";

export class ProductAttr {
	protected name: string;
	protected valueType: ProductAttrValueType;
	protected multiValue: boolean;
	protected dynamicValue: boolean = false;
	protected values: AttributeValueSingle[] = [];

	public constructor( config: AttributeConfig ) {
		this.name = config.name;
		this.valueType = config.type;
		this.multiValue = config.multivalue || false;
		this.dynamicValue = config.dynamicvalue || false;
		this.values = config.values || [];

		if( this.multiValue && this.valueType === ProductAttrValueType.BOOL ){
			throw new Error("Can't make a multivalue attribute with boolean type.");
		}

		for (const value of this.values) {
			this.testValueType(value, true);
		}
	}

	/**
	 * Value always represent a single value.
	 *
	 * @throws ProductAttrValueTypeInvalidException
	 * @see ProductAttrValueTypes
	 *
	 */
	public addAttrValue( value: AttributeValueSingle ): void {
		this.testValueType( value, true );
		this.values.push( value );
	}

	public getAttrValue( value: AttributeValueSingle ): AttributeValueSingle | null {
		return this.values.find( attrValue => attrValue === value ) ?? null;
	}

	public canBe( value: AttributeValue, skipMultiValue: boolean = false ): boolean {
		if ( isEmpty( value ) ) {
			return false;
		}

		if ( !skipMultiValue && this.multiValue ) {
			if ( !Array.isArray( value ) ) {
				throw new ProductAttrValueInvalidException( "Product attr value is not a multi value." );
			} else {
				for ( const nestedValue of value ) {
					this.canBe( nestedValue, true )
				}
			}
		} else {
			if ( !this.getAttrValue( value as AttributeValueSingle ) && !this.isDynamicValue() ) {
				if ( typeof value === "boolean" && this.getValueType() !== ProductAttrValueType.BOOL ) {
					throw new ProductAttrValueInvalidException( `Product attr value not found: ${ value } (for ${ this.getUID() })` );
				}
			}

			this.testValueType( value, skipMultiValue );
		}

		return true;
	}

	public testValueType( value: any, skipMultiValue: boolean = false ): boolean {
		let result: boolean = false;

		if ( !skipMultiValue && this.multiValue ) {
			if ( Array.isArray( value ) ) {
				for ( const nestedValue of value ) {
					result = this.testValueType( nestedValue, true )
				}
			}
		} else {
			switch ( this.valueType ) {
				case ProductAttrValueType.INT:
					if ( typeof value === "string" && parseInt( value ).toString() == value ) {
						value = parseInt( value );
					}

					result = ( typeof value === "number" && Number.isInteger( value ) && !Number.isNaN( value ) && isFinite( value ) );
					break;

				case ProductAttrValueType.STRING:
					result = ( typeof value === "string" );
					break;

				case ProductAttrValueType.BOOL:
					result = ( typeof value === "boolean" );
					break;

				case ProductAttrValueType.FLOAT:
					if ( typeof value === "string" ) {
						value = parseFloat( value );
					}

					result = ( typeof value === "number" && !Number.isNaN( value ) && isFinite( value ) );
					break;
			}
		}

		if ( !result ) {
			throw new ProductAttrValueInvalidException( `Product attr value type is not valid. ${ value } should be ${ this.valueType } (${ this.getUID() })` );
		}

		return result;
	}

	public getName(): string {
		return this.name;
	}

	public getValues(): AttributeValueSingle[] {
		return this.values;
	}

	public isDynamicValue(): boolean {
		return this.dynamicValue;
	}

	public setDynamicValue( dynamicValue: boolean ): void {
		this.dynamicValue = dynamicValue;
	}

	public isMultiValue(): boolean {
		return this.multiValue;
	}

	public getValueType(): ProductAttrValueType {
		return this.valueType;
	}

	public getUID(): string {
		return this.constructor.name;
	}
}
