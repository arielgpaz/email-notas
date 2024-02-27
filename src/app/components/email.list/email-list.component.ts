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
import {NgClass, NgIf} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {saveAs} from 'file-saver';
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-email.list',
  templateUrl: './email-list.component.html',
  styleUrl: './email-list.component.css',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
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
    NgClass,
    MatTooltip,
  ]
})
export class EmailListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'sendTo', 'status', 'subject', 'sendDate', 'conteudo'];
  showLineBreak: boolean = true;

  dataSource = new MatTableDataSource<EmailEnviado>();
  email: EmailEnviado | undefined;
  fileName = '';
  showProgressBar: boolean = false;

  subject: FormControl = new FormControl(null, [Validators.required]);
  message: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private service: EmailService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit() {
    this.getEmails();
  }

  getEmails(): void {
    this.service.getEmails().subscribe(res => {
      this.dataSource = new MatTableDataSource<EmailEnviado, MatPaginator>(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setEmail(value: EmailEnviado) {
    this.email = value;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.showProgressBar = true;

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
          },
          complete: () => this.showProgressBar = false
        })
    }
  }

  onDownloadFile() {
    let ids: number[] = [];

    if (this.dataSource.filteredData.length !== this.dataSource.data.length) {
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
