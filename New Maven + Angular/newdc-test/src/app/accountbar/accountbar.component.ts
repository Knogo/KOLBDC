import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'accountbar',
  templateUrl: './accountbar.component.html',
  styleUrls: ['./accountbar.component.css']
})
export class AccountbarComponent implements OnInit {
  username: string = sessionStorage.getItem("name");
  role: string = sessionStorage.getItem("role");
  id: string = sessionStorage.getItem("id");

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logout().subscribe(error => {
      console.log(error);
      this.router.navigateByUrl('/login');
    }, compelte => {
      this.router.navigateByUrl('/login');
    });
  }
}
