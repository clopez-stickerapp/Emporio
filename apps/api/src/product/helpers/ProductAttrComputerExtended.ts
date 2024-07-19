import { ProductService } from "../ProductService";
import { ProductItem } from "../ProductItem";
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
	 */
	public constructor( productService: ProductService )
	{
		super( new ProductAttrConditionEvaluator() );
		this.ps = productService;
	}

	/**
	 * Fully prepares the computer with attributes and evaluates.
	 * 
	 * @param productItem The ProductItem to evaluate against.
	 * @param useFilters Determines whether filters should be used in ProductAttrComputer.
	 */
	public prepare( productItem: ProductItem, useFilters: boolean = true ): this 
	{
		const product = this.ps.findProduct( productItem.getProductFamilyName(), productItem.getProductName() );
		const attrMap = ( new ProductAttrMap( this.ps, product ) ).getMap();
		this.reset( attrMap );
		this.attrEvaluator.reset( attrMap );
		this.evaluate( productItem, useFilters );
		return this;
	}
}