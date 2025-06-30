import type { ICategory } from "./category.type"
import type { ISubcategory } from "./subcategory.type"

export interface IProduct{
    id:string;
    name:string;
    description:string;
    price:string;
    quantity:string;
    image_url:string|any;
    category_id?:string;
    subcategory_id?:string;
    seller_id:string;
    subcategory?:ISubcategory
    category?:ICategory
}

export interface EditProductArgs {
    id?:string;
    formData:FormData;
}