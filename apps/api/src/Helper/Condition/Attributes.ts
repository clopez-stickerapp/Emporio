import { AttributeValue } from "./AttributeValue";

export type Attributes<T extends AttributeValue = AttributeValue> = Record<string, T>;