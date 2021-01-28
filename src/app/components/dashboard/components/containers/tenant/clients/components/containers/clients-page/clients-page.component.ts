import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GridStateService } from 'src/app/components/dashboard/services/grid.service';
import { Client } from '../../../modules/client.module';
import { State } from 'src/app/shared/models/state.model';
import { activeStates, tenantStates } from '../../../utils/clients.data';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/components/dashboard/services/clients.service';

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.css'],
})
export class ClientsPageComponent implements OnInit {
  languages: [] = null;
  pageData: Client[] = null;

  /* Grid options */
  gridOption = {
    editButton: true,
    textSearchColumnName: 'title'
  };
  displayedColumns: string[] = ['state', 'title', 'sity', 'count', 'date', 'azioni'];
  gridColumns = [
    { columnDef: 'state', header: 'Stato', type: 'active', styleClass: 'w-75', cell: (element: Client) => element.state },
    { columnDef: 'title', header: 'Nome Attività', type: 'string', styleClass: 'w-120', cell: (element: Client) => element.title },
    { columnDef: 'sity', header: 'Città', type: 'string-center', styleClass: 'w-120', cell: (element: Client) => element.sity },
    { columnDef: 'count', header: 'Scansioni menu', type: 'string-center', styleClass: 'w-100', cell: (element: Client) => element.count },
    { columnDef: 'date', header: 'Ultimo Login', type: 'string-center', styleClass: 'w-75', cell: (element: Client) => element.date },
    { columnDef: 'azioni', header: 'Azione', type: 'control', styleClass: 'w-75', cell: (element: Client) => element },
  ];

  activeStates: State[] = activeStates;
  tenantStates: State[] = tenantStates;

  defaultValue: Client = null;

  constructor(
    private gridStateService: GridStateService,
    public dialog: MatDialog,
    private router: Router,
    private clientService: ClientService,
  ) { }

  ngOnInit(): void {
    this.getPageData();
  }

  getPageData() {
    const pageData$ = this.clientService.getAllClients()
    pageData$.subscribe(res => {
      this.pageData = res.map((rec) => {
        return {
          id: rec['id'],
          state: rec['active'],
          title: rec['name'],
          sity: 'San Vito Lo Capo',
          count: 36,
          date: rec['activationDate']
        }
      })
      this.languages = [];
    });
  }

  onCreate(): void {
    this.router.navigate(['/tenant/client-creation']);
  }

  onEdit(client: Client): void {
    this.router.navigate(['/tenant/client-details/'/*, client.id*/]);
  }

}
