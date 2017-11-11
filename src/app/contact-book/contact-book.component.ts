import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ContactBookService } from './contact-book-service';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../store';
import { LOAD_CONTACTS } from '../actions';
import { IContact } from './contact';

@Component({
  selector: 'app-contact-book',
  templateUrl: './contact-book.component.html',
  styleUrls: ['./contact-book.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContactBookComponent implements OnInit {

  _errorMessage: string;
  _contactsToAdd: IContact[];

  constructor(
    private _contactBookService: ContactBookService,
    private ngRedux: NgRedux<IAppState>
  ) { }

  ngOnInit() {
    this._contactBookService.getContactBookList().subscribe(data => {
      console.log("Data from server: " + data);
      this._contactsToAdd = data;
    });

    console.log("Datos: " + JSON.stringify(this._contactsToAdd));

    this.ngRedux.dispatch({ type: LOAD_CONTACTS, contacts: this._contactsToAdd })

  }

}
