import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CollapseDirective } from 'ngx-bootstrap';

import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { IAppState, rootReducer, INITIAL_STATE } from './store';
import { createLogger } from 'redux-logger';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactBookComponent } from './contact-book/contact-book.component';
import { ContactBookService } from './contact-book/contact-book-service';


@NgModule({
  declarations: [
    AppComponent,
    ContactDetailComponent,
    ContactBookComponent,
    CollapseDirective
  ],
  imports: [
    BrowserModule,
    NgReduxModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "home", component: ContactBookComponent },
      { path: "contact/:Id", component: ContactDetailComponent },
      { path: "", redirectTo: "home", pathMatch: "full" }
    ])
  ],
  providers: [
    ContactBookService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(rootReducer, INITIAL_STATE, [createLogger()]);
  }
}
