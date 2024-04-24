<?php

	namespace StickerApp\Babylon\Commerce\Core\Product\Helper;

    use StickerApp\Babylon\Commerce\Core\Price\Rate;
    use StickerApp\Babylon\Commerce\Core\Price\RateList;
    use StickerApp\Babylon\Commerce\Core\Price\RateProvider;
    use StickerApp\Babylon\Commerce\Core\Product\Item\ProductItem;

    /**
     * This class can be used to assist in converting
     * a minimum rate into a minimum amount of units.
    */
    class ProductMinimumUnitsHelper
    {
        protected ProductItem $item;

        public function __construct(ProductItem $productItem)
        {
            $this->item = $productItem;
        }
        /**
		 * A dynamic way to calculate the minimum amount of units.
         * 
         * To get the minimum rate divide the minimum price that
         * you want by the relevant country's conversion rate.
		 *
		 * @param RateList[] $rateLists
		 * @param int $minRate
		 * @return ?float
		 */
		public function getMinimumUnits( array $rateLists, int $minRate ): ?float
		{
            $rates = $this->mergeRateLists( ...$rateLists )->getRates();
            $previousRate = null;
			foreach ($rates as $rate) 
			{
				if( $minRate / $rate->getValue() > $rate->getUnitThreshold() )
				{
                    if( is_null($previousRate) ) 
                    {
                        break;
                    } 
                    else
                    {
                        return $minRate / $previousRate->getValue();
                    }
				}
                $previousRate = $rate;
			}

            return null;
		}

        /**
		 * Merges several ratelists into one
		 * and combines their values based on
		 * the specified maximum amounts of units.
		 *
		 * @param RateList $lists
		 * @return RateList
		 */
		private function mergeRateLists( ...$lists )
		{
			$combinedUnitThresholdArray = array();

			foreach ($lists as $list)
			{
                if($list->getType() === RateProvider::TYPE_BASE)
                {
                    $combinedUnitThresholdArray = array_unique(array_merge($combinedUnitThresholdArray, $this->getUnitThresholdArray($list)));
                }
			}

            asort($combinedUnitThresholdArray);
            $combinedUnitThresholdArray = array_values($combinedUnitThresholdArray);

			$result = new RateList("");

			foreach ($combinedUnitThresholdArray as $maxUnits) 
			{
                $productItem = clone $this->item;
                $productItem->setUnits($maxUnits);

				$rateValue = 0;
                $ratePercentageValue = 0;

				foreach ($lists as $list) 
				{
					$rate = $list->getRate( $productItem );

					if( $rate->isPercentage() )
					{
                        $ratePercentageValue += $rate->getValue();
					}
					else
					{
						$rateValue += $rate->getValue();
					}
				}

                $resultRateValue = $rateValue + $rateValue * $ratePercentageValue;
				$result->addRate( new Rate( $resultRateValue ), $maxUnits);
			}

			return $result;
		}

        /**
		 * Returns an array of the maxUnit values of the RateList
		 *
		 * @return array
		 */
		private function getUnitThresholdArray( RateList $rateList ): array
		{
			$result = array();
			foreach ($rateList->getRates() as $rate) {
				$result[] = $rate->getUnitThreshold();
			}
			return $result;
		}
    }