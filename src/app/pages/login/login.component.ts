import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({

      email: [null, Validators.required, Validators.email],
      senha: [null, Validators.required]
    })
  }

  onLoginSuccess(): void {
    // Navigate to home page on successful login
    // this.router.navigate(['/home']);
  }

  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email
      const senha = this.loginForm.value.senha

      this.authService.autenticar(email, senha).subscribe({
        next: (value) => {
          this.router.navigateByUrl('/home')
          console.log('Login efetuado com sucesso', value)
        },
        error: (err) => {
          console.log('Erro no login', err)
        }

      })
    }
  }
}
