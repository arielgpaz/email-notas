export interface EmailEnviado {
  id?: any;
  sendFrom: string;
  sendTo: string;
  status: string;
  subject: string;
  text: string;
  sendDate: string;
}
