import type { ICategory } from "./category.type"

export interface ISubcategory{
    id:string,
    name?:string,
    category_id?:string,
    seller_id?:string,
    category?:ICategory
}

export interface EditSubcategoryArgs{
    id?:string,
    body?:ISubcategory
}