import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {EmailEnviado} from "../../models/email-enviado";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {EmailService} from "../../services/email.service";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {ModalComponent} from "../../modal/modal.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatProgressBar} from "@angular/material/progress-bar";
import {NgIf} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {ToastrService} from "ngx-toastr";

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
    MatLabel,
    MatIconButton,
    MatIcon,
    ModalComponent,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatMiniFabButton,
    MatProgressBar,
    NgIf,
    MatDivider
  ],
  styleUrl: './email-list.component.css'
})
export class EmailListComponent implements OnInit, AfterViewInit {

  setEmail(value: EmailEnviado) {
    this.email = value;
  }

  ELEMENT_DATA: EmailEnviado[] = []

  displayedColumns: string[] = ['id', 'sendTo', 'status', 'subject', 'text', 'sendDate'];
  dataSource = new MatTableDataSource<EmailEnviado>(this.ELEMENT_DATA);
  email: EmailEnviado | undefined;

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

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
