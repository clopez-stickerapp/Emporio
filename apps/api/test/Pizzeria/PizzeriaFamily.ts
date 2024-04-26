import { ProductItem } from "$/Commerce/Core/Product/Item/ProductItem";
import { QuantityAttribute } from "$/Commerce/Product/Attribute/QuantityAttribute";
import { ProductFamily } from "../../src/Commerce/Core/Product/ProductFamily";
import { ProductService } from "../../src/Commerce/Core/ProductService";
import { CrustAttribute } from "./Attributes/CrustAttribute";
import { CuisineAttribute } from "./Attributes/CuisineAttribute";
import { IngredientAttribute } from "./Attributes/IngredientAttribute";
import { PortionAttribute } from "./Attributes/PortionAttribute";
import { SauceBaseAttribute } from "./Attributes/SauceBaseAttribute";
import { ToppingAttribute } from "./Attributes/ToppingAttribute";
import { PizzeriaConstraintsCollection } from "./Constraints/PizzeriaConstraintsCollection";
import { PizzeriaFilterCollection } from "./Filters/PizzeriaFiltersCollection";

export class PizzeriaFamily extends ProductFamily {
	public static readonly NAME = 'pizza';

	public static readonly MAKE_YOUR_OWN = 'make_your_own';
	public static readonly MARGARHITA = 'margarhita';
	public static readonly CAPRICIOSA = 'capriciosa';
	public static readonly HAWAII = 'hawaii';
	public static readonly BIANCA = 'bianca';

	public constructor( productService: ProductService ) {
		super( PizzeriaFamily.NAME, 1, productService );

		this.relateConstraintCollection( PizzeriaConstraintsCollection.NAME );
		this.relateFilterCollection( PizzeriaFilterCollection.NAME );

		this.requireAttr( SauceBaseAttribute.name, SauceBaseAttribute.NAME );
		this.requireAttr( IngredientAttribute.name, IngredientAttribute.NAME );
		this.requireAttr( CuisineAttribute.name, CuisineAttribute.NAME );
		this.requireAttr( PortionAttribute.name, PortionAttribute.NAME );
		this.requireAttr( ToppingAttribute.name, ToppingAttribute.NAME );

		this.supportAttr( CrustAttribute.name, CrustAttribute.NAME );

		this.addProduct( PizzeriaFamily.MAKE_YOUR_OWN, "123" )
			.withAttrValue( IngredientAttribute.NAME, [
				IngredientAttribute.CHEESE
			], false );

		this.addProduct( PizzeriaFamily.MARGARHITA, "124" )
			.withAttrValue( SauceBaseAttribute.NAME, SauceBaseAttribute.TOMATO )
			.withAttrValue( IngredientAttribute.NAME, [
				IngredientAttribute.CHEESE
			] );

		this.addProduct( PizzeriaFamily.CAPRICIOSA, "125" )
			.withAttrValue( SauceBaseAttribute.NAME, SauceBaseAttribute.TOMATO )
			.withAttrValue( IngredientAttribute.NAME, [
				IngredientAttribute.CHEESE,
				IngredientAttribute.HAM,
				IngredientAttribute.MUSHROOM
			] );

		this.addProduct( PizzeriaFamily.HAWAII, "121" )
			.withAttrValue( SauceBaseAttribute.NAME, SauceBaseAttribute.TOMATO )
			.withAttrValue( IngredientAttribute.NAME, [
				IngredientAttribute.CHEESE,
				IngredientAttribute.HAM,
				IngredientAttribute.PINEAPPLE
			] );
			
		this.addProduct( PizzeriaFamily.BIANCA, "129" )
			.withAttrValue( SauceBaseAttribute.NAME, SauceBaseAttribute.CREME_FRAICHE )
			.withAttrValue( IngredientAttribute.NAME, [
				IngredientAttribute.CHEESE,
				IngredientAttribute.GARLIC,
				IngredientAttribute.WALNUT
			] );
	}

	public calculateUnits( productItem: ProductItem ): number {
		return productItem.getAttribute<number>( QuantityAttribute.ALIAS ) ?? 0;
	}
}