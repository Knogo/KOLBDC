import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/classes/user.service';

@Component({
  selector: 'userbar',
  templateUrl: './userbar.component.html',
  styleUrls: ['./userbar.component.css']
})
export class UserbarComponent implements OnInit, DoCheck {
  username: string = localStorage.getItem("name");
  role: string = localStorage.getItem("role");
  id: string = localStorage.getItem("id");
  url: string;

  constructor(private userService: UserService, public router: Router) { }

  ngOnInit(): void { 
  }

  ngDoCheck(): void {
    if (localStorage.getItem != null){
      this.username = localStorage.getItem("name");
      this.role = localStorage.getItem("role");
      this.id = localStorage.getItem("id");
      this.url = '/' + this.role;
    }
  }

  logout() {
    this.userService.logout().subscribe(error => {
      console.log(error);
      this.router.navigateByUrl('/login');
    }, complete => {
      this.router.navigateByUrl('/login');
    });
  }
}
