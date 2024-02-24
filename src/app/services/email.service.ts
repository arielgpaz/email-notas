import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EmailEnviado} from "../models/email-enviado";
import {API_CONFIG} from "../config/api.config";

@Injectable({
  providedIn: 'root'
})
export class EmailService {

   constructor(private http: HttpClient) {
   }

   getEmails(): Observable<EmailEnviado[]> {
     return this.http.get<EmailEnviado[]>(`${API_CONFIG.baseUrl}/email`)
   }

}
