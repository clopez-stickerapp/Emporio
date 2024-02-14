<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Constraint;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\Constraint\ProductAttrConstraint;
	use StickerApp\Babylon\Commerce\Product\Attribute\DeliveryRollSizeTypeAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\DeliveryRollTopEdgeMarginAttribute;
	use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\CutDirectionAttribute;
use StickerApp\Babylon\Commerce\Product\Attribute\Sticker\Filter\DeliveryRollSizeTypeFilter;
use StickerApp\Babylon\Helper\Condition\ConditionOperators;
	use StickerApp\Babylon\Helper\Condition\ConditionRelations;

	class DeliveryRollSizeTypeConstraint extends ProductAttrConstraint
	{
		public function __construct()
		{
			parent::__construct( DeliveryRollSizeTypeAttribute::ALIAS );

			foreach ( DeliveryRollSizeTypeAttribute::getSizes() as $size )
			{
				$conditions = $this->createConditionsFor( $size );
				
				$maxSize = $size - ( 2 * DeliveryRollTopEdgeMarginAttribute::DEFAULT_VALUE );
				
				$conditions->addSubGroup( ConditionRelations::OR )
					->addCondition( "item.attributes.height_mm", "<=", $maxSize )
					->addCondition( "item.attributes.cut_direction", ConditionOperators::IN, array(
						CutDirectionAttribute::TOP_FIRST,
						CutDirectionAttribute::BOTTOM_FIRST,
					) )
				;
				
				$conditions->addSubGroup( ConditionRelations::OR )
					->addCondition( "item.attributes.width_mm", "<=", $maxSize )
					->addCondition( "item.attributes.cut_direction", ConditionOperators::IN, array(
						CutDirectionAttribute::LEFT_FIRST,
						CutDirectionAttribute::RIGHT_FIRST,
					) )
				;
			}
		}
	}
