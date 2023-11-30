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
import { MessagePattern } from '@nestjs/microservices';
import {
  CreateProductDto,
  UpdateProductDto,
  GetProductDto,
} from 'src/dtos/product.dto';
import { Product } from 'src/entities/product.entity';
import { ProductService } from 'src/services/product.service';
import { UserClientService } from 'src/services/user.service';
import { ProductList, ProductResponse } from 'src/types/productTypes';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly userClientService: UserClientService,
  ) {}

  @Get('/userList')
  async getUserData(
    @Query('limit') limit: number,
    @Query('cursor') cursor?: string,
  ) {
    try {
      console.log('user client');
      const userList = await this.userClientService.getUserById(limit, cursor);
      // console.log('users', userList);
      return { userList }
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get()
  async getProducts(
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('cursor') cursor?: string,
  ): Promise<ProductList> {
    const products = await this.productService.getProducts(limit, cursor);
    return products;
  }

  @Get(':id')
  @MessagePattern('GetProduct')

  async getProduct( productId: string): Promise<ProductResponse> {
    console.log('GetProduct', productId);
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

  /**
   * populate purchase history table
   * fetch user list
   * fetch product list
   * for each user create a history object containing user and product info
   * 
  async populatePurchaseHistory(): Promise<void> {
    const products = await this.productService.getProducts();
    const users = await this.userClientService.getUserById();
    // make chunks for users
    const usersChunks = [];

  }
   */
}
