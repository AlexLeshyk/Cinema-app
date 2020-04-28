import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { User } from '../../shared/interfaces';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  fg: FormGroup

  constructor() { }

  ngOnInit() {
    this.fg = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  submit() {
    console.log(this.fg);
    if (this.fg.invalid) {
      return;
    }

    const user: User = {
      email: this.fg.value.email,
      password: this.fg.value.password
    }
  }

}
