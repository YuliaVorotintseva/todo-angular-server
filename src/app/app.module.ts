import {BrowserModule} from '@angular/platform-browser'
import {NgModule, Provider} from '@angular/core'

import {AppComponent} from './app.component'
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AuthInterseptor } from './ayth.intersept';

const INTERSEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterseptor,
  multi: true
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [INTERSEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule {
}
