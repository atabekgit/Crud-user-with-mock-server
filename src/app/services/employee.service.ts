import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Employee} from "../models/employee.model";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {
  }


  getEmployees() {
    return this.http.get<Employee[]>(`${environment.baseUrl}`);
  }

  postEmployees(employee: Employee) {
    return this.http.post<Employee>(`${environment.baseUrl}`, employee);
  }

  deleteEmployees(id: any) {
    return this.http.delete(`${environment.baseUrl}/${id}`);
  }

}
