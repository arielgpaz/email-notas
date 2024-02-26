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
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {saveAs} from 'file-saver';

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
    MatDivider,
    FormsModule,
    ReactiveFormsModule,
  ],
  styleUrl: './email-list.component.css'
})
export class EmailListComponent implements OnInit, AfterViewInit {

  setEmail(value: EmailEnviado) {
    this.email = value;
  }

  ELEMENT_DATA: EmailEnviado[] = []

  displayedColumns: string[] = ['id', 'sendTo', 'status', 'subject', 'sendDate', 'conteudo'];
  dataSource = new MatTableDataSource<EmailEnviado>();
  email: EmailEnviado | undefined;
  fileName = '';

  subject: FormControl = new FormControl(null, [Validators.required]);
  message: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private service: EmailService,
    private toastr: ToastrService,
    private modalComponent: ModalComponent
  ) {
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

  onFileSelected(event: any) {

    const file: File = event.target.files[0];

    if (file) {

      this.fileName = file.name;

      this.service.uploadEmailsFile(file, this.subject.value, this.message.value)
        .subscribe({
          next: statusCounter => {
            if (statusCounter.error === 0) {
              this.toastr.info('Todos os e-mails foram enviados com sucesso!', 'Sucesso');
            } else if (statusCounter.error > 0 && statusCounter.sent > 0) {
              this.toastr.warning('Alguns e-mails não foram enviados!', 'Atenção');
            } else {
              this.toastr.error('Nenhum e-mail foi enviado', 'Erro');
            }
          },
          error: () => {
            this.toastr.error('Não foi possível carregar o arquivo desejado!', 'Erro')
          }
        })
    }
  }

  onDownloadFile() {
    let ids: number[] = [];

    if (this.dataSource.filteredData.length !== this.dataSource.data.length) {
      console.log('Heeeeeere')
      ids = this.dataSource.filteredData.flatMap<number>(email => email.id);
    }
    this.service.downloadFile(ids)
      .subscribe({
        next: res => {
          const blob: Blob = new Blob([res], {type: 'application/octet-stream'});
          saveAs(blob, 'relatorio.csv');
        }
      });
  }
}
