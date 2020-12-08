import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Diver } from 'src/app/classes/diver';
import { DiverService } from 'src/app/classes/diver.service';

@Component({
  selector: 'app-dhome',
  templateUrl: './dhome.component.html',
  styleUrls: ['./dhome.component.css']
})
export class DhomeComponent implements OnInit {
  diver: Diver = new Diver();

  constructor(private router: Router, private titleService: Title, private diverService: DiverService) { }

  ngOnInit(): void {
    var id = localStorage.getItem("id");
    this.titleService.setTitle("Diver: " + id);
    this.diverService.getDiver(id).subscribe(
      data => { 
        this.diver = data; 
      },
      error => { 
        if (error.status == '404') {
          console.error("User doesn't exist.");
        } else {
          console.error("Unknown Error: ");
          console.error(error);
        } 
        this.router.navigateByUrl('/login');
    })
  }

}
