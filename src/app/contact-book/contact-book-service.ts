import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IContact } from "./contact";

@Injectable()
export class ContactBookService {
    private _contactsURL: string = "http://localhost:9001/contacts";

    constructor(private http: HttpClient) { }

    getContactBookList(): Observable<IContact[]> {
        return this.http.get<IContact[]>(this._contactsURL);
    }
}
