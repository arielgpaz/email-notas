import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SendEmailComponent} from "./components/send.email/send-email.component";
import {EmailListComponent} from "./components/email.list/email-list.component";

const routes: Routes = [
  {path: 'send', component: SendEmailComponent},
  {path: 'list', component: EmailListComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes {

}
