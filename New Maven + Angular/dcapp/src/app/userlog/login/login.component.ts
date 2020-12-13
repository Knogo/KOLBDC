import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/classes/user.service';

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

    if(localStorage.getItem("name") != null){
      this.userService.logout();
    }

    // this.user.name = "diver";
    // this.user.password = "diver";

    // this.user.name = "creator";
    // this.user.password = "creator";

    // this.user.name = "admin";
    // this.user.password = "admin";
  }

  toggleSH() {
    var p = document.getElementById("pass");
    var b = document.getElementById("showhide");

    if (p.getAttribute("type") == "password"){
      p.setAttribute("type", "text");
      b.setAttribute("value", "Show");
    } else {
      p.setAttribute("type", "password");
      b.setAttribute("value", "Hide");
    }
  }

  onSubmit() {
    this.userService.login(this.user).subscribe(
      data => {
        console.log(data);
        this.user = data;

        localStorage.setItem("name", this.user.name);
        //Is it safe to expose this? You'd only get here if you already knew your password
        localStorage.setItem("password", this.user.password);
        localStorage.setItem("role", this.user.role);
        localStorage.setItem("id", String(this.user.id));

        this.router.navigateByUrl('/' + this.user.role);
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
      })
  }
}
