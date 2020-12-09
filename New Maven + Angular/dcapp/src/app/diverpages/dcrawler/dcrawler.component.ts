import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Diver } from 'src/app/classes/diver';
import { DiverService } from 'src/app/classes/diver.service';
import { Dungeon } from 'src/app/classes/dungeon';
import { DungeonService } from 'src/app/classes/dungeon.service';
import { HelpmenuComponent } from 'src/app/dungeonpages/helpmenu/helpmenu.component';

@Component({
  selector: 'app-dcrawler',
  templateUrl: './dcrawler.component.html',
  styleUrls: ['./dcrawler.component.css']
})
export class DcrawlerComponent implements OnInit {
  dungeon: Dungeon = new Dungeon();
  diver: Diver = new Diver();

  viewer: any;
  pcanvas: any;
  pctx: any;
  dcanvas: any;
  dctx: any;
  fcanvas: any;
  fctx: any;
  mcanvas: any;
  mctx: any;
  bcanvas: any;
  bctx: any;
  mecanvas: any;
  mectx: any;

  tileMap: Array<Array<number>> = [];

  startingPosition: number[] = [];

  currentPosition: number[] = [];
  dungeonDimensions: number[] = [];
  scale: number = 75;
  visionlevel: number;
  maxvisionlevel: number = 4;
  keycount: number;
  imagescale: number = 155;

  @ViewChild('cat') cat;
  @ViewChild('door') door;
  @ViewChild('fish') fish;
  @ViewChild('key') key;
  @ViewChild('lock') lock;

  constructor(public helpMenuDialog: MatDialog, private titleService: Title, private dungeonService: DungeonService, private route: ActivatedRoute, private router: Router, private diverService: DiverService) { }

  ngOnInit(): void {
    this.diverService.getDiver(localStorage.getItem("id")).subscribe(
      data => {
        this.diver = data;
        this.keycount = Number(this.diver.keys);
        this.visionlevel = Number(this.diver.vision);

        this.route.paramMap.subscribe(params => {
          var did = params.get('did');
          this.titleService.setTitle("Dungeon Crawling" + did);
          this.dungeonService.getDungeon(did).subscribe(
            data => {
              this.dungeon = data;
            },
            error => {
              if (error.status == '404') {
                console.error("Dungeon doesn't exist.");
              } else {
                console.error("Unknown Error: ");
                console.error(error);
              }
              console.log("something happened");
              this.router.navigateByUrl('../../dungeonlist');
            },
            () => {
              this.canvasContext();
              this.resetDungeon();
            });
        });
      }, 
      error => {
        this.router.navigateByUrl('../../dungeonlist')
      });
  }

  resetDungeon() {
    this.moveCount = 0;
    this.readLayout(this.dungeon.layout);
    this.gameSetup();
    this.processBoard();
  }

  openHelpMenu() {
    this.helpMenuDialog.open(HelpmenuComponent);
  }

  canvasContext() {
    this.viewer = document.getElementById("canvasContainer");
    this.pcanvas = <HTMLCanvasElement>document.getElementById("player");
    this.pctx = this.pcanvas.getContext('2d');
    this.fcanvas = <HTMLCanvasElement>document.getElementById("fog");
    this.fctx = this.fcanvas.getContext('2d');
    this.dcanvas = <HTMLCanvasElement>document.getElementById("darkness");
    this.dctx = this.dcanvas.getContext('2d');
    this.mcanvas = <HTMLCanvasElement>document.getElementById("map");
    this.mctx = this.mcanvas.getContext('2d');
    this.bcanvas = <HTMLCanvasElement>document.getElementById("background");
    this.bctx = this.bcanvas.getContext('2d');
  }

