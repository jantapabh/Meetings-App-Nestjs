import { Column, Entity,JoinColumn,ManyToOne,OneToOne,PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./employee.entity";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true})
    phone: string;

    //Join table employee
    @ManyToOne(() => Employee, employee => employee.tasks, { onDelete: 'SET NULL'})
    employee: Employee;
    

    // @Column()
    // email: string;

    // @Column()
    // employeeId: number;

    // @OneToOne(() => Employee, employee => employee.contactInfo, { onDelete: 'CASCADE'})
    // @JoinColumn()
    // employee: Employee;
}