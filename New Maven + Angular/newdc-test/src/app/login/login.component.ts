import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorReturn = false;
  user: User = new User();

  constructor(private titleService: Title, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.titleService.setTitle("Login");
    this.user.name = "bob";
    this.user.password = "cat";
  }

  onSubmit() {
    this.userService.login(this.user).subscribe(
      data => {
        console.log(data);
        this.user = data;
        sessionStorage.setItem("name", this.user.name);
        sessionStorage.setItem("id", String(this.user.id));
        this.router.navigateByUrl('/dungeonlist');
      }, error => {
        if (error.status == '404') {
          console.log("here");
          console.log(error);
          this.errorReturn = true;
        } else {
          console.log("else");
          console.log(error);
          this.router.navigateByUrl('/login');
        }
      }
    )
  }
}
