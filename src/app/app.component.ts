import {AfterContentInit, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Employee} from "./models/employee.model";
import {EmployeeService} from "./services/employee.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  @ViewChild('fileInput') fileInput: any;
  @ViewChild('addEmButton') addEmButton: any;
  employeeForm: FormGroup
  employees: Employee[]
  employeeToDisplay: Employee[]
  educationOptions = [
    '10th pass',
    'diploma',
    'graduate',
    'post graduate',
    'PhD',
  ];

  constructor(private fb: FormBuilder, private services: EmployeeService) {
    this.employeeForm = fb.group({})
    this.employees = []
    this.employeeToDisplay = this.employees
  }

  ngAfterViewInit(): void {
    // this.buttontemp.nativeElement.click();
  }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstName: this.fb.control(''),
      lastName: this.fb.control(''),
      birthday: this.fb.control(''),
      gender: this.fb.control(''),
      education: this.fb.control('default'),
      company: this.fb.control(''),
      jobExperience: this.fb.control(''),
      salary: this.fb.control(''),
    });
    this.services.getEmployees().subscribe((res) => {
      for (let emp of res) {
        this.employees.unshift(emp)
      }
      this.employeeToDisplay = this.employees
    })
  }

  addEmployee() {
    let employee: Employee = {
      firstName: this.FirstName.value,
      lastName: this.LastName.value,
      birthday: this.Birthday.value,
      gender: this.Gender.value,
      education: this.educationOptions[parseInt(this.Education.value)],
      company: this.Company.value,
      jobExperience: this.JobExperience.value,
      salary: this.Salary.value,
      profile: this.fileInput.nativeElement.files[0]?.name
    };
    this.services.postEmployees(employee).subscribe((res: any) => {
      this.employees.unshift(res)
      this.clearForm()
    })
  }

  clearForm() {
    this.FirstName.setValue('')
    this.LastName.setValue('')
    this.Birthday.setValue('')
    this.Gender.setValue('')
    this.Education.setValue('')
    this.Company.setValue('')
    this.JobExperience.setValue('')
    this.Salary.setValue('')
    this.fileInput.nativeElement.value = '';
  }

  public get FirstName(): FormControl {
    return this.employeeForm.get('firstName') as FormControl
  }

  public get LastName(): FormControl {
    return this.employeeForm.get('lastName') as FormControl
  }

  public get Birthday(): FormControl {
    return this.employeeForm.get('birthday') as FormControl
  }

  public get Gender(): FormControl {
    return this.employeeForm.get('gender') as FormControl
  }

  public get Education(): FormControl {
    return this.employeeForm.get('education') as FormControl
  }

  public get Company(): FormControl {
    return this.employeeForm.get('company') as FormControl
  }

  public get JobExperience(): FormControl {
    return this.employeeForm.get('jobExperience') as FormControl
  }

  public get Salary(): FormControl {
    return this.employeeForm.get('salary') as FormControl
  }


  removeEm(event: any) {
    this.employees.forEach((val, idx) => {
      if (val.id === parseInt(event)) {
        this.services.deleteEmployees(event).subscribe((res) => {
          this.employees.splice(idx, 1)
        })
      }
    })
  }

  editEmployee(event: any) {
    this.employees.forEach((val, idx) => {
      if (val.id === event) {
        this.setForm(val)
      }
    })
    this.removeEm(event)
    this.addEmButton.nativeElement.click();

  }

  setForm(emp: Employee) {
    this.FirstName.setValue(emp.firstName)
    this.LastName.setValue(emp.lastName)
    this.Birthday.setValue(emp.birthday)
    this.Gender.setValue(emp.gender)
    let educationIndex = 0
    this.educationOptions.forEach((val, idx) => {
      if (val === emp.education) educationIndex = idx
    });
    this.Education.setValue(educationIndex)
    this.Company.setValue(emp.company)
    this.JobExperience.setValue(emp.jobExperience)
    this.Salary.setValue(emp.salary)
    this.fileInput.nativeElement.value = ''
  }

  searchValue(value: any) {
    let filterEm: Employee[] = []
    if (value === '') {
      this.employeeToDisplay = this.employees
    } else {
      filterEm = this.employees.filter((val, idx) => {
        let targetKey = val.firstName.toLowerCase()+''+val.lastName.toLowerCase()
        let searchKey = value.toLowerCase();
        return targetKey.includes(searchKey)
      })
      this.employeeToDisplay = filterEm
    }
  }
}
