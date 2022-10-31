import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IEmployee } from 'src/app/Interfaces/IEmployee';
import { HttpService } from './http.service';
import {IManager} from "../Interfaces/IManager";

@Injectable({
  providedIn: 'root'
})
export class UiStateService {
  public employees: IEmployee[] = [
    {
      name: "Max",
      role: "Dictator"
    },
    {
      name: "Dav",
      role: "Peasant"
    }
  ]

  public managers: IManager[] = []



  private employeesSubject : Subject<IEmployee[]> = new Subject
  private managerSubject : Subject<IManager[]> = new Subject

  constructor(private http: HttpService) {
    this.http.getAllEmployees().subscribe(employees =>
      this.employeesSubject.next(employees)
    )

    this.http.getAllManagers().subscribe(managers =>
      this.managerSubject.next(managers)
    )
  }

  whenEmployeesUpdated() : Observable<IEmployee[]> {
    return this.employeesSubject;
  }

  whenManagersUpdated(): Observable<IManager[]>{
    return this.managerSubject;
  }

  deleteEmployeeById(id: number | undefined) : void {
    if (id === undefined)
      return

    this.http.deleteEmployeeById(id).subscribe(message =>
      this.http.getAllEmployees().subscribe(employees =>
        this.employeesSubject.next(employees)
        )
    )
  }


  createEmployee(newEmployee: IEmployee) {
    console.log('calling http service')
    this.http.addNewEmployee(newEmployee).subscribe(employee => console.log(employee))
  }
}
