import { Component } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

comp: string;
opened = false;
  constructor() {
  }

  componentactive(nomecomp: string){
      this.comp = nomecomp;
  }
}
