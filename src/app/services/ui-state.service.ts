import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Employee } from 'src/Employee';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UiStateService {
  public employees: Employee[] = [
    {
      name: "Max",
      role: "Dictator"
    },
    {
      name: "Dav",
      role: "Peasant"
    }
  ]
  private employeesSubject : Subject<Employee[]> = new Subject

  constructor(private http: HttpService) {
    this.http.getAllEmployees().subscribe(employees =>
      this.employeesSubject.next(employees)
    )
  }

  whenEmployeesUpdated() : Observable<Employee[]> {
    return this.employeesSubject;
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
}
