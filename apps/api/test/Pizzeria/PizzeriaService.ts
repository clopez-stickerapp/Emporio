import { ProductService } from "../../src/product/ProductService";
import { CrustAttribute } from "./Attributes/CrustAttribute";
import { CuisineAttribute } from "./Attributes/CuisineAttribute";
import { IngredientAttribute } from "./Attributes/IngredientAttribute";
import { PortionAttribute } from "./Attributes/PortionAttribute";
import { SauceBaseAttribute } from "./Attributes/SauceBaseAttribute";
import { ToppingAttribute } from "./Attributes/ToppingAttribute";
import { PizzeriaConstraintsCollection } from "./Constraints/PizzeriaConstraintsCollection";
import { PizzeriaFilterCollection } from "./Filters/PizzeriaFiltersCollection";
import { PizzeriaFamily } from "./PizzeriaFamily";

export class PizzeriaService extends ProductService {
	public constructor() {
		super();
		
		this.registerAttribute( new SauceBaseAttribute() );
		this.registerAttribute( new IngredientAttribute() );
		this.registerAttribute( new ToppingAttribute() );
		this.registerAttribute( new CuisineAttribute() );
		this.registerAttribute( new PortionAttribute() );
		this.registerAttribute( new CrustAttribute() );

		this.registerAttrConstraintCollection( new PizzeriaConstraintsCollection() );
		this.registerAttrFilterCollection( new PizzeriaFilterCollection() );

		this.registerProductFamily( new PizzeriaFamily( this ) );
	}
}