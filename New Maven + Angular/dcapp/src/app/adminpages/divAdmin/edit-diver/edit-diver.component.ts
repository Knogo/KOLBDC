import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, ParamMap } from '@angular/router';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { Diver } from 'src/app/classes/diver';
import { DiverService } from 'src/app/classes/diver.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-diver',
  templateUrl: './edit-diver.component.html',
  styleUrls: ['./edit-diver.component.css']
})
export class EditDiverComponent implements OnInit {
  didExists = false; 
  diver: Diver = new Diver();

  constructor(private titleService: Title, private DiverService: DiverService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      var did = params.get('id');
      this.titleService.setTitle("Edit Diver: " + did);
      this.DiverService.getDiver(did).subscribe(
        data => {
          this.diver = data;
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
   
    this.DiverService.editDiver(this.diver).subscribe(
      data => {
          

        console.log(data);
      },
      error => {
        console.error(error);
      },
      () => {

        this.router.navigateByUrl('/admin/diverlist');
      }
    )

  }

}
