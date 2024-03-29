import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {EmailEnviado} from "../models/email-enviado";
import {API_CONFIG} from "../config/api.config";
import {EmailStatusCounter} from "../models/email-status-counter";

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) {
  }

  getEmails(): Observable<EmailEnviado[]> {
    return this.http.get<EmailEnviado[]>(`${API_CONFIG.baseUrl}/email`)
  }

  uploadEmailsFile(file: File, subject: string, message: string): Observable<EmailStatusCounter> {

    let formData: FormData = new FormData();
    formData.append('file', file, file.name);

    let options = {
      params: new HttpParams({
        fromObject: {
          emailSubject: subject,
          additionalMessage: message,
        },
      })
    };

    return this.http.post<EmailStatusCounter>(`${API_CONFIG.baseUrl}/email/file/upload`, formData, options);
  }

  downloadFile(ids: number[]): Observable<any> {
    let options = {
      responseType: 'blob' as 'blob',
      params: ids.length > 0 ?
        new HttpParams({ fromObject: { ids: ids.join(',').toString() } })
        : undefined,
    };
    return this.http.get(`${API_CONFIG.baseUrl}/email/file/download`, options)
  }
}
