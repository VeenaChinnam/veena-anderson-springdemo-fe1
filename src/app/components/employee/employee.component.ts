import { Component, Input, OnInit } from '@angular/core';
import { UiStateService } from 'src/app/services/ui-state.service';
import { IEmployee } from 'src/app/Interfaces/IEmployee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @Input() employee: IEmployee | undefined
  // What does the ! do?
  // It is not the same as IEmployee | undefined
  // It is not the same as IEmployee | null
  // Typescript wants to check that your code is type correct
  // ! disables that check entirely for this field

  constructor(private uiState: UiStateService) { }

  ngOnInit(): void {
  }

  onDelete() : void {
    this.uiState.deleteEmployeeById(this.employee?.id)
  }




}
