import { Entity, PrimaryGeneratedColumn, Column, Tree, TreeChildren, TreeParent } from 'typeorm';

@Entity()
@Tree('materialized-path')
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  building: string;

  @Column()
  area: number;

  @Column()
  locationNumber: string;

  @Column({ nullable: true })
  parentId: number;

  @TreeParent()
  parent: Location;

  @TreeChildren()
  children: Location[];

}