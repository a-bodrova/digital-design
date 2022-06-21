import { TaskDTO, TaskTypeEnum, TaskStatusEnum, TaskRankEnum } from "../Models/Task.model";
import { Entity, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Task implements TaskDTO {
    @ObjectIdColumn()
    id: string;
    @Column()
    userId: string;
    @Column()
    assignedId: string;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column({
        type: "enum",
        enum: TaskTypeEnum
    })
    type: TaskTypeEnum;
    @CreateDateColumn()
    dateOfCreation: Date;
    @UpdateDateColumn()
    dateOfUpdate: Date;
    @Column()
    timeInMinutes: number;
    @Column({
        type: "enum",
        enum: TaskStatusEnum
    })
    status: TaskStatusEnum;
    @Column({
        type: "enum",
        enum: TaskRankEnum
    })
    rank: TaskRankEnum;
}