  readLayout(layout: string) {
    //Read board setup
    var scharPosition = []; // commas and brackets
    var numArray = [];

    for (let i = 0; i < layout.length; i++) {
      if (layout[i] == "," || layout[i] == "[" || layout[i] == "]") {
        scharPosition.push(i);
      }
    }
    scharPosition.push(layout.length);

    numArray.push(parseInt(layout.substring(0, scharPosition[0])));
    for (let i = 0; i < scharPosition.length - 1; i++) {
      if (!isNaN(parseInt(layout.substring(scharPosition[i] + 1, scharPosition[i + 1])))) {
        numArray.push(parseInt(layout.substring(scharPosition[i] + 1, scharPosition[i + 1])));
      }
    }
    //Starting two positions are dungeon dimensions
    this.dungeonDimensions[0] = numArray[0]; //x
    this.dungeonDimensions[1] = numArray[1]; //y

    var tempx = 0;
    var tempy = 0;
    var tempArray = [];

    for (let i = 2; i < numArray.length; i++) {
      if (tempx < numArray[0]) {
        tempArray.push(numArray[i]);
        tempx++;
      }
      else {
        tempx = 0;
        this.tileMap[tempy] = tempArray;
        tempy++;
        tempArray = [];
        tempArray.push(numArray[i]);
        tempx++;
      }
    }
    //We miss a push row (due to tempy)
    this.tileMap[tempy] = tempArray;
    //TileMap now contains the board -- now we can build the gameboard and process the tilemap!
  }

  processBoard() {
    this.mctx.clearRect(this.scale, this.scale, this.mcanvas.width - (2 * this.scale), this.mcanvas.height - (2 * this.scale));

    for (let y = 0; y < this.tileMap.length; y++) {
      for (let x = 0; x < this.tileMap[y].length; x++) {
        this.buildBoard(this.tileMap[y][x], x + 1, y + 1);
      }
    }
  }

  buildBoard(tile: number, x: number, y: number) {
    switch (tile) {
      case 1: //Wall 
        this.mctx.fillStyle = "#474747";
        this.mctx.fillRect(
          (x * this.scale),
          (y * this.scale),
          this.scale, this.scale);
        break;
      case 3: //Goal
        this.mctx.fillStyle = "yellow";
        this.mctx.fillRect(
          (x * this.scale),
          (y * this.scale),
          this.scale, this.scale);
        this.mctx.drawImage(this.door.nativeElement, (x * this.scale),
          (y * this.scale), this.imagescale, this.imagescale);
        break;
      case 4: //Enemy
        this.mctx.fillStyle = "#03d7fc";
        this.mctx.beginPath();
        this.mctx.arc(((x + 0.5) * this.scale), ((y + 0.5) * this.scale), this.scale / 2 - 1, 50, 0, 2 * Math.PI);
        this.mctx.fill();
        this.mctx.drawImage(this.fish.nativeElement, (x * this.scale),
          (y * this.scale), this.imagescale, this.imagescale);
        break;
      case 5: //Door
        this.mctx.fillStyle = "#7F5F00";
        this.mctx.fillRect(
          (x * this.scale),
          (y * this.scale),
          this.scale, this.scale);
        this.mctx.fillStyle = "#C69500";
        this.mctx.beginPath();
        this.mctx.arc(((x + 0.5) * this.scale), ((y + 0.5) * this.scale), this.scale / 2 - 1, 50, 0, 2 * Math.PI);
        this.mctx.fill();
        this.mctx.drawImage(this.lock.nativeElement, (x * this.scale),
          (y * this.scale), this.imagescale, this.imagescale);
        break;
    }
  }

