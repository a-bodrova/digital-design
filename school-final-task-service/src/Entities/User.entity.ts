import { UserWithCredsDTO } from "../Models/User.model";
import { Entity, ObjectIdColumn, Column, Index } from "typeorm";

@Entity()
export class User implements UserWithCredsDTO {
    @ObjectIdColumn()
    id: string;
    @Column()
    login: string;
    @Column()
    password: string;
    @Column()
    @Index({ fulltext: true })
    username: string;
    @Column()
    about: string;
    @Column()
    photoUrl: string;
}