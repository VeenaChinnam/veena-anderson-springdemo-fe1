import {Component,  OnInit} from '@angular/core';
import { UiStateService } from 'src/app/services/ui-state.service';
import { IEmployee } from 'src/app/Interfaces/IEmployee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
   employees: IEmployee[] = []
  employee: IEmployee =
    {
      name : "newguy",
      role : "workhard"
    }


  constructor(private uiState: UiStateService) {
    // Arrays passsed by reference
    // passed by reference -
    //    when one variable is assigned to another variable
    //    const var1 = {f1: "v1"}
    //    const var2 = var1
    //    var2.f1 = "v2"
    //    console.log(var1) // {f1: "v2"}

    // passed by value (passed by copy)
    //    const var1 = {f1: "v1"}
    //    const var2 = var1 // var2 = {...var1}
    //    var2.f1 = "v2"
    //    console.log(var1) // {f1: "v1"}

    uiState.whenEmployeesUpdated().subscribe(employees =>
      this.employees = [...employees]
    )
    // Why make a copy of uiState.employees
    //     - uiState.employess is not stable
    //
  }
  ngOnInit(): void {
  }

  onAddNew(){
    console.log('calling add newemployee')
    this.uiState.createEmployee(this.employee);

  }

}
