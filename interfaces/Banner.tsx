import { SanityImageSource } from '@sanity/image-url/lib/types/types';
export interface BannerType {
  _createdAt:string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt:string;
  buttonText: string;
  desc: string;
  discount:string;
  image: SanityImageSource
  largeText1: string;
  largeText2:string;
  midText:string;
  product:string;
  saleTime:string;
  smallText:string;
}
