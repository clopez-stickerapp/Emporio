import { ProductItem } from "../Product/Item/ProductItem";
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

	public getRate(units: number): Rate{
		for(let rate of this.rates){
			// This was previously just greater than, but this is more intuitive
			if(units >= rate.getUnitThreshold()){
				return rate;
			}
		}
		return this.defaultRate;
	}

	public getRates(): Rate[]{
		return this.rates;
	}

	// Rates are sorted in reverse order, so the highest threshold comes first
	public static sortByThreshold(rates: Rate[]): void{
		rates.sort((a, b) => {
			return a.getUnitThreshold() < b.getUnitThreshold() ? 1 : -1;
		});
	}

	public addFromArray(rates: Rate[]): RateList{
		throw new Error("Check if still used or if there's a better way")
		for(let rate of rates){
			this.addRate(rate, rate.getUnitThreshold());
		}
		return this;
	}
}