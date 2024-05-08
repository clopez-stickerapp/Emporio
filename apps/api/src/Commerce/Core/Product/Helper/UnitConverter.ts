const FACTOR = {
	mm_to_px: 2.83465,
	inches_to_mm: 25.4
}

export function convertMMToInches( mm: number ): number
{
	const inches = formatMM( mm ) / FACTOR.inches_to_mm;

	return toFixed( inches, 1 );
}

export function convertInchesToMM( inches: number ): number
{
	const mm = inches * FACTOR.inches_to_mm;

	return formatMM( mm );
}

export function convertMMToCM( mm: number ): number
{
	const cm = mm / 10;

	return toFixed( cm, 1 );
}

export function convertCMToMM( cm: number ): number
{
	const mm = cm * 10;

	return formatMM( mm );
}

export function convertMMToPX( mm: number ): number
{
	return mm * FACTOR.mm_to_px;
}

export function convertPXToMM( px: number ): number
{
	const mm = px / FACTOR.mm_to_px;

	return formatMM( mm );
}

export function formatMM( mm: number ): number
{
	mm = Math.round( mm * 10 ) / 10;

	return toFixed( mm, 0 );
}

function toFixed( number: number, decimals: number ): number
{
	return Number( number.toFixed( decimals ) );
}