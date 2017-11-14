import { IContact } from "./contact-book/contact";
import { TOGGLE_FAVORITE, LOAD_CONTACTS, UPDATE_URLS } from './actions';
import * as _ from 'lodash';

export interface IAppState {
    contactBook: IContact[];
    selectedContact: IContact;
    previousURL: string;
    currentURL: string;
    areContactUpToDate: boolean;
}
export const INITIAL_STATE: IAppState = {
    contactBook: [],
    selectedContact: null,
    previousURL: "",
    currentURL: "",
    areContactUpToDate: false
}

export function rootReducer(state: IAppState, action): IAppState {
    switch (action.type) {
        case TOGGLE_FAVORITE:
            var contact: IContact = _.find(_.values(state.contactBook), { 'id': action.id });
            var index = _.values(state.contactBook).indexOf(contact);

            return Object.assign({}, state, {
                contactBook: [
                    ..._.values(state.contactBook).slice(0, index),
                    Object.assign({}, contact, { isFavorite: !contact.isFavorite }),
                    ..._.values(state.contactBook).slice(index + 1)
                ]
            })
        case UPDATE_URLS:
            return {
                ...state,
                previousURL: action.payload.previousURL,
                currentURL: action.payload.currentURL
            };
        case LOAD_CONTACTS:
            if (state.areContactUpToDate) {
                return state;
            }
            else {
                return Object.assign({}, state, {
                    contactBook: Object.assign({}, action.contacts[0]),
                    areContactUpToDate: true
                })
            }
    }
    return state;
}
