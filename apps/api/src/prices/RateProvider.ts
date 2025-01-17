import { ConditionTestDataKeyNotFoundException } from "$/conditions/exceptions/ConditionTestDataKeyNotFoundException";
import { ProductConditionBuilder } from "$/product/condition/ProductConditionBuilder";
import { ProductItem } from "@stickerapp-org/nomisma";
import { Rate } from "./Rate";

export enum RateProviderType {
	BASE = "base",
	ADDON = "addon"
}

export abstract class RateProvider {
	protected name: string;
	protected type: string;
	public conditions: ProductConditionBuilder;

	public constructor(name: string) {
		this.name = name;
		this.type = RateProviderType.BASE;
		this.conditions = new ProductConditionBuilder();
	}

	public getName(): string {
		return this.name;
	}

	public getType(): string {
		return this.type;
	}

	public setType(type: RateProviderType): RateProvider {
		this.type = type;
		return this;
	}

	public test(productItem: ProductItem): boolean {
		let applicable = false;
		try {
			applicable = this.conditions.testOnItem(productItem);
		} catch (error) {
			if (error instanceof ConditionTestDataKeyNotFoundException) {
				applicable = false;
			} else {
				throw error;
			}
		}
		return applicable;
	}

	public abstract getRate(productItem: ProductItem, units: number): Promise<Rate>;
}
