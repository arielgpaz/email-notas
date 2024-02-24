import {NgModule} from '@angular/core';
import {AppComponent} from "./app.component";
import {SendEmailComponent} from "./components/send.email/send-email.component";
import {BrowserModule} from "@angular/platform-browser";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {AppRoutes} from "./app.routes";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    AppRoutes,
    BrowserModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    SendEmailComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    provideAnimationsAsync()
  ]
})
export class AppModule {
}
