import { Component, DoCheck, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Diver } from 'src/app/classes/diver';
import { DiverService } from 'src/app/classes/diver.service';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/classes/user.service';

@Component({
  selector: 'app-add-diver',
  templateUrl: './add-diver.component.html',
  styleUrls: ['./add-diver.component.css']
})

export class AddDiverComponent implements OnInit {
  nameAlreadyExists = false;
  url: string;
  diver: Diver = new Diver();
  divers: Diver[];
  user: User[];
  diverid: Array<number>;
  nondivers: Array<number>;

  constructor(private titleService: Title, private userService: UserService, private diverService: DiverService, private router: Router) { }

  ngOnInit(): void {
    this.diverService.getAllDivers().subscribe(
      data => {
        this.divers = data;
        this.diverid = this.divers.map(a => a.id);
        this.userService.getAllUsers().subscribe(
          data => {
            this.user = data;
            this.nondivers = this.user.map(a => a.id);
            this.nondivers = this.nondivers.filter(val => !this.diverid.includes(val));
            console.log(this.nondivers);
            
            this.diver.id = this.nondivers[0];
            this.diver.keys = 1;
            this.diver.vision = 1;
            this.diver.coins = 0;
          }
        );
      }
    );
  }

  onSubmit() {
    console.log(this.diver);

    this.diverService.addDiver(this.diver).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.error(error);
      },
      () => {
        this.router.navigateByUrl("admin/diverlist");
      }
    )
  }
}