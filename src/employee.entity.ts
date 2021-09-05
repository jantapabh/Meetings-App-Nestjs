import { Column, Entity,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryGeneratedColumn } from "typeorm";
import { ContactInfo } from "./contact-info.entity";
import { Meeting } from "./meeting.entity";
import { Task } from "./task.entity";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // manager variable in employee table 
    @ManyToOne(() => Employee, (employee) => employee.directReports, { onDelete: 'SET NULL'})
    manager: Employee;

    //One-to-Many
    @OneToMany(() => Employee, (employee) => employee.manager)
    directReports: Employee[];

    //one to one
    @OneToOne(() => ContactInfo, (contactInfo) => contactInfo.employee)
    contactInfo: ContactInfo;

    //one to many
    @OneToMany(() => Task, (task) => task.employee, { eager: true})
    tasks: Task[];

    //Meeting and Employee
    @ManyToMany(() => Meeting,(meeting) => meeting.attendees)
    @JoinTable()
    meetings: Meeting[];
}