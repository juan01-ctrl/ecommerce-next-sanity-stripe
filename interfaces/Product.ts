import { SanityAsset } from '@sanity/image-url/lib/types/types';
export interface ProductType{
    details: string
    image: SanityAsset[]
    name: string
    price: number
    slug: {_type: string, current: string}
    _createdAt: string
    _id: string
    _rev:string
    _type: string
    _updatedAt: string
    quantity:number
}