import { Component, OnInit } from '@angular/core';
import {UiStateService} from "../../services/ui-state.service";
import {IManager} from "../../Interfaces/IManager";

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit {
  managers: IManager[] = []

  constructor( private uiState: UiStateService) {
    uiState.whenManagersUpdated().subscribe(managers => {
        this.managers = [...managers]
        console.log(this.managers);
    })
  }

  ngOnInit(): void {
  }



}
