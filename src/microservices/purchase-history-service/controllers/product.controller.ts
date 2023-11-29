import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  ParseIntPipe,
  NotFoundException,
  Body,
} from '@nestjs/common';
import {
  CreateProductDto,
  UpdateProductDto,
  GetProductDto,
} from 'dtos/product.dto';
import { Product } from 'entities/product.entity';
import { ProductService } from 'services/product.service';
import { ProductList, ProductResponse } from 'types/productTypes';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('cursor') cursor?: string,
  ): Promise<ProductList> {
    const products = await this.productService.getProducts(limit, cursor);
    return products;
  }

  @Get(':id')
  async getProduct(@Param('id') productId: string): Promise<ProductResponse> {
    const product = await this.productService.getProduct(productId);
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    return product;
  }

  @Post()
  async createProduct(
    @Body() productData: CreateProductDto,
  ): Promise<ProductResponse> {
    const product = await this.productService.createProduct(productData);
    return product;
  }

  @Put(':id')
  async updateProduct(
    @Param('id') productId: string,
    @Body() productData: UpdateProductDto,
  ): Promise<GetProductDto> {
    const product = await this.productService.updateProduct(
      productId,
      productData,
    );
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    return new GetProductDto();
  }

  @Delete(':id')
  async deleteProduct(@Param('id') productId: string): Promise<void> {
    await this.productService.deleteProduct(productId);
  }
}
