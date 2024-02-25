import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {EmailListComponent} from "./components/email.list/email-list.component";

const routes: Routes = [
  {path: '', component: EmailListComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes {

}
