import { Currencies, CurrencyConverter, getConversionRates } from "../Currency/Currency";
import { ProductItem } from "../Product/Item/ProductItem";
import { Price, calculateBreakdownSum } from "./Price";
import { ProductPriceProvider } from "./ProductPriceProvider";
import { Rate, RateType } from "./Rate";
import { RateProvider } from "./RateProvider";

export class RateBasedProductPriceProvider extends ProductPriceProvider {
	protected rateProviders: Record<string, RateProvider> = {};

	public calculatePrice(productItem: ProductItem, units: number, currency: Currencies): Price {
		let providers = this.getRateProvidersFor(productItem);
		let breakdown = this.getPriceFor(providers, units);
		let total = calculateBreakdownSum(breakdown);

		let price: Price = {
			total,
			breakdown,
			currency: Currencies.USD
		};

		let converter = new CurrencyConverter();
		return converter.convertPrice(price, currency);	
	}

	protected getPriceFor(providers: RateProvider[], units: number): Record<string, number> {
		// TODO: have two modes: merge or highest wins
		const flatRates: Record<string, Rate> = {};
		const percentageRates: Record<string, Rate> = {};

		for (const rateProvider of providers) {
			const rate = rateProvider.getRate(units);
			if (rate){
				if (rate.isPercentage()) {
					percentageRates[rateProvider.getName()] = rate;
				} else {
					flatRates[rateProvider.getName()] = rate;
				}
			}
		}

		let flatTotal = 0;
		const compound: Record<string, number> = {};

		for (const [provider, rate] of Object.entries(flatRates)) {
			flatTotal += rate.getValue();
			compound[provider] = rate.getValue();
		}

		for (const [provider, rate] of Object.entries(percentageRates)) {
			if (rate.getType() === RateType.ADDITIVE) {
				const resultRate = rate.getValue() * flatTotal;
				// The minimum value is based on the total amount, the unit rate * amount of units,
				// so that's the value we have to compare to the minimum rate to decide if it's over
				// the threshold.
				const resultTotalRate = resultRate * units;

				if (resultTotalRate > 0 && resultTotalRate < rate.getMinValue()) {
					// Since this function calculates the rate per unit, we can't simply add the total
					// specified in the rate. We have to divide it by the total amount of units.
					compound[provider] = rate.getMinValue() / units;
				} else {
					compound[provider] = resultRate;
				}
			} else if (rate.getType() === RateType.MULTIPLICATIVE) {
				//map to array
				let compoundArray = Array.from(Object.values(compound));
				const resultRate = rate.getValue() * compoundArray.reduce((a, b) => a + b, 0);

				// The minimum value is based on the total amount, the unit rate * amount of units,
				// so that's the value we have to compare to the minimum rate to decide if it's over
				// the threshold.
				const resultTotalRate = resultRate * units;

				if (resultTotalRate > 0 && resultTotalRate < rate.getMinValue()) {
					// Since this function calculates the rate per unit, we can't simply add the total
					// specified in the rate. We have to divide it by the total amount of units.
					compound[provider] = rate.getMinValue() / units;
				} else {
					compound[provider] = resultRate;
				}
			}
		}

		return compound;
	}

	public addRateProvider(rateProvider: RateProvider): void {
		if (this.rateProviders[rateProvider.getName()]) {
			throw new Error("Cannot add rate provider. Rate provider '" + rateProvider.getName() + "' already exists.");
		}

		this.rateProviders[rateProvider.getName()] = rateProvider;
	}

	public getRateProvidersFor(productItem: ProductItem): RateProvider[] {
		const rateProviders: RateProvider[] = [];

		for (const rateProvider of Object.values(this.rateProviders)) {
			if (rateProvider.test(productItem)) {
				rateProviders.push(rateProvider);
			}
		}

		if (rateProviders.length === 0) {
			throw new Error("No applicable rate providers found for: " + JSON.stringify(productItem) + ".");
		}

		return rateProviders;
	}

	public getRateProviders(): Record<string, RateProvider> {
		return this.rateProviders;
	}
}