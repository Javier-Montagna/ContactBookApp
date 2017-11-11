import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ContactBookService } from './contact-book-service';

@Component({
  selector: 'app-contact-book',
  templateUrl: './contact-book.component.html',
  styleUrls: ['./contact-book.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContactBookComponent implements OnInit {

  _errorMessage: string;

  constructor(private _contactBookService: ContactBookService) { }

  ngOnInit() {
    var contacts = this._contactBookService.getContactBookList().subscribe(data => console.log("encontre datos bien: " + JSON.stringify(data)));

    
   // console.log("contacts: " + contacts)
  }

}
