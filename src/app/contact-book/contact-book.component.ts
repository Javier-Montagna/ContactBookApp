import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ContactBookService } from './contact-book-service';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../store';
import { LOAD_CONTACTS, TOGGLE_FAVORITE } from '../actions';
import { IContact } from './contact';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

export function selectFavoriteContacts(state) {
  return _.filter(_.values(state.contactBook[0]), { isFavorite: true });
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

  constructor(
    private _contactBookService: ContactBookService,
    private ngRedux: NgRedux<IAppState>
  ) { }

  ngOnInit() {
    this._contactBookService.getContactBookList().subscribe(data => {
      var sortedContacts = new Array(data.sort(function (a, b) { return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0); }));

      this.ngRedux.dispatch({
        type: LOAD_CONTACTS,
        contacts: Object.values(sortedContacts)
      });
    });
  }
}

  // function counterSelector(state){
  //   console.log("Hola: " + JSON.stringify(state.contactBook[0]));

  //   //return state;
  //  return  state.contactBook[0].filter(x => x.isFavorite) === true;
  // }  