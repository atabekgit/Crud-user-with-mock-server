import {AfterContentInit, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Employee} from "./models/employee.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit ,OnInit{
 @ViewChild('tempButton') buttontemp:any;
 employeeForm:FormGroup
  employees:Employee[]
  employeeToDisplay:Employee[]
 educationOptions =[
   '10th pass',
   'diploma',
   'graduate',
   'post graduate',
   'PhD',
 ];
 constructor(private fb:FormBuilder) {
   this.employeeForm = fb.group({})
   this.employees = []
   this.employeeToDisplay = this.employees
 }

  ngAfterViewInit(): void {
    this.buttontemp.nativeElement.click();
  }

  ngOnInit(): void {
   this.employeeForm = this.fb.group({
     firstName:this.fb.control(''),
     lastName:this.fb.control(''),
     birthday:this.fb.control(''),
     gender:this.fb.control(''),
     education:this.fb.control('default'),
     company:this.fb.control(''),
     jobExperience:this.fb.control(''),
     salary:this.fb.control(''),

   })
  }
}
