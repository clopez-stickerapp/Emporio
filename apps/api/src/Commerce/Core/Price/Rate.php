<?php

	namespace StickerApp\Babylon\Commerce\Core\Price;

	use StickerApp\Babylon\Commerce\Core\Exception\ProductServiceException;

	/**
	 * Specifies how much a product cost up to a certain amount of units.
	 * 
	 * There are two types of rates:
	 * * Flat rate
	 * * Percentage rate
	 */
	class Rate{

        const TYPE_ADDITIVE = "additive";
        const TYPE_MULTIPLICATIVE = "multiplicative";

		protected float $value;
		protected float $minValue;
		protected bool $percentage;
		protected float $threshold;
        protected string $type = self::TYPE_ADDITIVE;
		
		public function __construct( float $value, bool $isPercentage = false, float $minValue = 0 )
		{
			if( !$isPercentage && $minValue != 0)
			{
				throw new ProductServiceException("Rate cannot have a minimum value when isPercentage is set to false.");
			}

			$this->value = $value;
			$this->minValue = $minValue;
			$this->percentage = $isPercentage;	
		}

		public function getValue() : float
		{
			if( $this->percentage )
			{
				return $this->value / 100;
			}
			else
			{
				return $this->value;
			}
		}

		public function getMinValue()
		{
			return $this->minValue;
		}

		public function isPercentage()
		{
			return $this->percentage;
		}

		public function getUnitThreshold()
		{
			return $this->threshold;
		}

		public function setUnitThreshold( float $threshold )
		{
			$this->threshold = $threshold;
		}

        public function getType(): string
        {
            return $this->type;
        }

        public function setType(string $type): void
        {
            $this->type = $type;
        }
	}