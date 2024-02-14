<?php
namespace StickerApp\Babylon\Commerce\Tax\Vat;
use StickerApp\Babylon\Commerce\Tax\Vat\VatValidationResult;

interface VatService
{
    /**
     * Does what it says on the tin.
     * Should return a VatValidationResult object
     * so what the actual service returns doesn't matter.
     *
     * @param string $vatNumber
     * @return VatValidationResult
     */
    public function validate( string $vatNumber ): VatValidationResult;
}
