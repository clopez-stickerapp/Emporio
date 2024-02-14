<?php

	namespace StickerApp\Babylon\Commerce\Core\Price;

    use StickerApp\Babylon\Commerce\Core\Product\Item\ProductItem;

	/**
	 * Contains a list of Rates that can be used to calculate
	 * the Rate of Products. Conditions can be added, based on 
	 * ProductAttributes, to limit what a list applies to. 
	 */
	class RateList extends RateProvider{

        protected Rate $defaultRate;
		/** @var Rate[] */
		protected array $rates = array();

		public function __construct( string $name, Rate $defaultRate = null )
		{
            parent::__construct($name);
            $this->defaultRate = $defaultRate ?? new Rate(0);
		}

		/**
		 * Adds a Rate to the RateList.
		 * Sorts the list after adding.
		 *
		 * @param Rate $rate
		 * @param float $threshold The minimum amount of units for the rate to be applied
		 * @return RateList
		 */
		public function addRate( Rate $rate, float $threshold ) : RateList
		{
			$rate->setUnitThreshold( $threshold );
			$this->rates[] = $rate;
			self::sortByThreshold( $this->rates );
            return $this;
		}

		public function getRate( ?ProductItem $productItem ) : Rate
		{
			foreach ($this->rates as $rate) {

				if( $productItem->getUnits() > $rate->getUnitThreshold() )
				{
					return $rate;
				}
			}
			return $this->defaultRate;
		}

		public function getRates()
		{
			return $this->rates;
		}

		/** 
		 * Sorts the rate array by unit thresholds, from highest to lowest.
		 *
		 * @param Rate[] &$rates This is a reference to an array containing rates.
		 * @return void
		 */
		public static function sortByThreshold( array &$rates )
		{
			uasort( $rates, function($a, $b)
			{
				/** @var Rate $a
				 *  @var Rate $b */
				return $a->getUnitThreshold() < $b->getUnitThreshold();
			});
		}

        public function addFromArray( array $rates ) : RateList
        {
            foreach ($rates as $rate => $value) {
                $this->addRate(new Rate($rate), $value);
            }
            return $this;
        }
	}