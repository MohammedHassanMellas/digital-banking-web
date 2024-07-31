import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./navbar/navbar.component";
import {CustomersComponent} from "./customers/customers.component";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, CustomersComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'digital-banking-web';
   constructor(private authservice : AuthService) {

   }
  ngOnInit(): void {
    this.authservice.loadJwtTokenFormLocalStorage();
  }
}
