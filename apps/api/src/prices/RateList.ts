import { ProductItem } from "$/product/ProductItem";
import { Rate } from "./Rate";
import { RateProvider } from "./RateProvider";

export class RateList extends RateProvider{
	protected defaultRate: Rate;
	protected rates: Rate[] = [];

	public constructor(name: string, defaultRate: Rate = new Rate(0)){
		super(name);
		this.defaultRate = defaultRate;
	}

	public addRate(rate: Rate, threshold: number): RateList{
		rate.setUnitThreshold(threshold);
		this.rates.push(rate);
		RateList.sortByThreshold(this.rates);
		return this;
	}

	public async getRate(productItem: ProductItem, units: number): Promise<Rate>{
		for(let rate of this.rates){
			/**
			 * Since rates are sorted in reverse order, the thresholds are in descending order
			 * So the first threshold we go over is the one we want
			 */
			if(units > rate.getUnitThreshold()){
				return rate;
			}
		}
		return this.defaultRate;
	}

	public getRates(): Rate[]{
		return [...this.rates, this.defaultRate];
	}

	// Rates are sorted in reverse order, so the highest threshold comes first
	public static sortByThreshold(rates: Rate[]): void{
		rates.sort((a, b) => {
			return a.getUnitThreshold() < b.getUnitThreshold() ? 1 : -1;
		});
	}
}