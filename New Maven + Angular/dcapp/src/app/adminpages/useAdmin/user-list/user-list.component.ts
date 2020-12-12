import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/classes/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  user: User[];

  constructor(private userService: UserService, private titleService: Title, private router: Router, private route: ActivatedRoute) { }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(
      () => {
        this.ngOnInit(); //Refreshes the page
        this.router.navigateByUrl("/admin/userlist");
      },
      error => {
        console.log(error);
      });
  }

  ngOnInit(): void {
    this.titleService.setTitle("List of Users");
    this.userService.getAllUsers().subscribe(data => {
      this.user = data;
    });
  }

  sortby(field: string) {
    if (field == "id") {
      this.user.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
    } else if (field == "name") {
      this.user.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    } else if (field == "role") {
      this.user.sort((a, b) => (a.role > b.role) ? 1 : ((b.role > a.role) ? -1 : 0));
    } else if (field == "password") {
      this.user.sort((a, b) => (a.password > b.password) ? 1 : ((b.password > a.password) ? -1 : 0));
    } 
  }
}
