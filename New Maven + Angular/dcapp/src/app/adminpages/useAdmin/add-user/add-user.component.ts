import { Component, OnInit, DoCheck } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/classes/user.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user: User = new User();
  nameAlreadyExists = false;
  url: string;

  constructor(private titleService: Title, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.titleService.setTitle("Add New User");
  }

  onSubmit() {
    if (this.user.id == parseInt(localStorage.getItem("id"))) {
      this.user.role = localStorage.getItem("role"); //Can't demote yourself as admin
    }

    this.userService.addUser(this.user).subscribe(
      data => {
        console.log(data);
      },
      error => {
        if (error.status == '409') {
          console.error("Username in use.");
          this.nameAlreadyExists = true;
        }
      },
      () => {
        this.router.navigateByUrl('/admin/userlist');
      }
    )
  }
}
