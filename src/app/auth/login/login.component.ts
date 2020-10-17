import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private authservice: AuthService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) { 
              this.loginForm = new FormGroup({
                email: new FormControl(null, Validators.required),
                password: new FormControl(null, Validators.required)
                });
               }

  ngOnInit() {
  }

  isValid(controlName) {
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }

  login() {
    console.log(this.loginForm.value);

    if (this.loginForm.valid) {
      this.authservice.login(this.loginForm.value)
        .subscribe(
          data => {
            console.log(data);
            localStorage.setItem('token', data.toString());
            this._router.navigate(['/course']);
          },
          error => { }
        );
    }
  }
  movetoregister() {
    this._router.navigate(['../register'], { relativeTo: this._activatedRoute });
  }
}
