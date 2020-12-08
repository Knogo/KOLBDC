import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/classes/user.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  user: User = new User();
  nameAlreadyExists = false;
  url: string;

  constructor(private titleService: Title, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.titleService.setTitle("Edit Account");
    this.user.name = localStorage.getItem("name");
    this.user.password = localStorage.getItem("password");
    this.user.role = localStorage.getItem("role");
    let temp; //Act as bigint
    temp = localStorage.getItem("id"); //Convert to bigint
    this.user.id = temp; //Now we've got a bigint somehow... (casting directly didn't work)
    this.url = '/' + this.user.role;
  }

  onSubmit() {
    this.userService.editUser(this.user).subscribe(
      data => {
        //Server does cleaning if required (particularly for role);
        localStorage.setItem("name", data.name);
        localStorage.setItem("password", data.password);
        localStorage.setItem("role", data.role);
        localStorage.setItem("id", String(data.id));

        this.router.navigateByUrl(this.url);
      }, error => {
        if (error.status == '409')
        {
          console.error("Username in use.");
          this.nameAlreadyExists = true;
        } else { //404, how'd we mess up our id?
          console.log(this.user);
          console.error(error);
          this.router.navigateByUrl(this.url);
        }
      })
  }
}
