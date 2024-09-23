import { services } from "$/ServiceLoader";
import { Clone } from "@sinclair/typebox/value";
import { FamilyName, ProductName } from "@stickerapp-org/emporio-api-contract";

const service = services[ "stickerapp" ];

export const attributes = {
	"sheet_type": "single",
	"sheet_name": "path",
	"delivery": "single",
	"material": "white",
	"laminate": "glossy_uv",
	"imperial_units": true,
	"width_mm": 51,
	"height_mm": 25,
	"quantity": 111
};

export const productItem = {
	productFamilyName: 'custom_sticker',
	productName: 'die_cut',
	attributes: attributes,
	sku: 'DCRS-108'
}

export const familyNames = service.getProductFamilies().map( family => family.getName() );
export const productNames = service.getProductFamilies().flatMap( family => Object.keys( family.getProducts() ) );
export const attributeNames = service.getAttributes().map( attribute => attribute.getName() );

const FamilyNameCloned = Clone( FamilyName );
FamilyNameCloned.examples = familyNames;
export { FamilyNameCloned as FamilyName };

const ProductNameCloned = Clone( ProductName );
ProductNameCloned.examples = productNames;
export { ProductNameCloned as ProductName };