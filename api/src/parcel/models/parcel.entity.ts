import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ParcelEntity {
  @PrimaryColumn()
  sku: number;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column()
  town: string;

  @Column()
  country: string;

  @Column({ nullable: true })
  deliveryDate: Date;
}