  gameSetup() {
    //Checking start position
    for (let y = 0; y < this.tileMap.length; y++) {
      for (let x = 0; x < this.tileMap[y].length; x++) {
        if (this.tileMap[y][x] == 2) {
          this.currentPosition[0] = this.startingPosition[0] = x;
          this.currentPosition[1] = this.startingPosition[1] = y;
        }
      }
    }

    //Setup the game and movement
    //Set view based off scale and max vision
    this.viewer.style.width = ((this.maxvisionlevel * 2) + 1) * this.scale + "px";
    this.viewer.style.height = ((this.maxvisionlevel * 2) + 1) * this.scale + "px";

    //Set player to entire window
    this.pcanvas.width = parseInt(this.viewer.style.width);
    this.pcanvas.height = parseInt(this.viewer.style.height);
    //Set fog to entire window
    this.fcanvas.width = parseInt(this.viewer.style.width);
    this.fcanvas.height = parseInt(this.viewer.style.height);
    //Set background to entire window
    this.bcanvas.width = parseInt(this.viewer.style.width);
    this.bcanvas.height = parseInt(this.viewer.style.height);

    //Set darkness to map
    this.dcanvas.width = (this.dungeonDimensions[0]) * this.scale;
    this.dcanvas.height = (this.dungeonDimensions[1]) * this.scale;
    //Set map to dimension scale
    this.mcanvas.width = (this.dungeonDimensions[0] + 2) * this.scale;
    this.mcanvas.height = (this.dungeonDimensions[1] + 2) * this.scale;

    //Fill darkness with black
    this.dctx.fillStyle = "black";
    this.dctx.fillRect(0, 0, this.dcanvas.width, this.dcanvas.height);
    //Map border walls
    this.mctx.fillStyle = "#292929";
    this.mctx.fillRect(0, 0, this.mcanvas.width, this.mcanvas.height);

    //Fill fog with grey opacity
    this.fctx.globalAlpha = 0.5;
    this.fctx.fillStyle = "#141414";
    this.fctx.fillRect(0, 0, this.fcanvas.width, this.fcanvas.height);

    //Fill background with color
    this.bctx.fillStyle = "#d5e5f7";
    this.bctx.fillRect(0, 0, this.bcanvas.width, this.bcanvas.height);

    //Fill player
    this.pctx.fillStyle = "#93FF70";
    this.pctx.beginPath();
    this.pctx.arc(((this.maxvisionlevel + 0.5) * this.scale), ((this.maxvisionlevel + 0.5) * this.scale), this.scale / 2 - 1, 50, 0, 2 * Math.PI);
    this.pctx.fill();
    // this.pctx.fillRect(
    //   (this.maxvisionlevel * this.scale),
    //   (this.maxvisionlevel * this.scale),
    //   this.scale, this.scale);
    this.pctx.drawImage(this.cat.nativeElement, (this.maxvisionlevel * this.scale), (this.maxvisionlevel * this.scale), this.imagescale, this.imagescale);

    //Key Counter
    this.keyUpdate();
    //Clear fog around player
    this.fctx.clearRect(
      ((this.maxvisionlevel - this.visionlevel) * this.scale),
      ((this.maxvisionlevel - this.visionlevel) * this.scale),
      ((2 * this.visionlevel) + 1) * this.scale,
      ((2 * this.visionlevel) + 1) * this.scale);

    //Position player
    this.mcanvas.style.marginLeft = ((this.maxvisionlevel - this.currentPosition[0] - 1) * this.scale) + "px";
    this.mcanvas.style.marginTop = ((this.maxvisionlevel - this.currentPosition[1] - 1) * this.scale) + "px";
    this.dcanvas.style.marginLeft = ((this.maxvisionlevel - this.currentPosition[0]) * this.scale) + "px";
    this.dcanvas.style.marginTop = ((this.maxvisionlevel - this.currentPosition[1]) * this.scale) + "px";

    //Starting darkness clear
    this.dctx.clearRect(
      ((this.currentPosition[0] - this.visionlevel) * this.scale),
      ((this.currentPosition[1] - this.visionlevel) * this.scale),
      ((2 * this.visionlevel) + 1) * this.scale,
      ((2 * this.visionlevel) + 1) * this.scale);
  }

  gameWon: Boolean;
  moveValid: Boolean;
  moveCount: number;

