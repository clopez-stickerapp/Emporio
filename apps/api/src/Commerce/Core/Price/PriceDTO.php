<?php

	namespace StickerApp\Babylon\Commerce\Core\Price;

    class PriceDTO {
        public float $total = 0;
        public float $unitPrice = 0;
        public array $compoundValues = [];

        public string $totalFormatted = "";
        public array $compoundValuesFormatted = [];
        public string $unitPriceFormatted = "";

        public float $totalTaxAmount = 0;
        public string $totalTaxAmountFormatted = "";
    }