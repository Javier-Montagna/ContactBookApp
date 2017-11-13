import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../store';
import { LOAD_CONTACTS, TOGGLE_FAVORITE } from '../actions';
import { IContact } from '../contact-book/contact';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from "@angular/router";

export function selectContactByid(state){
  return _.filter(_.values(state.contactBook[0]), { id: state.currentURL.split("/").pop() });
}

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ContactDetailComponent implements OnInit {
  @select(selectContactByid) contactInformation$: Observable<IContact>;
  
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {

  }

}
