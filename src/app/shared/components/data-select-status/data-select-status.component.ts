import { Component, Input, OnInit } from '@angular/core';
import { StatusStateService } from 'src/app/components/dashboard/services/status.service';
import { State } from '../../models/state.model';

@Component({
  selector: 'app-data-select-status',
  templateUrl: './data-select-status.component.html',
  styleUrls: ['./data-select-status.component.css']
})
export class DataSelectStatusComponent implements OnInit {
  @Input() states: State;
  @Input() titleText: State;
  selectedState: State;

  constructor(private statusStateService: StatusStateService) { }

  ngOnInit(): void {
    this.selectState(this.states[0]);
   }

  selectState(states: State): void {
    this.selectedState = states;
    this.statusStateService.setStatusState(states.value);
  }
}
