import { ProductAttrValue } from "./ProductAttrValue";
import { ProductAttrValueType } from "./ProductAttrValueType";
import { ProductAttrValueInvalidException } from '../../Exception/ProductAttrValueInvalidException'
import { isEmpty } from '../../../../../Util'
import { AttributeValueSingle } from "../../../../Helper/Condition/AttributeValue";

export class ProductAttr {
	protected valueType: ProductAttrValueType;
	protected multiValue: boolean;
	protected dynamicValue: boolean = false;
	protected values: ProductAttrValue[] = [];

	public constructor( valueType: ProductAttrValueType, multiValue: boolean = false, dynamicValue: boolean = false ) {
		if ( multiValue && valueType === "boolean" ) {
			throw new Error( "Cannot make a multivalue attribute with boolean type." );
		}
		
		this.valueType = valueType;
		this.multiValue = multiValue;
		this.dynamicValue = dynamicValue;
	}

	/**
	 * Value always represent a single value.
	 *
	 * @throws ProductAttrValueTypeInvalidException
	 * @see ProductAttrValueTypes
	 *
	 */
	public addAttrValue( value: AttributeValueSingle ): ProductAttrValue {
		this.testValueType( value, true );
		const productAttrValue = new ProductAttrValue( value, this );
		this.values.push( productAttrValue );
		return productAttrValue;
	}

	public getAttrValue( value: AttributeValueSingle ): ProductAttrValue | null {
		return this.values.find( attrValue => attrValue.getValue() === value ) ?? null;
	}

	public canBe( value: any, skipMultiValue: boolean = false ): boolean {
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
			if ( !this.getAttrValue( value ) && !this.isDynamicValue() ) {
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

	public getValues(): ProductAttrValue[] {
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

	public getValueType(): string {
		return this.valueType;
	}

	public getUID(): string {
		return this.constructor.name;
	}
}
