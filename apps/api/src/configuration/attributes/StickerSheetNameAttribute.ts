import { ProductAttr } from '$/product/attribute/ProductAttr';
import { ProductAttrValueType } from '@stickerapp-org/nomisma';

export const StickerSheetNameValues = {
  CONTOUR: 'path',
  RECTANGLE: 'rect',
  ROUND: 'circle',
  ROUNDED: 'rounded',
  STICKER_INDIVIDUAL: 'sticker_individual',
  STICKER: 'sticker',
  SHEET: 'sheet',
  TEMPLATE: 'template',
  MANUAL: 'manual',

  GIFTCARD: 'giftcard',
  UV_LAMP: 'uv_lamp',
  MONSTER_PACK: 'monster_pack',
  MOST_LIKED_PACK_2021: 'most_liked_pack_2021',
  MOSTP_LIKED_PACK_2022: 'most_liked_pack_2022',
  CREEPY_HEAD_PACK: 'creepy_head_pack',
  SAMPLE_STICKER_PACK: 'sample_sticker_pack',
  MOST_LIKED_PACK_2023: 'most_liked_pack_2023',
  SLAP_PACK: 'slap_pack',
  STICKER_FREEBIE: 'sticker_freebie',
};

export const StickerSheetNameAttribute = new ProductAttr({
  name: 'sheet_name',
  type: ProductAttrValueType.STRING,
  values: Object.values(StickerSheetNameValues),
});
