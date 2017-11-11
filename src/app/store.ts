import { IContact } from "./contact-book/contact";
import { TOGGLE_FAVORITE } from './actions';

export interface IAppState {
    contactBook: IContact[];
}

export const INITIAL_STATE: IAppState = {
    contactBook: []
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
        default:
            return state;
    }
}