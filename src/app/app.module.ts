import {NgModule} from '@angular/core';
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {AppRoutes} from "./app.routes";
import {HttpClientModule} from "@angular/common/http";
import {ModalComponent} from "./modal/modal.component";
import {ToastrModule} from "ngx-toastr";

@NgModule({
  imports: [
    AppRoutes,
    BrowserModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressBar: true
    }),
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    provideAnimationsAsync(),
    ModalComponent
  ]
})
export class AppModule {
}
