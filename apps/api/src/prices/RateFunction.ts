import { ProductItem } from "@stickerapp-org/nomisma";
import { Rate } from "./Rate";
import { RateProvider } from "./RateProvider";

export class RateFunction extends RateProvider{
	public constructor(name: string, protected base: number, protected exp: number, protected min: number){
		super(name);
	}

	public async getRate(productItem: ProductItem, units: number): Promise<Rate> {
		const rate = this.base * Math.pow(units, -this.exp) + this.min;

		return new Rate(rate);
	}
}