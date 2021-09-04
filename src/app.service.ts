import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactInfo } from './contact-info.entity';
import { Employee } from './employee.entity';
import { Meeting } from './meeting.entity';
import { Task } from './task.entity';

@Injectable()
export class AppService {
  constructor(
  @InjectRepository(Employee) private employeeRepo: Repository<Employee>,
  @InjectRepository(ContactInfo) private contactInfoRepo: Repository<ContactInfo>,
  @InjectRepository(Meeting) private meetingRepo: Repository<Meeting>,
  @InjectRepository(Task) private taskRepo: Repository<Task>,
  ){}

  async seed(){
    //employee 1 is CEO
    const ceo = this.employeeRepo.create({ name: 'Jan'});
    await this.employeeRepo.save(ceo);
    // ceo.id
    const ceoContactInfo = this.contactInfoRepo.create({ 
      email: "jantapa@hotmail.com", 
      // employeeId: ceo.id
    });

    ceo.contactInfo.employee = ceo;
    await this.contactInfoRepo.save(ceoContactInfo)

    //Employee 2 is Manager
    const manager = this.employeeRepo.create({
      name: 'But',
      manager: ceo,
    });


    //Task 1, 2 
    const task1 = this.taskRepo.create({ name: 'Jenny'});
    await this.taskRepo.save(task1)

    const task2 = this.taskRepo.create({ name: "Jimmy"})
    await this.taskRepo.save(task2)

    //save task on table
    manager.tasks = [task1, task2];

    const meeting1 = this.meetingRepo.create({ zoomUrl: 'Meetings.com'})
    meeting1.attendees = [ceo]
    await this.meetingRepo.save(meeting1);

    manager.meetings = [meeting1];

    await this.employeeRepo.save(manager)
  }

  getHello(): string {
    return 'Hello World!';
  }
}
