import { ProductAttr } from "../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../Core/Product/Attribute/ProductAttrValueType";

export class MarketAttribute extends ProductAttr {
	public static readonly ALIAS = "market";

	public static readonly US = "us";
	public static readonly SE = "se";
	public static readonly DK = "dk";
	public static readonly UK = "uk";
	public static readonly DE = "de";
	public static readonly NO = "no";
	public static readonly NL = "nl";
	public static readonly FI = "fi";
	public static readonly IT = "it";
	public static readonly FR = "fr";
	public static readonly JP = "jp";
	public static readonly ES = "es";
	public static readonly PT = "pt";
	public static readonly PL = "pl";

	public constructor() {
		super( ProductAttrValueType.STRING );

		this.addAttrValue( MarketAttribute.US );
		this.addAttrValue( MarketAttribute.SE );
		this.addAttrValue( MarketAttribute.DK );
		this.addAttrValue( MarketAttribute.UK );
		this.addAttrValue( MarketAttribute.NO );
		this.addAttrValue( MarketAttribute.DE );
		this.addAttrValue( MarketAttribute.NL );
		this.addAttrValue( MarketAttribute.FI );
		this.addAttrValue( MarketAttribute.IT );
		this.addAttrValue( MarketAttribute.FR );
		this.addAttrValue( MarketAttribute.JP );
		this.addAttrValue( MarketAttribute.ES );
		this.addAttrValue( MarketAttribute.PT );
		this.addAttrValue( MarketAttribute.PL );
	}
}