  movelogic(keycode: number) {
    switch (keycode) {
      case 37: //Left Arrow
        if (this.moveValid) {
          this.currentPosition[0] -= 1;
          this.mcanvas.style.marginLeft = ((this.maxvisionlevel - this.currentPosition[0] - 1) * this.scale) + "px";
          this.dcanvas.style.marginLeft = ((this.maxvisionlevel - this.currentPosition[0]) * this.scale) + "px";
          this.dctx.clearRect(
            ((this.currentPosition[0] - this.visionlevel) * this.scale),
            ((this.currentPosition[1] - this.visionlevel) * this.scale),
            ((2 * this.visionlevel) + 1) * this.scale,
            ((2 * this.visionlevel) + 1) * this.scale);
          this.moveCount++;
        }
        break;
      case 38: //Up Arrow
        if (this.moveValid) {
          this.currentPosition[1] -= 1;
          this.mcanvas.style.marginTop = ((this.maxvisionlevel - this.currentPosition[1] - 1) * this.scale) + "px";
          this.dcanvas.style.marginTop = ((this.maxvisionlevel - this.currentPosition[1]) * this.scale) + "px";
          this.dctx.clearRect(
            ((this.currentPosition[0] - this.visionlevel) * this.scale),
            ((this.currentPosition[1] - this.visionlevel) * this.scale),
            ((2 * this.visionlevel) + 1) * this.scale,
            ((2 * this.visionlevel) + 1) * this.scale);
          this.moveCount++;
        }
        break;
      case 39: //Right Arrow
        if (this.moveValid) {
          this.currentPosition[0] += 1;
          this.mcanvas.style.marginLeft = ((this.maxvisionlevel - this.currentPosition[0] - 1) * this.scale) + "px";
          this.dcanvas.style.marginLeft = ((this.maxvisionlevel - this.currentPosition[0]) * this.scale) + "px";
          this.dctx.clearRect(
            ((this.currentPosition[0] - this.visionlevel) * this.scale),
            ((this.currentPosition[1] - this.visionlevel) * this.scale),
            ((2 * this.visionlevel) + 1) * this.scale,
            ((2 * this.visionlevel) + 1) * this.scale);
          this.moveCount++;
        }
        break;
      case 40: //Down Arrow
        if (this.moveValid) {
          this.currentPosition[1] += 1;
          this.mcanvas.style.marginTop = ((this.maxvisionlevel - this.currentPosition[1] - 1) * this.scale) + "px";
          this.dcanvas.style.marginTop = ((this.maxvisionlevel - this.currentPosition[1]) * this.scale) + "px";
          this.dctx.clearRect(
            ((this.currentPosition[0] - this.visionlevel) * this.scale),
            ((this.currentPosition[1] - this.visionlevel) * this.scale),
            ((2 * this.visionlevel) + 1) * this.scale,
            ((2 * this.visionlevel) + 1) * this.scale);
          this.moveCount++;
        }
        break;
    }
    this.moveValid = false;

    if (this.gameWon == true) {
      alert("Game won in " + this.moveCount + " moves!");
      this.gameWon = false; //Just to stop bothering
    }
  }

  keyUpdate() {
    this.pctx.clearRect(10, 10, 135, 30);
    this.pctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    this.pctx.fillRect(10, 10, 135, 30);
    this.pctx.fillStyle = "white";
    this.pctx.font = "bold 30px silverf";
    this.pctx.textAlign = "left";
    this.pctx.fillText("    Keys = " + this.keycount, 18, 32);
    this.pctx.drawImage(this.key.nativeElement, 17, 13);
  }

