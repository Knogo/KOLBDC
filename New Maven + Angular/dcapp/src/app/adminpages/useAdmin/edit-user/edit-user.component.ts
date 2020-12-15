import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router,ActivatedRoute, ParamMap } from '@angular/router';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/classes/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})

export class EditUserComponent implements OnInit {
  user: User = new User(); 
  nameAlreadyExists = false; 
  url: string; 

  constructor(private titleService: Title, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      var id = params.get('id');
      this.titleService.setTitle("Edit User: " + id);
      this.userService.getUser(parseInt(id)).subscribe(
        data => {
          this.user = data;
          console.log(data)
        },
        error => {
          if (error.status == '404') {
            console.error("User doesn't exist...");
          } else {
            console.error("Unknown Error: ");
            console.error(error);
          }
          this.router.navigateByUrl('/admin/userlist');
        }
      )
    })
  }
  


  onSubmit() {
    if (this.user.id == parseInt(localStorage.getItem("id"))){
      this.user.role = localStorage.getItem("role"); //Can't demote yourself as admin
    } 

    this.userService.editUser(this.user).subscribe(
      data => {
        if (data.id == parseInt(localStorage.getItem("id"))){
          localStorage.clear();
          localStorage.setItem("name",data.name);
          localStorage.setItem("password",data.password);
          localStorage.setItem("role",data.role);
          localStorage.setItem("id", String(data.id));
        }   
        console.log(data);
      },
      error => {
        if (error.status == '409')
        {
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