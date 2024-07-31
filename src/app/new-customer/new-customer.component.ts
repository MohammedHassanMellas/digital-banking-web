import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {CustomerService} from "../services/customer.service";
import {Customer} from "../model/customers.model";
import {Router} from "@angular/router";



@Component({
  selector: 'app-new-customer',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})
export class NewCustomerComponent implements OnInit{
newCustomerFormGroup : FormGroup | undefined;
  constructor(private fb : FormBuilder,
              private customerService : CustomerService,
              private router : Router) {
  }

  ngOnInit(): void {
  this.newCustomerFormGroup=this.fb.group({
    name : this.fb.control(null, [Validators.required, Validators.minLength(4)]),
    email: this.fb.control(null, [Validators.required, Validators.email])
  })
  }

  handleSaveCustomer() {
  let customer:Customer = this.newCustomerFormGroup?.value;
  this.customerService.saveCustomer(customer).subscribe({
    next : data => {
      alert("Customer has been Successfully Saved !");
     // this.newCustomerFormGroup?.reset();
      this.router.navigateByUrl("/admin/customers");
    },
    error:err => {
      console.log(err);
    }
  });
  }
}
