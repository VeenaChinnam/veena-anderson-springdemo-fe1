import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployee } from 'src/app/Interfaces/IEmployee';
import {IManager} from "../Interfaces/IManager";


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getAllEmployees() : Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>('http://localhost:8080/api/employee')
  }


  //adding new employee
  addNewEmployee(newEmployee: IEmployee) : Observable<IEmployee> {
    console.log('calling post on backend', newEmployee)
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const myJsonEmployee = JSON.stringify(newEmployee)
    return this.http.post<IEmployee>('http://localhost:8080/api/employee',myJsonEmployee,{headers: headers})
    // return this.http.post<IEmployee>('http://localhost:8080/api/employee', newEmployee)
  }

  deleteEmployeeById(id: number) : Observable<string> {
    return this.http.delete<string>(`http://localhost:8080/api/employee/${id}`)
  }


  getAllManagers() : Observable<IManager[]> {
    return this.http.get<IManager[]>('http://localhost:8080/api/manager')
  }


}
