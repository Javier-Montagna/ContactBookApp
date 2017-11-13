import { IContact } from "./contact-book/contact";
import { TOGGLE_FAVORITE, LOAD_CONTACTS, UPDATE_URLS } from './actions';

export interface IAppState {
    contactBook: IContact[];
    previousURL: string;
    currentURL: string;
}
export const INITIAL_STATE: IAppState = {
    contactBook: [],
    previousURL: "",
    currentURL: ""
}

export function rootReducer(state, action) {
    switch (action.type) {
        case TOGGLE_FAVORITE:
            var contact = state.contactBook.find(t => t.id === action.id);
            var index = state.contactBook.indexOf(contact);

            return Object.assign({}, state,
                {
                    contactBook: [
                        ...state.contactBook.slice(0, index),
                        Object.assign({}, contact, { isFavorite: !contact.isFavorite }),
                        ...state.contactBook.slice(index + 1)
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