import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Creator } from 'src/app/classes/creator';
import { CreatorService } from 'src/app/classes/creator.service';

@Component({
  selector: 'app-chome',
  templateUrl: './chome.component.html',
  styleUrls: ['./chome.component.css']
})
export class ChomeComponent implements OnInit {
  creator: Creator = new Creator();

  constructor(private router: Router, private titleService: Title, private creatorService: CreatorService) { }

  ngOnInit(): void {
    var id = localStorage.getItem("id");
    this.titleService.setTitle("Creator: " + id);
    this.creatorService.getCreator(id).subscribe(
      data => {
        this.creator = data;
      },
      error => {
        if (error.status == '404') {
          console.error ("User doesn't exist.");
        } else {
          console.error("Unknown Error: ");
          console.error(error);
        }
        this.router.navigateByUrl('/login');
      }
    )
  }

}
