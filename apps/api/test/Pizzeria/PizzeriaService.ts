import { CollectionType } from "$/configuration/interface/CollectionConfig";
import { MinimumUnitsCollection } from "$/prices/MinimumUnitsCollection";
import { Collection } from "$/product/Collection";
import { ProductAttrAsset } from "$/product/attribute/Asset/ProductAttrAsset";
import { ProductService } from "../../src/product/ProductService";
import { CrustAttribute } from "./Attributes/CrustAttribute";
import { CuisineAttribute } from "./Attributes/CuisineAttribute";
import { IngredientAttribute } from "./Attributes/IngredientAttribute";
import { PortionAttribute } from "./Attributes/PortionAttribute";
import { SauceBaseAttribute } from "./Attributes/SauceBaseAttribute";
import { ToppingAttribute } from "./Attributes/ToppingAttribute";
import PizzeriaConstraintsCollection from "./Constraints/PizzeriaConstraintsCollection";
import PizzeriaFilterCollection from "./Filters/PizzeriaFiltersCollection";
import PizzeriaFamily from "./PizzeriaFamily";

const PizzeriaService = new ProductService();
PizzeriaService.registerProductFamily( PizzeriaFamily.getName(), PizzeriaFamily );
PizzeriaService.registerCollection( PizzeriaConstraintsCollection );
PizzeriaService.registerCollection( PizzeriaFilterCollection );
PizzeriaService.registerAttribute( SauceBaseAttribute.getName(), SauceBaseAttribute );
PizzeriaService.registerAttribute( IngredientAttribute.getName(), IngredientAttribute );
PizzeriaService.registerAttribute( ToppingAttribute.getName(), ToppingAttribute );
PizzeriaService.registerAttribute( CuisineAttribute.getName(), CuisineAttribute );
PizzeriaService.registerAttribute( PortionAttribute.getName(), PortionAttribute );
PizzeriaService.registerAttribute( CrustAttribute.getName(), CrustAttribute );

PizzeriaService.registerMinimumUnitsCollection( new MinimumUnitsCollection( {
	name: 'min_units',
	defaultValue: 1,
	rules: []
} ) );

PizzeriaService.registerCollection( new Collection<ProductAttrAsset>( {
	name: 'asset',
	values: [],
	type: CollectionType.Asset
} ) );

export default PizzeriaService;