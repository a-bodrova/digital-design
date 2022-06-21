import { CommentDTO } from "../Models/Comment.model";
import { Entity, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Comment implements CommentDTO {
    @ObjectIdColumn()
    id: string;
    @Column()
    taskId: string;
    @Column()
    userId: string;
    @Column()
    text: string;
    @CreateDateColumn()
    dateOfCreation: Date;
    @UpdateDateColumn()
    dateOfUpdate: Date;
}