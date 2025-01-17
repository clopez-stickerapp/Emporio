import { ProductFamily } from '$/product/ProductFamily';
import { CrustAttribute } from './Attributes/CrustAttribute';
import { CuisineAttribute } from './Attributes/CuisineAttribute';
import { IngredientAttribute, IngredientValues } from './Attributes/IngredientAttribute';
import { PortionAttribute } from './Attributes/PortionAttribute';
import { SauceBaseAttribute, SauceBaseValues } from './Attributes/SauceBaseAttribute';
import { ToppingAttribute } from './Attributes/ToppingAttribute';
import PizzeriaConstraintsCollection from './Constraints/PizzeriaConstraintsCollection';
import PizzeriaFilterCollection from './Filters/PizzeriaFiltersCollection';
import { PizzeriaProducts } from './PizzeriaProducts';

const PizzeriaFamily = new ProductFamily({
	name: 'pizza',
	rules: {
		collections: {
			constraint: PizzeriaConstraintsCollection.getCollectionName(),
			filter: PizzeriaFilterCollection.getCollectionName(),
			asset: 'asset',
			min_units: 'min_units',
			price_provider: '',
			quantity_provider: '',
		},
	},
	unitType: '',
	products: [],
});

PizzeriaFamily.attributes.add(SauceBaseAttribute, undefined, false, { required: true });
PizzeriaFamily.attributes.add(IngredientAttribute, undefined, false, { required: true });
PizzeriaFamily.attributes.add(CuisineAttribute, undefined, false, { required: true });
PizzeriaFamily.attributes.add(PortionAttribute, undefined, false, { required: true });
PizzeriaFamily.attributes.add(ToppingAttribute, undefined, false, { required: true });
PizzeriaFamily.attributes.add(CrustAttribute, undefined, false, { required: false });

PizzeriaFamily.addProduct({
	name: PizzeriaProducts.MAKE_YOUR_OWN,
	sku: 'SKU_1',
	attributes: {
		[IngredientAttribute.getName()]: [IngredientValues.CHEESE],
	},
});

PizzeriaFamily.addProduct({
	name: PizzeriaProducts.MARGARHITA,
	sku: 'SKU_2',
	attributes: {
		[SauceBaseAttribute.getName()]: SauceBaseValues.TOMATO,
		[IngredientAttribute.getName()]: [IngredientValues.CHEESE],
	},
});

PizzeriaFamily.addProduct({
	name: PizzeriaProducts.CAPRICIOSA,
	sku: 'SKU_3',
	attributes: {
		[SauceBaseAttribute.getName()]: SauceBaseValues.TOMATO,
		[IngredientAttribute.getName()]: [IngredientValues.CHEESE, IngredientValues.HAM, IngredientValues.MUSHROOM],
	},
});

PizzeriaFamily.addProduct({
	name: PizzeriaProducts.HAWAII,
	sku: 'SKU_4',
	attributes: {
		[SauceBaseAttribute.getName()]: SauceBaseValues.TOMATO,
		[IngredientAttribute.getName()]: [IngredientValues.CHEESE, IngredientValues.HAM, IngredientValues.PINEAPPLE],
	},
});

PizzeriaFamily.addProduct({
	name: PizzeriaProducts.BIANCA,
	sku: 'SKU_5',
	attributes: {
		[SauceBaseAttribute.getName()]: SauceBaseValues.CREME_FRAICHE,
		[IngredientAttribute.getName()]: [IngredientValues.CHEESE, IngredientValues.GARLIC, IngredientValues.WALNUT],
	},
});

export default PizzeriaFamily;
