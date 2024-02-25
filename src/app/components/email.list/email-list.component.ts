import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {EmailEnviado} from "../../models/email-enviado";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {EmailService} from "../../services/email.service";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-email.list',
  templateUrl: './email-list.component.html',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButton,
    RouterLink,
    MatFormField,
    MatInput,
    MatLabel
  ],
  styleUrl: './email-list.component.css'
})
export class EmailListComponent implements OnInit, AfterViewInit {

  ELEMENT_DATA: EmailEnviado[] = []

  displayedColumns: string[] = ['id', 'sendTo', 'status', 'subject', 'text', 'sendDate'];
  dataSource = new MatTableDataSource<EmailEnviado>(this.ELEMENT_DATA);

  constructor(private service: EmailService) {
  }

  ngOnInit() {
    this.getEmails();
  }

  getEmails(): void {
    this.service.getEmails().subscribe(res => {
      this.ELEMENT_DATA = res;
      this.dataSource = new MatTableDataSource<EmailEnviado, MatPaginator>(res);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
