import { T } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    username: string = "";
    password: string = "";
    passwordType: string = "password";

    isError: boolean = false;
    errorMessage: string = "";

    constructor(private modalService: NgbModal, private http: HttpClient, private userService: UserService, private router: Router) {
    }

    onLogin() {
        this.isError = false;
        this.errorMessage = "";

        var queryString = "?username=" + this.username + "&&password=" + this.password;
        this.http.get<any>('/api/login' + queryString).subscribe(data => {
            if(data.status == true) {
                this.userService.setUser(data.id, this.username, data.authToken, data.firstName, data.lastName, data.role, data.role2);
                this.router.navigate(["../admin"]);
            }
            else {
                this.isError = true;
                this.errorMessage = "Invalid username/password";
            }
        });
    }

    onPasswordTypeChanged() {
        if(this.passwordType == "password") 
          this.passwordType = "text";
        else 
          this.passwordType = "password";
    }
}
