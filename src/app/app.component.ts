import { Component, OnInit, NgZone } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './store';
import { ContactBookService } from './contact-book/contact-book-service';
import { LOAD_CONTACTS, TOGGLE_FAVORITE, UPDATE_URLS } from './actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isCollapsed: boolean = true;
  title = 'app';

  constructor(
    private _contactBookService: ContactBookService,
    private ngRedux: NgRedux<IAppState>,
    private zone:NgZone
  ) { this.zone.run }

  ngOnInit(): void {
    this._contactBookService.getContactBookList().subscribe(data => {
      var sortedContacts = new Array(data.sort(function (a, b) { return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0); }));
  
      this.ngRedux.dispatch({
        type: LOAD_CONTACTS,
        contacts: Object.values(sortedContacts)
      });
    });
  }
}
