import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PurchaseHistory } from './PurchaseHistory.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productCode: string;

  @Column()
  productName: string;

  @Column()
  productDescription: string;

  @Column()
  productCategory: string;

  @Column()
  productImage: string; // URL to the product image

  @Column()
  productPrice: number;

  @Column()
  productStockQuantity: number;

  @Column({
    type: 'enum',
    enum: ['available', 'outofstock', 'discontinued'],
  })
  productStatus: string;

  @Column()
  productAddedDate: Date;

  @OneToMany(
    () => PurchaseHistory,
    (purchaseHistory) => purchaseHistory.product,
  )
  purchaseHistories: PurchaseHistory[];
}
