import { Static, Type } from "@sinclair/typebox";
import { Currencies } from "@stickerapp-org/nomisma";
import { ProductItem } from "./shared";

export const Price = Type.Object( {
	total: Type.Number(),
	breakdown: Type.Optional( Type.Record( Type.String(), Type.Number() ) ),
	currency: Type.Enum( Currencies )
} );

export type PriceT = Static<typeof Price>;

export const FormattedPrice = Type.Composite( [ Price, Type.Object( {
	totalFormatted: Type.String(),
	breakdownFormatted: Type.Optional( Type.Record( Type.String(), Type.String() ) ),
} ) ] );

export type FormattedPriceT = Static<typeof FormattedPrice>;

export const PriceDTO = Type.Object( {
	price: Price,
	unitPrice: Type.Number(),
	quantity: Type.Number(),
} );

export type PriceDTO = Static<typeof PriceDTO>;

export const PriceList = Type.Array( PriceDTO );

export type PriceListT = Static<typeof PriceList>;

export const FormattedPriceStep = Type.Object( {
	price: FormattedPrice,
	unitPrice: Type.Number(),
	quantity: Type.Number(),
} );

export type FormattedPriceStepT = Static<typeof FormattedPriceStep>;

export const FormattedPriceList = Type.Array( FormattedPriceStep );

export type FormattedPriceListT = Static<typeof FormattedPriceList>;

export const PriceQuery = Type.Object( {
	attributes: Type.String(),
	lang: Type.String(),
	incVat: Type.Boolean( { default: true } ),
	useNewCurves: Type.Optional( Type.Boolean( { default: false } ) ),
} );

export type PriceQueryT = Static<typeof PriceQuery>;

export const GetPricesResponse = Type.Object( { 
	price: FormattedPrice,
	unitPrice: Type.Number(),
	unitPriceFormatted: Type.String(),
	quantity: Type.Number(),
} );

export type GetPricesResponseT = Static<typeof GetPricesResponse>;

export const GetPriceListResponse = Type.Object( { 
	prices: FormattedPriceList
} );

export type GetPriceListResponseT = Static<typeof GetPriceListResponse>;

export const PostBulkPricesRequest = Type.Object( {
	items: Type.Array( ProductItem ),
	lang: Type.String(),
	incVat: Type.Boolean( { default: true } ),
} );

export type PostBulkPricesRequestT = Static<typeof PostBulkPricesRequest>;

export const PostBulkPricesResponse = Type.Object( { 
	discount: Type.Number(),
} );

export type PostBulkPricesResponseT = Static<typeof PostBulkPricesResponse>;