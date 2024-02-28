import { ProductFamily } from "../../Core/Product/ProductFamily";
import { ProductService } from "../../Core/ProductService";

export class PromoProductFamily extends ProductFamily{
	public static readonly NAME = "promo";

	public static readonly PRODUCT_GIFTCARD = "giftcard";
	public static readonly PRODUCT_UV_LAMP = "uv_lamp";
	public static readonly PRODUCT_MONSTER_PACK = "monster_pack";
	public static readonly PRODUCT_MOST_LIKED_PACK_2021 = "most_liked_pack_2021";
	public static readonly PRODUCT_MOST_LIKED_PACK_2022 = "most_liked_pack_2022";
	public static readonly PRODUCT_CREEPY_HEAD_PACK = "creepy_head_pack";
	public static readonly PRODUCT_SAMPLE_STICKER_PACK = "sample_sticker_pack";
	public static readonly PRODUCT_MOST_LIKED_PACK_2023 = "most_liked_pack_2023";
	public static readonly PRODUCT_SLAP_PACK = "slap_pack";

	public constructor(service: ProductService){
		super(PromoProductFamily.NAME, 1, service);
	}
}