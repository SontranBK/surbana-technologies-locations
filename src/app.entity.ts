import { Entity, PrimaryGeneratedColumn, Column, Tree, TreeParent, TreeChildren } from 'typeorm';

@Entity()
@Tree('materialized-path')
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  parentId: number;

  @TreeParent()
  parent: Location;

  @TreeChildren()
  children: Location[];
}