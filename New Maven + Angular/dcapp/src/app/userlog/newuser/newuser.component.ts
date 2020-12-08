import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/classes/user.service';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {
  errorReturn = false;
  user: User = new User();
  cpass: string;
  nameAlreadyExists = false;

  constructor(private titleService: Title, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.titleService.setTitle("Login");
  }

  onSubmit() {
    this.userService.newUser(this.user).subscribe(
      data => {
        localStorage.setItem("name", data.name);
        localStorage.setItem("role", data.role);
        localStorage.setItem("id", String(data.id));

        this.router.navigateByUrl('/diver');
      }, error => {
        if (error.status == '409')
        {
          console.error("User already exists.");
          this.nameAlreadyExists = true;
        } else {
          console.log(this.user);
          console.error(error);
          this.router.navigateByUrl('/login');
        }
      })
  }
}
