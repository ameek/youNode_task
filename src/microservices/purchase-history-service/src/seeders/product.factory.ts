import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { Product } from '../entities/product.entity';

export const ProductsFactory = setSeederFactory(Product, (faker: Faker) => {
  const product = new Product();
  product.productCode = faker.random.alphaNumeric(5) ;
  product.productName = faker.commerce.productName();
  product.productDescription = faker.commerce.productDescription();
  product.productCategory = faker.commerce.department();
  product.productImage = faker.image.urlLoremFlickr();
  product.productPrice = parseFloat(faker.commerce.price(100, 1000, 2));
  product.productStockQuantity = faker.number.int({ min: 1, max: 1000 });

  // Randomly select a product status from the available options
  const productStatusOptions = ['available', 'outofstock', 'discontinued'];
  const randomProductStatusIndex = faker.number.int({
    min: 0,
    max: productStatusOptions.length - 1,
  });
  product.productStatus = productStatusOptions[randomProductStatusIndex];

  product.productAddedDate = new Date();

  return product;
});
