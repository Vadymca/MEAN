import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChekFormService } from '../chek-form.service';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reg.component.html',
  styleUrl: './reg.component.css'
})
export class RegComponent implements OnInit {
  name: string = '';
  login: string =  '';
  email: string = '';
  password: string = '';

  constructor(
    private checkForm: ChekFormService, 
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    
  }

  userRegisterClick(): void {
    const user = {
      name: this.name,
      email: this.email,
      login: this.login,
      password: this.password
    };

    if (!this.checkForm.checkName(user.name)) {
      this.toastr.error('Имя пользователя не введено', 'Ошибка', {timeOut:2000});
      return;
    } else if (!this.checkForm.checkLogin(user.login)) {
      this.toastr.error('Логин пользователя не введен', 'Ошибка', {timeOut:2000});
      return;
    } else if (!this.checkForm.checkEmail(user.email)) {
      this.toastr.error('Email пользователя не введен', 'Ошибка', {timeOut:2000});
      return;
    } else if (!this.checkForm.checkPassword(user.password)) {
      this.toastr.error('Пароль пользователя не введен', 'Ошибка', {timeOut:2000});
      return;
    }

    this.authService.registerUser(user).subscribe(data => {
      if(!data.success) {
        this.toastr.error(data.msg,'Ошибка', {timeOut:2000});
        this.router.navigate(['/reg']);
      } else {
        this.toastr.success(data.msg, 'Успех', {timeOut:2000} )
        this.router.navigate(['/auth']);
      }
    })
    
  }
}
