import type { ICategory } from "./categoryType"

export interface ISubcategory{
    id:string,
    name?:string,
    category_id?:string,
    seller_id?:string,
    category?:ICategory
}

export interface EditSubcategory{
    id?:string,
    body?:ISubcategory
}