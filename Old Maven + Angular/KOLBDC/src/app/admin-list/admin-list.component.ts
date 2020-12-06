import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Admin } from '../admin';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {

  admin: Admin[];

  constructor(private adminService: AdminService, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("List of Admins");
    this.adminService.getAllAdmins().subscribe(data => {
      this.admin = data
    });
  }

}
