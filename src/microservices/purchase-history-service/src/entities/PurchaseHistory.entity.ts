import { Product } from './product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

@Entity('purchase_histories')
export class PurchaseHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  productId: string;

  @Column()
  purchaseQuantity: number;

  @Column()
  purchaseTimestamp: Date;

  // Additional fields for detailed purchase information
  @Column()
  purchasePrice: number;

  @Column()
  discountApplied: number;

  @Column()
  totalAmountPaid: number;

  @Column()
  paymentMethod: string;

  // Relationships
  @JoinColumn({ name: 'productId', referencedColumnName: 'id' })
  @ManyToOne(() => Product, product => product.purchaseHistories)
  product: Product;
}
