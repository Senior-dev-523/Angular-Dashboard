import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';

const ICON_PATH = './assets/icons/';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css'],
})
export class AuthFormComponent implements OnInit {
  authForm: FormGroup;
  isLoaging = false;
  isError = false;
  passwordVisibility = true;
  rememberMe = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.authForm = this.fb.group({
      emailInput: ['', [Validators.required, Validators.email]],
      passwordInput: ['', [Validators.required]],
    });

    this.authService.logout();
  }

  onSubmit(): void {
    this.authService.authenticate(this.emailInput.value, this.passwordInput.value, this.rememberMe)
      .subscribe( data => { 
        // this.isLoaging = false;
        this.router.navigate(['/tenant/clients']);
    });
   
  }

  outFocus(input): void {
    input.markAsUntouched();
  }

  inFocus(input): void {
    input.markAsTouched()
  }

  changePasswordVisibility(): void {
    this.passwordVisibility = !this.passwordVisibility;
  }

  get emailInput() { 
    return this.authForm.get('emailInput'); 
  }
  
  get passwordInput() { 
    return this.authForm.get('passwordInput'); 
  }

  getBaseTabIconPath(name: string): string {
    return `${ ICON_PATH }${name}`;
  }
}
