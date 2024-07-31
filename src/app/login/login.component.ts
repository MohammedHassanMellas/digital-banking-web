import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import { Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  formGroup! : FormGroup;
  constructor(private fb : FormBuilder,
              private authService: AuthService,
              private router : Router) {
  }
  ngOnInit(): void {
    this.formGroup=this.fb.group({
      username : this.fb.control(""),
      password : this.fb.control("")
    })
  }

  habdleLogin() {
    let username = this.formGroup.value.username;
    let password = this.formGroup.value.password;
    this.authService.login(username,password).subscribe({
      next: data =>{
        this.authService.loadProfile(data);
        this.router.navigateByUrl("/admin")
      },
      error:err => {
        console.log(err);
      }
    })
  }
}
