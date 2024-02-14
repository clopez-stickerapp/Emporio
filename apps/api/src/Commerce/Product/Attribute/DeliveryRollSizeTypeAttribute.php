<?php

	namespace StickerApp\Babylon\Commerce\Product\Attribute;

	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttr;
	use StickerApp\Babylon\Commerce\Core\Product\Attribute\ProductAttrValueTypes;

	class DeliveryRollSizeTypeAttribute extends ProductAttr
	{
		const ALIAS = "delivery_roll_size_type";

        const ROLL_SIZE_MIN 		= 32;
        const ROLL_SIZE_SMALL 		= 35;
        const ROLL_SIZE_MEDIUM		= 56;
        const ROLL_SIZE_LARGE 		= 70;
        const ROLL_SIZE_XLARGE 		= 93;
        const ROLL_SIZE_XXLARGE 	= 140;
        const ROLL_SIZE_MAX 		= 280;

		public const ROLL_SIZE_NAMES = array(
			"small"   		=> self::ROLL_SIZE_SMALL,
			"medium"  		=> self::ROLL_SIZE_MEDIUM,
			"large"  		=> self::ROLL_SIZE_LARGE,
			"xlarge"  		=> self::ROLL_SIZE_XLARGE,
			"xxlarge" 		=> self::ROLL_SIZE_XXLARGE,
			"full_width" 	=> self::ROLL_SIZE_MAX,
		);

		public function __construct()
		{
			parent::__construct( ProductAttrValueTypes::INT, FALSE, TRUE );

			foreach ( $this->getSizes() as $size )
			{
				$this->addAttrValue( $size );
			}
		}

		/**
		 * @return int[]
		 */
		public static function getSizes()
		{
			return array_values( self::ROLL_SIZE_NAMES );
		}

		public static function findRollTypeBySize( int $size ): string
		{
			foreach ( self::ROLL_SIZE_NAMES as $name => $value )
			{
				if ( $value == $size )
				{
					return $name;
				}
			}

			return "custom";
		}

		public static function findRollSizeByType( string $type ): ?int
		{
			if ( array_key_exists( $type, self::ROLL_SIZE_NAMES ) )
			{
				return self::ROLL_SIZE_NAMES[ $type ];
			}

			return NULL;
		}

		public static function isCustomSize( int $size ): bool
		{
			return self::findRollTypeBySize( $size ) === "custom";
		}
	}