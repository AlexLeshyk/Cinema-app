import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  fg: FormGroup;
  submitted = false;
  infoMessage: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe( (params: Params) => {
      if (params['loginAgain']) {
        this.infoMessage = 'Введите плз пароль';
      } else if (params['loginAgain']) {
        this.infoMessage = 'Сессия истекла. Введите данные заново.';
      }
    });

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
    this.submitted = true;

    const user: User = {
      email: this.fg.value.email,
      password: this.fg.value.password
    }

    this.auth.login(user).subscribe(() => {
      this.fg.reset();
      this.router.navigate(['/admin','dashboard']);
      this.submitted = false;
    }, () => {
      this.submitted = false;
    })
  }

}
