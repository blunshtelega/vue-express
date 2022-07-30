import { Product } from './product.model';

export interface ICategory {
    id?: number;
    title: string;
    description: string;
    productsList: Product[];
}
