import type { ICategory } from "./categoryType"
import type { ISubcategory } from "./subcategoryType"

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

export interface EditProduct{
    id?:string;
    formData:FormData;
}