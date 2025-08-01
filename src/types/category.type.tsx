export interface ICategory {
    id: string,
    name?: string,
    seller_id?: string
}

export interface UpdateCategoryArgs {
    id: string,
    body: UpdateCategoryBody
}

export interface UpdateCategoryBody {
    name: string
}

export interface CreateCategoryType {
    name: string;
}
