import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/product.dto';
import { Product } from 'src/entities/product.entity';
import { FindManyOptions, MoreThan, Repository } from 'typeorm';
import { ProductList, ProductResponse } from 'src/types/productTypes';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getProducts(limit: number, cursor?: string): Promise<ProductList> {
    try {
      const MAX_LIMIT = 100;
      if (limit > MAX_LIMIT) {
        limit = MAX_LIMIT;
      }
      const queryOptions: FindManyOptions<Product> = {
        take: limit,
        order: { id: 'ASC' },
      };

      if (cursor) {
        queryOptions.where = {
          id: MoreThan(cursor),
        };
      }

      const [products, count] =
        await this.productRepository.findAndCount(queryOptions);
      console.log(count);
      const hasNextPage = count > limit;

      return {
        products: products.slice(0, limit),
        hasNextPage,
        lastCursor: products.length ? products[products.length - 1].id : '',
      };
    } catch (error) {
      throw new Error('Failed to fetch users: ' + error.message);
    }
  }

  async getProduct(productId: string): Promise<ProductResponse> {
    try {
      const product = await this.productRepository.findOneOrFail({
        where: { id: productId },
      });
      return {
        success: {
          product,
        },
      };
    } catch (error) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
  }

  async createProduct(productData: CreateProductDto): Promise<ProductResponse> {
    try {
      const product = this.productRepository.create(productData);
      await this.productRepository.save(product);
      return {
        message: 'Product created successfully',
        success: {
          product,
        },
      };
    } catch (error) {
      throw new Error(`Failed to create product: ${error.message}`);
    }
  }

  async updateProduct(
    productId: string,
    productData: UpdateProductDto,
  ): Promise<ProductResponse> {
    try {
      const product = await this.productRepository.findOneOrFail({where: {id: productId}});
      
      product.productCode = productData.productCode ?? product.productCode;
      product.productName = productData.productName ?? product.productName;
      product.productDescription = productData.productDescription ?? product.productDescription;
      product.productCategory = productData.productCategory ?? product.productCategory;
      product.productImage = productData.productImage ?? product.productImage;
      product.productPrice = productData.productPrice ?? product.productPrice;
      product.productStockQuantity = productData.productStockQuantity ?? product.productStockQuantity;
    
      await this.productRepository.save(product);
      return {
        message: 'Product updated successfully',
        success: {
          product,
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Product with ID ${productId} not found`);
      }
      throw new Error(`Failed to update product: ${error.message}`);
    }
  }

  async deleteProduct(productId: string): Promise<void> {
    try {
      await this.productRepository.delete(productId);
    } catch (error) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
  }
}
