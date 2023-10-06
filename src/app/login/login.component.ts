import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";
  showPassword: boolean = false;
  isErrorExist: boolean = false;

  constructor(public _authService: AuthService) { }

  ngOnInit(): void {
  }

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onClose() {
    this.isErrorExist = false;
  }

  public login() {
    this._authService.login(this.username, this.password).subscribe(() => {
      this.isErrorExist = false;
      console.log('inicio de sesión exitoso!');
    }, err => {
      this.isErrorExist = true;
      console.log('usuario o contraseña incorrecto!');
    });
  }

}
