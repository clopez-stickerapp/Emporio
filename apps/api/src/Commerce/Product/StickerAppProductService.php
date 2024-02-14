<?php

	namespace StickerApp\Babylon\Commerce\Product;

    use Figure_Model;
    use StickerApp\Babylon\Commerce\Core\ProductService;
	use StickerApp\Babylon\Commerce\Pizzeria\Product\Attribute\Constraint\PizzeriaConstraintsCollection;
	use StickerApp\Babylon\Commerce\Pizzeria\Product\Attribute\CuisineAttribute;
	use StickerApp\Babylon\Commerce\Pizzeria\Product\Attribute\IngredientAttribute;
	use StickerApp\Babylon\Commerce\Pizzeria\Product\Attribute\PortionAttribute;
	use StickerApp\Babylon\Commerce\Pizzeria\Product\Attribute\SauceBaseAttribute;
	use StickerApp\Babylon\Commerce\Pizzeria\Product\PizzaFamily;
	use StickerApp\Babylon\Commerce\Product\Attribute\ChangedAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\ColorSupportedAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\DynamicStringAttr;
	use StickerApp\Babylon\Commerce\Product\Attribute\FigureAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\FixedQuantityAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\FixedSizeAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\HeightAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\ImperialUnitsAttribute;
    use StickerApp\Babylon\Commerce\Product\Attribute\MarketAttribute;
    use StickerApp\Babylon\Commerce\Product\Attribute\NoteAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\PhoneCase\CaseMaterialAttr;
	use StickerApp\Babylon\Commerce\Product\Attribute\PhoneCase\CaseSheetTypeAttr;
	use StickerApp\Babylon\Commerce\Product\Attribute\PriceMarginPercentageAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\QuantityAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\ReorderAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\ResellerAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\SheetTypeSaveAsAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Skin\Filter\SkinFilterCollection;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaterialColorAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Constraint\StickerProductionContraintCollection;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\CutDirectionAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\DeliveryAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\DeliverySheetHeightAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\DeliverySheetInsidePaddingAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\DeliverySheetOutsidePaddingAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\DeliverySheetWidthAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\EpoxyTemplateAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\FeatureAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Filter\StickerWizardFilterCollection;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Stock\StickerWizardStockCollection;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\ImageFiltersAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\InnercutAsKisscutAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\LaminateAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaterialAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaxSizeAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MinSizeAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\OutlineAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\ProductionInstructionAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\ProductionLineAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\StickerSheetNameAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\SheetTypeAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\SizeAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\InkAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\WhiteLayerAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\DeliveryRollItemMarginAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\DeliveryRollSizeMMAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\DeliveryRollSizeTypeAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\DeliveryRollTopEdgeMarginAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\EffectLayerFileAppIdAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\EffectLayerFileNameDataAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Icon\StickerAttributeIconCollection;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\MaxSizeOtherSideAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\TemplateAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\WidthAttribute;
	use StickerApp\Babylon\Commerce\Product\Family\CustomStickerFamily;
	use StickerApp\Babylon\Commerce\Product\Family\FeeFamily;
	use StickerApp\Babylon\Commerce\Product\Family\PhoneCaseProductFamily;
	use StickerApp\Babylon\Commerce\Product\Family\PromoProductFamily;
	use StickerApp\Babylon\Commerce\Product\Family\SkinProductFamily;
    use StickerApp\Babylon\Commerce\Product\Price\PromoProductPriceProvider;
    use StickerApp\Babylon\Commerce\Product\Price\SkinPriceProvider;
    use StickerApp\Babylon\Commerce\Product\Price\StickerPriceProvider;
    use StickerApp\Babylon\Commerce\Product\Price\StickerQuantityListCollection;
    use VAT_Model;

	class StickerAppProductService extends ProductService
	{
		public function __construct(Figure_Model $figureModel, VAT_Model $vatModel)
		{
			// The Pizzeria example
			$this->registerAttribute( new SauceBaseAttribute() );
			$this->registerAttribute( new IngredientAttribute() );
			$this->registerAttribute( new CuisineAttribute() );
			$this->registerAttribute( new PortionAttribute() );
			$this->registerAttrConstraintCollection( new PizzeriaConstraintsCollection() );

			$this->registerProductFamily( new PizzaFamily( $this ) );

			////////////////////////////////////////////////////////////////////////////////////
			// TODO: HIGHEST PRIO: PRICING
			// TODO: HIGHEST PRIO: ADMIN QT TOOL
			// TODO: HIGHEST PRIO: Block and warn order sheet editor if it's currently in print
			// TODO: HIGHEST PRIO: Admin order sheet editor doesn't show note.
			// TODO: Hide material / lamiante from admin editor?
			// TODO: HIGHEST PRIO: ALL LEGACY PRODUCTS CONVERTABLE
			// TODO: Solution for "cut vinyl". Perhaps as own material with color attribute. And own product.
			// TODO: HIGHEST PRIO: What if making a reorder on a item that doesn't support material / laminate combination? We have to validate reorders as well.
			// TODO: Create a cronjob that will convert current order items, that are pending, to have a productfamily and productname.
			// TODO: How to maintain out of stock materials?
			// TODO: HIGHEST PRIO: HANDLING DAYS TO WORK WITH NEW PRODUCTS
			// TODO: Create a cronjob that will convert handling days to new materials / laminates
			// TODO: HIGHEST PRIO: DISCOUNT CODES TO WORK WITH NEW PRODUCTS
			// TODO: Create a cronjob that will convert active discount codes to the new materials
			// TODO: HIGHEST PRIO: PRODUCTION LINE
			// TODO: HIGHEST PRIO: Production line should be recalculated in context and flexible (not two way constraining) if it's a new item
			// TODO: HIGHEST PRIO: If having existing legacy items in cart, convert material / laminate names.
			////////////////////////////////////////////////////////////////////////////////////
			// TODO: Make production line attr required once paid
			// TODO: Make sheet not confirmable if production line is missing. What else attr are required for production? Delivery?
			// TODO: Production_line. Set attr value when storing to cart. When reopening editor, remove production_line attr value if it's not a reorder. If it's a reorder, we make the production_line attr cherry picked(?).
			// TODO: Production_line doesn't seemt o be saved from admin editor. Disable material / laminate controls in admin again?
			// TODO: Size options behöver sättas på product, inte på material som det gör idag.
			// TODO: Men var ska minimum quantity sättas på? Just nu verkar det sättas per material, per marknad, per site
			// TODO: Kunna definiera ProductTypeMinimumOrderUnit med conditions (behöver förmodligen kunna fungera likadant som Rates)
			// TODO: Auto opt for digital production in backend when creating product item (if possible)
			// TODO: Min and max sizes. Special for STS.US? Either way. Solve it with filters and constraints.
			// TODO: Do not fallback legacy products to "die cut". Create a "find" helper method that finds the closest product based on material / laminate instead.
			// DONE?: If order created through admin, and then opening editor in cart, allow combinations if outside of filters.
			// TODO: If reorder, cherry pick production line in editor?
			// DONE: Cleanse editor from "sheet meta". Move it to product attr instead.
			// TODO: Separate template id and figure id
			// TODO: Pass two way constraining ignore rules from backend. For instance "feature" (backprint) shouldn't be able to constrain laminate. Should be included in the ConstraintCollection?
			// TODO: Is feature attribute the way to go? If so, make sure all values are stored in meta (effect layer, application film). And perhaps that filters can have merge mode.
			// TODO: Make sure ProductItemValidator includes filters and throw errors, and use the validator when trying to create new products.
			// DONE: Material "clear labels on sheet" need to add "delivery on sheet"?
			// DONE: Material "white labels on sheet" need to add "delivery on sheet"?
			// DONE: StickerProfile::prepareEditorModelForRollOfStickers();. Find a way to identify and convert legacy roll of stickers product and modify sticker profile.
			// TODO: Create a QT warning, and do not autoconfirm reorders, that are going to the digital. Check with ludde about specifics.
			// TODO: In admin, if a sheet is reordered. Make it comparable with reordered sheet to see diffs.
			// TODO: ExportHelper.ts. Find out where it's used and how it can be smarter used with new ProductItem.
			// DONE: Register attributes without names. Make their class reference their name, and define a "alias" when adding them to a product family.
			// TODO: Remove download meta, maybe download sticker right before converting?
            // TODO: Customizations need to be passed to legacy price model
			// TODO: Constraints does not work properly when ProductAttrValueType is bool. See ColorSupportedAttribute and ColorSupportedConstraint.

			/**
			 * Deploy process:
			 * - Make sure nobody is working that weekend
			 * - Make sure no one is confirming stuff that weekend
			 *
			 * 1. Keep site in maintenance mode, warn users in editor when approaching maintenance mode.
			 * 2. Put site in maintenance mode (also frontend).
			 * 3. Create a cronjob that will remove any rows / batches
			 * 4. Create a cronjob that will convert current pending orders into new products (log everything, especially the ones that have invalid products).
			 * 5. Create a cronjob that will convert active discount codes to the new materials
			 * 6. Create a cronjob that will convert handling days to new materials / laminates
			 */

			/**
			 * TODO: Convert legacy product example
			 * - Automatically pick the die_cut sticker (if it's a single sticker)
			 * - Fetch the material preset from db
			 * - Fetch the material from db
			 * - Fetch the laminate from db
			 * - Convert material from legacy- to new name
			 * - Convert laminate from legacy- to new name
			 * - Pick production line based on legacy material row in database
			 * - Boom, there's your product item.
			 */
			$this->registerAttribute( new SheetTypeAttribute() );
			$this->registerAttribute( new StickerSheetNameAttribute() );
			$this->registerAttribute( new TemplateAttribute() );
			$this->registerAttribute( new LaminateAttribute() );
//			$this->addAttribute( new LaminateUVResistanceAttribute() );
//			$this->addAttribute( new LaminateThicknessAttribute() );
//			$this->addAttribute( new LaminateApplicationAttribute() );
			$this->registerAttribute( new MaterialAttribute() );
			$this->registerAttribute( new WidthAttribute() );
			$this->registerAttribute( new HeightAttribute() );
			$this->registerAttribute( new QuantityAttribute() );
//			$this->addAttribute( new MaterialAdhesiveAttribute() );
			$this->registerAttribute( new FeatureAttribute() );
			$this->registerAttribute( new InkAttribute() );
			$this->registerAttribute( new ProductionLineAttribute() );
			$this->registerAttribute( new ProductionInstructionAttribute() );
			$this->registerAttribute( new DeliveryAttribute() );
			$this->registerAttribute( new DeliverySheetWidthAttribute() );
			$this->registerAttribute( new DeliverySheetHeightAttribute() );
			$this->registerAttribute( new DeliverySheetInsidePaddingAttribute() );
			$this->registerAttribute( new DeliverySheetOutsidePaddingAttribute() );
			$this->registerAttribute( new EpoxyTemplateAttribute() );
			$this->registerAttribute( new CutDirectionAttribute() );
			$this->registerAttribute( new WhiteLayerAttribute() );
			$this->registerAttribute( new InnercutAsKisscutAttribute() );
			$this->registerAttribute( new OutlineAttribute() );
			$this->registerAttribute( new ImageFiltersAttribute() );
			$this->registerAttribute( new ResellerAttribute() );
			$this->registerAttribute( new SizeAttribute() );
			$this->registerAttribute( new MinSizeAttribute() );
			$this->registerAttribute( new MaxSizeAttribute() );
			$this->registerAttribute( new MaxSizeOtherSideAttribute() );
			$this->registerAttribute( new ImperialUnitsAttribute() );
			$this->registerAttribute( new FixedSizeAttribute() );
			$this->registerAttribute( new FixedQuantityAttribute() );
			$this->registerAttribute( new SheetTypeSaveAsAttribute() );
			$this->registerAttribute( new NoteAttribute() );
			$this->registerAttribute( new PriceMarginPercentageAttribute() );
			$this->registerAttribute( new ReorderAttribute() );
			$this->registerAttribute( new ChangedAttribute() );
			$this->registerAttribute( new FigureAttribute() );
			$this->registerAttribute( new CaseMaterialAttr() );
			$this->registerAttribute( new CaseSheetTypeAttr() );
			$this->registerAttribute( new DynamicStringAttr() );
            $this->registerAttribute( new MarketAttribute() );
			$this->registerAttribute( new MaterialColorAttribute() );
			$this->registerAttribute( new ColorSupportedAttribute() );
			$this->registerAttribute( new DeliveryRollSizeMMAttribute() );
			$this->registerAttribute( new DeliveryRollSizeTypeAttribute() );
			$this->registerAttribute( new DeliveryRollItemMarginAttribute() );
			$this->registerAttribute( new DeliveryRollTopEdgeMarginAttribute() );

			$this->registerAttribute( new EffectLayerFileNameDataAttribute() );
			$this->registerAttribute( new EffectLayerFileAppIdAttribute() );


			// The constraint profile contains rules
			$this->registerAttrConstraintCollection( new StickerProductionContraintCollection() );
			$this->registerAttrFilterCollection( new StickerWizardFilterCollection() );
			$this->registerAttrFilterCollection( new SkinFilterCollection() );
			$this->registerAttrStockCollection( new StickerWizardStockCollection() );

			$this->registerAttrIconCollection( new StickerAttributeIconCollection() );

			$this->registerPriceProvider( new StickerPriceProvider($this, $figureModel, $vatModel) );
			$this->registerPriceProvider( new SkinPriceProvider($this, $vatModel) );
            $this->registerPriceProvider( new PromoProductPriceProvider($this, $figureModel, $vatModel) );
            $this->registerQuantityListCollection( new StickerQuantityListCollection($this) );

			$this->registerProductFamily( new CustomStickerFamily( $this ) );
			$this->registerProductFamily( new PhoneCaseProductFamily( $this ) );
			$this->registerProductFamily( new SkinProductFamily( $this ) );
			$this->registerProductFamily( new PromoProductFamily($this) );
			$this->registerProductFamily( new FeeFamily($this) );
		}
	}
