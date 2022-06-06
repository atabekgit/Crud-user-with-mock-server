import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Employee} from "../models/employee.model";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  @Input() employee: Employee;
  @Output() onRemove = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<number>();
  constructor() {
    this.employee = {
      firstName: '',
      lastName: '',
      birthday: '',
      gender: '',
      education: '',
      company: '',
      jobExperience: 0,
      salary: 0,
      profile: '',
    }
  }
  ngOnInit(): void {
    console.log(this.employee)
  }

  delete(){
    this.onRemove.emit(this.employee?.id)
  }
  edit(){
    this.onEdit.emit(this.employee?.id)
  }

}
