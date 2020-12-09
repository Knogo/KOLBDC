import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ahome',
  templateUrl: './ahome.component.html',
  styleUrls: ['./ahome.component.css']
})
export class AhomeComponent implements OnInit {

  constructor(private titleService: Title, private router: Router) { }

  ngOnInit(): void {
    var id = localStorage.getItem("id");
    this.titleService.setTitle("Admin: " + id);
  }

}
