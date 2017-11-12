import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ContactBookService } from './contact-book-service';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../store';
import { LOAD_CONTACTS, TOGGLE_FAVORITE } from '../actions';
import { IContact } from './contact';

@Component({
  selector: 'app-contact-book',
  templateUrl: './contact-book.component.html',
  styleUrls: ['./contact-book.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContactBookComponent implements OnInit {
  @select() contactBook: IContact[];

  constructor(
    private _contactBookService: ContactBookService,
    private ngRedux: NgRedux<IAppState>
  ) { }

  ngOnInit() {
    this._contactBookService.getContactBookList().subscribe(data => {
      this.ngRedux.dispatch({ type: LOAD_CONTACTS, contacts: data });
    });
  }

  testFav(){
    console.log("SDSDSD");
    this.ngRedux.dispatch({ type: TOGGLE_FAVORITE, id: 13 });
  }
}