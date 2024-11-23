import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  login: string =  '';
  password: string = '';

  
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    
  }
  userLoginClick(): void {
    const user = {
      login: this.login,
      password: this.password
    };
    
    if(user.password == "") {
      this.toastr.error('Введите пароль','Ошибка', {timeOut:2000});
      return;
    }
    this.authService.authUser(user).subscribe(data => {
      if(!data.success) {
        this.toastr.error(data.msg,'Ошибка', {timeOut:2000});
      } else {
        this.toastr.success('Вы успешно авторизовались');
        this.router.navigate(['/dashboard']);
        this.authService.storeUser(data.token, data.user)
      }
    })

  }
}
