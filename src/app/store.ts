import { IContact } from "./contact-book/contact";
import { TOGGLE_FAVORITE, LOAD_CONTACTS, UPDATE_URLS } from './actions';
import * as _ from 'lodash';

export interface IAppState {
    contactBook: IContact[];
    previousURL: string;
    currentURL: string;
}
export const INITIAL_STATE: IAppState = {
    contactBook: [],
    previousURL: "",
    currentURL: "/contact/1"
}

export function rootReducer(state, action) {
    switch (action.type) {
        case TOGGLE_FAVORITE:
            
        var contact: IContact = _.find(_.values(state.contactBook[0]), { 'id': action.id });
            var index = _.values(state.contactBook[0]).indexOf(contact);
            return Object.assign({}, state,
                {
                    contactBook: [
                        ..._.values(state.contactBook[0]).slice(0, index),
                        Object.assign({}, contact, { isFavorite: !contact.isFavorite }),
                        ..._.values(state.contactBook[0]).slice(index + 1)
                    ]
                }
            )
        case UPDATE_URLS:
            return {
                ...state,
                previousURL: action.payload.previousURL,
                currentURL: action.payload.currentURL
            };
        case LOAD_CONTACTS:
            return Object.assign({}, state, {
                contactBook: state.contactBook = Object.assign({}, action.contacts)
            })
        default:
            return state;
    }
}