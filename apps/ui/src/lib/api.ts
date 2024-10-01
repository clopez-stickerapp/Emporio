import { RequestBuilder } from './request-builder';
import {
  GetAttributesMapResponse,
  GetFamiliesResponse,
} from '@stickerapp-org/emporio-api-contract';

const rb = new RequestBuilder(`http://0.0.0.0:5012`);

export async function getAttributeMap(familyName: string, productName?: string) {
  const url = `/product/attribute-map/${familyName}${productName ? `/${productName}` : ''}`;
  const res = await rb.createRequest().setURL(url).execute(GetAttributesMapResponse);
  return res.attributes;
}

export async function getFamilies() {
  const url = '/product/families';
  const res = await rb.createRequest().setURL(url).execute(GetFamiliesResponse);
  return res.families;
}
