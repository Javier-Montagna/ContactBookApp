import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AccordionConfig } from 'ngx-bootstrap/accordion';

export function getAccordionConfig(): AccordionConfig {
  return Object.assign(new AccordionConfig(), { closeOthers: true });
}

@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrls: ['./extra.component.css'],
  providers: [{ provide: AccordionConfig, useFactory: getAccordionConfig }],
  encapsulation: ViewEncapsulation.None
})
export class ExtraComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
