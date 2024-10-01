import { Static, Type } from '@sinclair/typebox';

export const UseFilters = Type.Boolean({ default: true });

export const AttributeValueSingle = Type.Union([Type.Number(), Type.Boolean(), Type.String()]);

export type AttributeValueSingleT = Static<typeof AttributeValueSingle>;

export const AttributeValueMulti = Type.Array(AttributeValueSingle);

export type AttributeValueMultiT = Static<typeof AttributeValueMulti>;

export const AttributeValue = Type.Union([AttributeValueSingle, AttributeValueMulti]);

export type AttributeValueT = Static<typeof AttributeValue>;

export const Attributes = Type.Record(Type.String(), AttributeValue);

export type AttributesT = Static<typeof Attributes>;

export const FamilyName = Type.String({
  minLength: 1,
});

export const ProductName = Type.String({
  minLength: 1,
});

export const ProductItem = Type.Object({
  productFamilyName: FamilyName,
  productName: ProductName,
  attributes: Attributes,
  sku: Type.Optional(Type.String()),
});

export type ProductItemT = Static<typeof ProductItem>;
