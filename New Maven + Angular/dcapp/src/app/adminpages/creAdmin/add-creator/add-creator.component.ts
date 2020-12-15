import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Creator } from 'src/app/classes/creator';
import { CreatorService } from 'src/app/classes/creator.service';
import { User } from 'src/app/classes/user';
import { UserService } from 'src/app/classes/user.service';

@Component({
  selector: 'app-add-creator',
  templateUrl: './add-creator.component.html',
  styleUrls: ['./add-creator.component.css']
})

export class AddCreatorComponent implements OnInit {
  creator: Creator = new Creator();
  creators: Creator[];
  user: User[];
  creatorid: Array<number>;
  noncreators: Array<number>;

  constructor(private titleService: Title, private userService: UserService, private creatorService: CreatorService) { }

  ngOnInit(): void {
    this.creatorService.getAllCreators().subscribe(
      data => {
        this.creators = data;
        this.creatorid = this.creators.map(a => a.id);
        this.userService.getAllUsers().subscribe(
          data => {
            this.user = data;
            this.noncreators = this.user.map(a => a.id);
            this.noncreators = this.noncreators.filter(val => !this.creatorid.includes(val));
            console.log(this.noncreators);
            this.creator.maxdims = 5;
            this.creator.coins = 1;
          }
        );
      }
    );
  }
  onSubmit() {

    this.creatorService.editCreator(this.creator).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.error(error);
      },
      () => {
      }
    )
  }
}