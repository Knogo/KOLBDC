import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Diver } from 'src/app/classes/diver';
import { DiverService } from 'src/app/classes/diver.service';

@Component({
  selector: 'app-dupgrades',
  templateUrl: './dupgrades.component.html',
  styleUrls: ['./dupgrades.component.css']
})
export class DupgradesComponent implements OnInit {
  diver: Diver = new Diver();
  currentCoins: any;
  currentVision: any;
  currentKeys: any;

  necV = false; //Not enough coins
  necK = false; //Not enough coins

  vcanvas: any;
  vctx: any;
  vbgcanvas: any;
  vbgctx: any;
  kcanvas: any;
  kctx: any;
  kbgcanvas: any;
  kbgctx: any;

  vbtn: any;
  kbtn: any;

  @ViewChild('eye') eye;
  @ViewChild('key') key;

  constructor(private router: Router, private titleService: Title, private diverService: DiverService) { }

  ngOnInit(): void {
    var id = localStorage.getItem("id");
    this.titleService.setTitle("Upgrades for Diver: " + id);
    this.elementContext();

    this.diverService.getDiver(id).subscribe(
      data => {
        this.diver = data;
        this.currentCoins = this.diver.coins;
        this.currentVision = this.diver.vision;
        this.currentKeys = this.diver.keys;
        this.setupIcon();
        this.checkButtons();
        this.drawUpgrade("vision");
        this.drawUpgrade("keys");
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
    this.vcanvas = <HTMLCanvasElement>document.getElementById("vision");
    this.vctx = this.vcanvas.getContext('2d');
    this.vbgcanvas = <HTMLCanvasElement>document.getElementById("vbg");
    this.vbgctx = this.vbgcanvas.getContext('2d');

    this.kcanvas = <HTMLCanvasElement>document.getElementById("key");
    this.kctx = this.kcanvas.getContext('2d');
    this.kbgcanvas = <HTMLCanvasElement>document.getElementById("kbg");
    this.kbgctx = this.kbgcanvas.getContext('2d');

    this.vbtn = <HTMLInputElement>document.getElementById("vbuy");
    this.kbtn = <HTMLInputElement>document.getElementById("kbuy");
  }

  setupIcon() {
    this.vctx.fillStyle = "#111111";
    this.vctx.fillRect(5, 5, 90, 90);
    this.vctx.drawImage(this.eye.nativeElement, 0, 0, 205, 205);

    this.kctx.fillStyle = "#111111";
    this.kctx.fillRect(5, 5, 90, 90);
    this.kctx.drawImage(this.key.nativeElement, 0, 0, 205, 205);
  }

  checkButtons() {
    if (this.currentVision >= 4) {
      this.vbtn.disabled = true;
      this.vbtn.innerText = "MAXED";
    } else if (this.currentCoins >= this.currentVision) {
      this.vbtn.disabled = false;
      this.necV = false;
    } else {
      this.vbtn.disabled = true;
      this.necV = true;
    }

    if (this.currentKeys >= 10) {
      this.kbtn.disabled = true;
      this.kbtn.innerText = "MAXED";
    } else if (this.currentCoins >= this.currentKeys) {
      this.kbtn.disabled = false;
      this.necK = false;
    } else {
      this.kbtn.disabled = true;
      this.necK = true;
    }
  }

  drawUpgrade(upgrade) {
    switch (upgrade) {
      case "vision":
        switch (this.currentVision) {
          case 1:
            this.vbgctx.fillStyle = "#FFFFFF";
            break;
          case 2:
            this.vbgctx.fillStyle = "#E3B7FF";
            break;
          case 3:
            this.vbgctx.fillStyle = "#C870FF";
            break;
          case 4:
            this.vbgctx.fillStyle = "#A514FF";
            break;
        }
        this.vbgctx.fillRect(0, 0, 100, 100);
        break;
      case "keys":
        switch (this.currentKeys) {
          case 0:
            this.kbgctx.fillStyle = "#FFFFFF";
            break;
          case 1:
            this.kbgctx.fillStyle = "#F1DBFF";
            break;
          case 2:
            this.kbgctx.fillStyle = "#E5BCFF";
            break;
          case 3:
            this.kbgctx.fillStyle = "#D799FF";
            break;
          case 4:
            this.kbgctx.fillStyle = "#CC7AFF";
            break;
          case 5:
            this.kbgctx.fillStyle = "#C260FF";
            break;
          case 6:
            this.kbgctx.fillStyle = "#B847FF";
            break;
          case 7:
            this.kbgctx.fillStyle = "#AE2DFF";
            break;
          case 8:
            this.kbgctx.fillStyle = "#A514FF";
            break;
          case 9:
            this.kbgctx.fillStyle = "#9A00F9";
            break;
          case 10:
            this.kbgctx.fillStyle = "#8D00E5";
            break;
        }
        this.kbgctx.fillRect(0, 0, 100, 100);
        break;
    }
  }

  vbuy() {
    if (this.currentCoins >= this.currentVision && this.currentVision < 4) {
      this.diver.coins = this.diver.coins - this.diver.vision;
      this.diver.vision = this.diver.vision + 1;
      this.diverService.editDiver(this.diver).subscribe(
        data => {
          //Using the returned diver + currentX is just a protection measure
          console.log(data);
          this.diver = data;
          this.currentCoins = this.diver.coins;
          this.currentVision = this.diver.vision;
          this.currentKeys = this.diver.keys;
          this.checkButtons();
          this.drawUpgrade("vision");
        })
    }
  }

  kbuy() {
    if (this.currentCoins >= this.currentKeys && this.currentKeys < 10) {
      this.diver.coins = this.diver.coins - this.diver.keys;
      this.diver.keys = this.diver.keys + 1;
      this.diverService.editDiver(this.diver).subscribe(
        data => {
          //Using the returned diver + currentX is just a protection measure
          console.log(data);
          this.diver = data;
          this.currentCoins = this.diver.coins;
          this.currentVision = this.diver.vision;
          this.currentKeys = this.diver.keys;
          this.checkButtons();
          this.drawUpgrade("keys");
        })
    }
  }
}
