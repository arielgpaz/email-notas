import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {EmailEnviado} from "../../models/email-enviado";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {EmailService} from "../../services/email.service";

@Component({
  selector: 'app-email.list',
  templateUrl: './email-list.component.html',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButton,
    RouterLink,
  ],
  styleUrl: './email-list.component.css'
})
export class EmailListComponent implements OnInit, AfterViewInit {

  ELEMENT_DATA: EmailEnviado[] = []

  displayedColumns: string[] = ['id', 'sendTo', 'status', 'subject', 'text', 'sendDate'];
  dataSource = new MatTableDataSource<EmailEnviado>(this.ELEMENT_DATA);

  constructor(private service: EmailService) {
  }

  getEmails(): void {
    this.service.getEmails().subscribe(res => {
      this.ELEMENT_DATA = res;
      this.dataSource = new MatTableDataSource<EmailEnviado, MatPaginator>(res);
      this.dataSource.paginator = this.paginator;
    })
  }

  ngOnInit() {
    this.getEmails();
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
