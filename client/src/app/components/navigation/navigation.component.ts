import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @ViewChild('sidenav',{static: true}) sidenav: MatSidenav;

  constructor() { }

  ngOnInit() {
  }

  close(){
    this.sidenav.close();
  }

}
