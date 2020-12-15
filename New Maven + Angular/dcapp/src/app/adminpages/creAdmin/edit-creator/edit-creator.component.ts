import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Creator } from 'src/app/classes/creator';
import { CreatorService } from 'src/app/classes/creator.service';


@Component({
  selector: 'app-edit-creator',
  templateUrl: './edit-creator.component.html',
  styleUrls: ['./edit-creator.component.css']
})
export class EditCreatorComponent implements OnInit {

  creator: Creator = new Creator(); 

  constructor(private titleService: Title, private CreatorService: CreatorService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      var cid = params.get('id');
      this.titleService.setTitle("Edit Creator: " + cid);
      this.CreatorService.getCreator(cid).subscribe(
        data => {
          this.creator = data;
          console.log(data)
        },
        error => {
          if (error.status == '404') {
            console.error("User doesn't exist...");
          } else {
            console.error("Unknown Error: ");
            console.error(error);
          }
          this.router.navigateByUrl('/admin/Diverlist');
        }
      )
    })
  }
  
  onSubmit(){
   
    this.CreatorService.editCreator(this.creator).subscribe(
      data => {
          

        console.log(data);
      },
      error => {
        console.error(error);
      },
      () => {

        this.router.navigateByUrl('/admin/creatorlist');
      }
    )

  }

}
