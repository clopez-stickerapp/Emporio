import { ProductService } from "../../ProductService";
import { ProductItem } from "../Item/ProductItem";
import { ProductAttrComputer } from "./ProductAttrComputer";
import { ProductAttrConditionEvaluator } from "./ProductAttrConditionEvaluator";
import { ProductAttrMap } from "./ProductAttrMap";

export class ProductAttrComputerExtended extends ProductAttrComputer
{
	private ps: ProductService;

	/**
	 * Creates a ProductAttrComputer. Simplifies the proccess of resetting and evaluating the computer by providing a prepare() method.
	 * 
	 * @param productService
	 * @param useFilters 
	 */
	public constructor( productService: ProductService, useFilters: boolean = true )
	{
		super( new ProductAttrConditionEvaluator(), useFilters );
		this.ps = productService;
	}

	/**
	 * Fully prepares the computer with attributes and evaluates.
	 * 
	 * @param productItem 
	 * @param includeFilters 
	 */
	public prepare( productItem: ProductItem, includeFilters: boolean = true ): this 
	{
		const product = this.ps.findProduct( productItem.getProductFamilyName(), productItem.getProductName() );
		const attrMap = ( new ProductAttrMap( this.ps, product, includeFilters ) ).getMap();
		this.reset( attrMap );
		this.attrEvaluator.reset( attrMap );
		this.evaluate( productItem );
		return this;
	}
}