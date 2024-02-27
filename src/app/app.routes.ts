import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {EmailListComponent} from "./components/email.list/email-list.component";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'list', component: EmailListComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes {

}
