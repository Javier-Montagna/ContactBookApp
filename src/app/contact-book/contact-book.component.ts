import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ContactBookService } from './contact-book-service';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../store';
import { LOAD_CONTACTS, TOGGLE_FAVORITE, UPDATE_URLS } from '../actions';
import { IContact } from './contact';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";

export function selectFavoriteContacts(state) {
  return _.filter(_.values(state.contactBook[0]), { isFavorite: true });
}

export function selectNonFavoriteContacts(state) {
  return _.filter(_.values(state.contactBook[0]), { isFavorite: false });
}

@Component({
  selector: 'app-contact-book',
  templateUrl: './contact-book.component.html',
  styleUrls: ['./contact-book.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ContactBookComponent implements OnInit {
  @select() contactBook: IContact[];
  @select(selectFavoriteContacts) favoriteContacts$: Observable<IContact[]>
  @select(selectNonFavoriteContacts) nonFavoriteContacts$: Observable<IContact[]>

  constructor(
    private _contactBookService: ContactBookService,
    private ngRedux: NgRedux<IAppState>,
    private router: Router
  ) { }

  ngOnInit() {

  }

  accessContactDetail(contactId) {
    this.ngRedux.dispatch({
      type: UPDATE_URLS,
      payload: {
        previousURL: "/home",
        currentURL: "/contact/" + contactId
      }
    });

    this.router.navigate(['contact', contactId]);
    
  }
}