<?php

	namespace StickerApp\Babylon\Helper\Condition;

	use function in_array;

	class ConditionHelper
	{
		static protected $allowedOperators = array(
			'==',
			'===',
			'!=',
			'<>',
			'!==',
			'>',
			'<',
			'>=',
			'<=',
			ConditionOperators::NOT_IN,
			ConditionOperators::IN,
			ConditionOperators::IS_EMPTY,
			ConditionOperators::IS_NOT_EMPTY
		);

		static public function isOperatorAllowed( string $operator ): bool
		{
			return in_array( $operator, self::$allowedOperators );
		}

	}
