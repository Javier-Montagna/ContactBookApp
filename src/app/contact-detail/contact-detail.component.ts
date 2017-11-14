import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../store';
import { LOAD_CONTACTS, TOGGLE_FAVORITE } from '../actions';
import { IContact } from '../contact-book/contact';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from "@angular/router";

export function selectContactByid(state) {
  return _.filter(_.values(state.contactBook), { id: state.currentURL.split("/").pop() })[0];
}

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})

export class ContactDetailComponent implements OnInit {
  @select(selectContactByid) readonly contactInformation$: Observable<IContact>;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() { }

  toggleFavorite() {
    this.ngRedux.dispatch({
      type: "TOGGLE_FAVORITE",
      id: this._route.snapshot.params["Id"]
    });
  }
}
