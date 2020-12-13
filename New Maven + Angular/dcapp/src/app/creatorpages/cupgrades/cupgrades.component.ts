import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Creator } from 'src/app/classes/creator';
import { CreatorService } from 'src/app/classes/creator.service';

@Component({
  selector: 'app-cupgrades',
  templateUrl: './cupgrades.component.html',
  styleUrls: ['./cupgrades.component.css']
})
export class CupgradesComponent implements OnInit {
  creator: Creator = new Creator();
  currentCoins: any;
  currentDims: any;
  upgradeCost: any;

  upgradeList = [0, 5, 10, 15, 20, 25];

  necD = false;

  dcanvas: any;
  dctx: any;
  dbgcanvas: any;
  dbgctx: any;

  dbtn: any;

  @ViewChild('wall') wall;

  constructor(private router: Router, private titleService: Title, private creatorService: CreatorService) { }

  ngOnInit(): void {
    var id = localStorage.getItem("id");
    this.titleService.setTitle("Upgrades for Creator: " + id);
    this.elementContext();

    this.creatorService.getCreator(id).subscribe(
      data => {
        this.creator = data;
        this.currentCoins = this.creator.coins;
        this.currentDims = this.creator.maxdims;
        this.upgradeCost = this.upgradeList.indexOf(this.currentDims);
        this.setupIcon();
        this.checkButtons();
        this.drawUpgrade();
      },
      error => {
        if (error.status == '404') {
          console.error("User doesn't exist.");
        } else {
          console.error("Unknown Error: ");
          console.error(error);
        }
        this.router.navigateByUrl('/login');
      });
  }

  elementContext() {
    this.dcanvas = <HTMLCanvasElement>document.getElementById("dimension");
    this.dctx = this.dcanvas.getContext('2d');
    this.dbgcanvas = <HTMLCanvasElement>document.getElementById("dbg");
    this.dbgctx = this.dbgcanvas.getContext('2d');

    this.dbtn = <HTMLInputElement>document.getElementById("dbuy");
  }

  setupIcon() {
    this.dctx.fillStyle = "#111111";
    this.dctx.fillRect(10, 10, 80, 80);
    this.dctx.drawImage(this.wall.nativeElement, 11, 5, 165, 185);
  }

  checkButtons() {
    if (this.currentDims >= 25) {
      this.dbtn.disabled = true;
      this.dbtn.innerText = "MAXED";
    } else if (this.currentCoins >= this.upgradeCost) {
      this.dbtn.disabled = false;
      this.necD = false;
    } else {
      this.dbtn.disabled = true;
      this.necD = true;
    }
  }

  drawUpgrade() {
    switch (this.currentDims) {
      case 5:
        this.dbgctx.fillStyle = "#FFFFFF";
        break;
      case 10:
        this.dbgctx.fillStyle = "#E3B7FF";
        break;
      case 15:
        this.dbgctx.fillStyle = "#C870FF";
        break;
      case 20:
        this.dbgctx.fillStyle = "#A514FF";
        break;
      case 25:
        this.dbgctx.fillStyle = "#7A00C6";
        break;
    }
    this.dbgctx.fillRect(0, 0, 100, 100);
  }

  dbuy() {
    if (this.currentCoins >= this.upgradeCost && this.currentDims < 25) {
      this.creator.coins = this.creator.coins - this.upgradeCost;
      this.creator.maxdims = this.creator.maxdims + 5;
      this.creatorService.editCreator(this.creator).subscribe(
        data => {
          console.log(data);
          this.creator = data;
          this.currentCoins = this.creator.coins;
          this.currentDims = this.creator.maxdims;
          this.upgradeCost = this.upgradeList.indexOf(this.currentDims);
          this.setupIcon();
          this.checkButtons();
          this.drawUpgrade();
        }
      )
    }
  }
}