  gamelogic(keycode: number) {
    this.moveValid = true;
    switch (keycode) {
      case 37: //Left Arrow
        if (this.currentPosition[0] <= 0 || this.tileMap[this.currentPosition[1]][this.currentPosition[0] - 1] == 1) { //Out of bounds OR Wall
          this.moveValid = false;
        }
        else if (this.tileMap[this.currentPosition[1]][this.currentPosition[0] - 1] == 3) { //Goal
          this.gameWon = true;
        }
        else if (this.tileMap[this.currentPosition[1]][this.currentPosition[0] - 1] == 4) { //Enemy
          this.tileMap[this.currentPosition[1]][this.currentPosition[0] - 1] = 0;
          this.processBoard();
          this.keycount++;
          this.keyUpdate();
        }
        else if (this.keycount > 0 && this.tileMap[this.currentPosition[1]][this.currentPosition[0] - 1] == 5) { //Door
          this.tileMap[this.currentPosition[1]][this.currentPosition[0] - 1] = 0;
          this.processBoard();
          this.keycount--;
          this.keyUpdate();
        }
        else if (this.keycount == 0 && this.tileMap[this.currentPosition[1]][this.currentPosition[0] - 1] == 5) { //Door
          this.moveValid = false;
        }
        break;
      case 38: //Up Arrow
        if (this.currentPosition[1] <= 0 || this.tileMap[this.currentPosition[1] - 1][this.currentPosition[0]] == 1) { //Out of bounds OR Wall
          this.moveValid = false;
        }
        else if (this.tileMap[this.currentPosition[1] - 1][this.currentPosition[0]] == 3) { //Goal
          this.gameWon = true;
        }
        else if (this.tileMap[this.currentPosition[1] - 1][this.currentPosition[0]] == 4) { //Enemy
          this.tileMap[this.currentPosition[1] - 1][this.currentPosition[0]] = 0;
          this.processBoard();
          this.keycount++;
          this.keyUpdate();
        }
        else if (this.keycount > 0 && this.tileMap[this.currentPosition[1] - 1][this.currentPosition[0]] == 5) { //Door
          this.tileMap[this.currentPosition[1] - 1][this.currentPosition[0]] = 0;
          this.processBoard();
          this.keycount--;
          this.keyUpdate();
        }
        else if (this.keycount == 0 && this.tileMap[this.currentPosition[1] - 1][this.currentPosition[0]] == 5) { //Door
          this.moveValid = false;
        }
        break;
      case 39: //Right Arrow
        if (this.currentPosition[0] >= (this.dungeonDimensions[0] - 1) || this.tileMap[this.currentPosition[1]][this.currentPosition[0] + 1] == 1) { //Out of bounds OR Wall
          this.moveValid = false;
        }
        else if (this.tileMap[this.currentPosition[1]][this.currentPosition[0] + 1] == 3) { //Goal
          this.gameWon = true;
        }
        else if (this.tileMap[this.currentPosition[1]][this.currentPosition[0] + 1] == 4) { //Enemy
          this.tileMap[this.currentPosition[1]][this.currentPosition[0] + 1] = 0;
          this.processBoard();
          this.keycount++;
          this.keyUpdate();
        }
        else if (this.keycount > 0 && this.tileMap[this.currentPosition[1]][this.currentPosition[0] + 1] == 5) { //Door
          this.tileMap[this.currentPosition[1]][this.currentPosition[0] + 1] = 0;
          this.processBoard();
          this.keycount--;
          this.keyUpdate();
        }
        else if (this.keycount == 0 && this.tileMap[this.currentPosition[1]][this.currentPosition[0] + 1] == 5) { //Door
          this.moveValid = false;
        }
        break;
      case 40: //Down Arrow
        if (this.currentPosition[1] >= (this.dungeonDimensions[1] - 1) || this.tileMap[this.currentPosition[1] + 1][this.currentPosition[0]] == 1) { //Out of bounds OR Wall
          this.moveValid = false;
        }
        else if (this.tileMap[this.currentPosition[1] + 1][this.currentPosition[0]] == 3) { //Goal
          this.gameWon = true;
        }
        else if (this.tileMap[this.currentPosition[1] + 1][this.currentPosition[0]] == 4) { //Enemy
          this.tileMap[this.currentPosition[1] + 1][this.currentPosition[0]] = 0;
          this.processBoard();
          this.keycount++;
          this.keyUpdate();
        }
        else if (this.keycount > 0 && this.tileMap[this.currentPosition[1] + 1][this.currentPosition[0]] == 5) { //Door
          this.tileMap[this.currentPosition[1] + 1][this.currentPosition[0]] = 0;
          this.processBoard();
          this.keycount--;
          this.keyUpdate();
        }
        else if (this.keycount == 0 && this.tileMap[this.currentPosition[1] + 1][this.currentPosition[0]] == 5) { //Door
          this.moveValid = false;
        }
        break;
    }
  }

  //On screen buttons
  move(direction: string) {
    switch (direction) {
      case "left": //Left Arrow
        this.gamelogic(37);
        this.movelogic(37);
        break;
      case "up": //Up Arrow
        this.gamelogic(38);
        this.movelogic(38);
        break;
      case "right": //Right Arrow
        this.gamelogic(39);
        this.movelogic(39);
        break;
      case "down": //Down Arrow
        this.gamelogic(40);
        this.movelogic(40);
        break;
    }
  }

  movePlayer(pressedKey) {
    pressedKey.preventDefault();
    switch (pressedKey.keyCode) {
      case 37: //Left Arrow
        this.gamelogic(37);
        this.movelogic(37);
        break;
      case 38: //Up Arrow
        this.gamelogic(38);
        this.movelogic(38);
        break;
      case 39: //Right Arrow
        this.gamelogic(39);
        this.movelogic(39);
        break;
      case 40: //Down Arrow
        this.gamelogic(40);
        this.movelogic(40);
        break;
    }
  }
}