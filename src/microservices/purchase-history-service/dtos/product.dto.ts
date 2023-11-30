

import { IsNotEmpty, IsString, IsOptional, IsNumber, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  productCode: string;

  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsString()
  productDescription: string;

  @IsNotEmpty()
  @IsString()
  productCategory: string;

  @IsOptional()
  @IsUrl()
  productImage?: string; // URL to the product image

  @IsNotEmpty()
  @IsNumber()
  productPrice: number;

  @IsNotEmpty()
  @IsNumber()
  productStockQuantity: number;
}



export class UpdateProductDto {
  @IsOptional()
  @IsString()
  productCode?: string;

  @IsOptional()
  @IsString()
  productName?: string;

  @IsOptional()
  @IsString()
  productDescription?: string;

  @IsOptional()
  @IsString()
  productCategory?: string;

  @IsOptional()
  @IsUrl()
  productImage?: string; // URL to the product image

  @IsOptional()
  @IsNumber()
  productPrice?: number;

  @IsOptional()
  @IsNumber()
  productStockQuantity?: number;
}


export class GetProductDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  productCode: string;

  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsString()
  productDescription: string;

  @IsNotEmpty()
  @IsString()
  productCategory: string;

  @IsOptional()
  @IsUrl()
  productImage?: string; // URL to the product image

  @IsNotEmpty()
  @IsNumber()
  productPrice: number;

  @IsNotEmpty()
  @IsNumber()
  productStockQuantity: number;

  @IsNotEmpty()
  @IsString()
  productStatus: string;

  @IsNotEmpty()
  productAddedDate: Date;
}
   