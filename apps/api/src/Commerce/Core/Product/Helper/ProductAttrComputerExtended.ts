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
	 * @param includeFilters Determines whether filters should be available in ProductAttrComputer.
	 * @param useFilters Determines whether filters should be used in ProductAttrComputer.
	 */
	public prepare( productItem: ProductItem, includeFilters: boolean = true, useFilters: boolean = true ): this 
	{
		this.useFilters = useFilters;
		const product = this.ps.findProduct( productItem.getProductFamilyName(), productItem.getProductName() );
		const attrMap = ( new ProductAttrMap( this.ps, product, includeFilters ) ).getMap();
		this.reset( attrMap );
		this.attrEvaluator.reset( attrMap );
		this.evaluate( productItem );
		return this;
	}
}