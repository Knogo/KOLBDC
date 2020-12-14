import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Creator } from 'src/app/classes/creator';
import { CreatorService } from 'src/app/classes/creator.service';
import { Dungeon } from 'src/app/classes/dungeon';
import { DungeonService } from 'src/app/classes/dungeon.service';

@Component({
  selector: 'app-ceditor',
  templateUrl: './ceditor.component.html',
  styleUrls: ['./ceditor.component.css']
})
export class CeditorComponent implements OnInit {
  dungeon: Dungeon = new Dungeon();
  creator: Creator = new Creator();

  //Context
  de: any;
  le: any;
  te: any;
  testbtn: any;

  max: number; //Placeholder maxdims
  xdim: number = 5;
  ydim: number = 5;

  tileMap: Array<Array<number>> = [];

  lecc: any;
  gcanvas: any;
  gctx: any;
  tcanvas: any;
  tctx: any;

  tempX: number; //Holds adjusted x pos
  tempY: number; //Holds adjusted y pos

  oneplayer = false; //Only one player allowed
  goalcount: number = 0; //At least one goal

  selectedTile: number = 0; //Selection: default open
  currentSelection: String = "Open";

  //Crawler Elements

  @ViewChild('cat') cat;
  @ViewChild('door') door;
  @ViewChild('fish') fish;
  @ViewChild('key') key;
  @ViewChild('lock') lock;

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

  tileMapCopy: Array<Array<number>> = [];

  startingPosition: number[] = [];

  currentPosition: number[] = [];
  dungeonDimensions: number[] = [];
  scale: number = 75;
  visionlevel: number = 4;
  maxvisionlevel: number = 4;
  keycount: number = 0;
  imagescale: number = 155;

  gameWon: Boolean;
  moveValid: Boolean;

  constructor(private titleService: Title, private dungeonService: DungeonService, private router: Router, private creatorService: CreatorService) { }

  ngOnInit(): void {
    this.titleService.setTitle("New Dungeon");
    this.dungeon.cname = localStorage.getItem("name");

    this.Context();

    this.creatorService.getCreator(localStorage.getItem("id")).subscribe(
      data => {
        this.creator = data;
        document.getElementById("xdim").setAttribute("max", String(this.creator.maxdims));
        document.getElementById("ydim").setAttribute("max", String(this.creator.maxdims));
      },
      error => {
        if (error.status == '404') {
          console.error("User doesn't exist.");
        } else {
          console.error("Unknown Error: ");
          console.error(error);
        }
        this.router.navigateByUrl('/creator');
      }
    );
  }

  Context() {
    this.de = document.getElementById("dstate");
    this.le = document.getElementById("lstate");
    this.te = document.getElementById("tstate");

    this.testbtn = document.getElementById("testbtn");
    
    this.lecc = document.getElementById("lecc");
    this.gcanvas = <HTMLCanvasElement>document.getElementById("grid");
    this.gctx = this.gcanvas.getContext('2d');
    this.tcanvas = <HTMLCanvasElement>document.getElementById("tiles");
    this.tctx = this.tcanvas.getContext('2d');

    this.gcanvas.width = "750";
    this.gcanvas.height = "750";
    this.tcanvas.width = "750";
    this.tcanvas.height = "750";

    //Crawler
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

  backDetail() {
    this.de.style.display = "block";
    this.le.style.display = "none";
  }

  backLayout() {
    this.le.style.display = "block";
    this.te.style.display = "none";
  }

  submitDetails(myform: NgForm) {
    this.xdim = myform.value.xdim;
    this.ydim = myform.value.ydim;

    this.lecc.style.width = (this.xdim * 30) + "px";
    this.lecc.style.height = (this.ydim * 30) + "px";

    this.dungeonDimensions[0] = this.xdim;
    this.dungeonDimensions[1] = this.ydim;

    this.tileMap = []; //Reset
    this.oneplayer = false;
    this.goalcount   = 0;
    this.generateBlankLayout(); //Easier just to make a new one each time
    this.tctx.clearRect(0, 0, 750, 750); //Reset
    this.drawGrid();

    this.de.style.display = "none";
    this.le.style.display = "block";
  }

  testLayout() {
    this.le.style.display = "none";
    this.te.style.display = "block";

    this.resetDungeon();
  }

  submitDungeon() {
    var tempArray = [];
    for (var i = 0; i < this.tileMap.length; i++) {
      tempArray = tempArray.concat(this.tileMap[i]);
    }
    
    var tempString = "";
    tempString = tempString + this.dungeonDimensions.toString() + ", ";
    tempString = tempString + "[" + tempArray.toString() + "]";

    this.dungeon.layout = tempString;

    alert("Dungeon testing complete, adding dungeon...");

    this.dungeonService.addDungeon(this.dungeon).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.error(error);
      },
      () => {
        this.router.navigateByUrl('/creator');
      });
  }

  choosetile(tile: String) {
    this.currentSelection = tile;
    switch (tile) {
      case 'Open':
        this.selectedTile = 0;
        break;
      case 'Wall':
        this.selectedTile = 1;
        break;
      case 'Player':
        this.selectedTile = 2;
        break;
      case 'Exit':
        this.selectedTile = 3;
        break;
      case 'Enemy':
        this.selectedTile = 4;
        break;
      case 'Door':
        this.selectedTile = 5;
        break;
    }
  }

  changeTile(event) {
    this.tempX = Math.ceil(event.offsetX / 30) - 1;
    this.tempY = Math.ceil(event.offsetY / 30) - 1;

    this.drawSquare(this.selectedTile, this.tempX, this.tempY);
  }

  generateBlankLayout() {
    var tempArray;
    for (let y = 0; y < this.ydim; y++) {
      tempArray = [];
      for (let x = 0; x < this.xdim; x++) {
        tempArray.push(1);
      }
      this.tileMap.push(tempArray);
    }
  }

  drawGrid() {
    this.gctx.clearRect(0, 0, 750, 750); //Reset

    for (var x = 0; x <= this.xdim; x++) {
      this.gctx.moveTo(x * 30, 0);
      this.gctx.lineTo(x * 30, this.ydim * 30)
    }

    for (var y = 0; y <= this.ydim; y++) {
      this.gctx.moveTo(0, y * 30);
      this.gctx.lineTo(this.xdim * 30, y * 30);
    }

    this.gctx.strokeStyle = "white";
    this.gctx.stroke();
  }

  drawSquare(tile: number, x: number, y: number) {
    if (this.tileMap[y][x] == 2) { //If that position was the player
      this.oneplayer = false; //Reset the player limit
      this.testbtn.disabled = true;
    }

    if (this.tileMap[y][x] == 3) { //If that position was the player
      this.goalcount--;
    }

    //If playertile selected and player has already been set
    if (tile == 2 && this.oneplayer) { 
      alert("Only one player allowed!");
    } else {
      this.tileMap[y][x] = tile; //Set the tile at that position = tile
      switch (tile) {
        case 0: //Open
          this.tctx.fillStyle = "white";
          this.tctx.fillRect(x * 30, y * 30, 30, 30);
          break;
        case 1: //Wall
          this.tctx.fillStyle = "black";
          this.tctx.fillRect(x * 30, y * 30, 30, 30);
          break;
        case 2: //Player
          this.oneplayer = true;
          this.tctx.fillStyle = "#93FF70";
          this.tctx.fillRect(x * 30, y * 30, 30, 30);
          break;
        case 3: //Exit
          this.goalcount++;
          this.tctx.fillStyle = "yellow";
          this.tctx.fillRect(x * 30, y * 30, 30, 30);
          break;
        case 4: //Enemy
          this.tctx.fillStyle = "#03d7fc";
          this.tctx.fillRect(x * 30, y * 30, 30, 30);
          break;
        case 5: //Door
          this.tctx.fillStyle = "#7F5F00";
          this.tctx.fillRect(x * 30, y * 30, 30, 30);
          break;
      }

      if (this.goalcount >= 1 && this.oneplayer) {
        this.testbtn.disabled = false;
      }
    }
  }

  //Crawler Methods
  resetDungeon() {
    for (var i = 0; i < this.tileMap.length; i++){
      this.tileMapCopy[i] = this.tileMap[i].slice();
    }

    this.gameSetup();
    this.processBoard();
  }

  processBoard() {
    this.mctx.clearRect(this.scale, this.scale, this.mcanvas.width - (2 * this.scale), this.mcanvas.height - (2 * this.scale));

    for (let y = 0; y < this.tileMapCopy.length; y++) {
      for (let x = 0; x < this.tileMapCopy[y].length; x++) {
        this.buildBoard(this.tileMapCopy[y][x], x + 1, y + 1);
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
    for (let y = 0; y < this.tileMapCopy.length; y++) {
      for (let x = 0; x < this.tileMapCopy[y].length; x++) {
        if (this.tileMapCopy[y][x] == 2) {
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
        }
        break;
    }
    this.moveValid = false;

    if (this.gameWon == true) {
      this.submitDungeon();
      this.gameWon = false; //Only on goal square
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
        if (this.currentPosition[0] <= 0 || this.tileMapCopy[this.currentPosition[1]][this.currentPosition[0] - 1] == 1) { //Out of bounds OR Wall
          this.moveValid = false;
        }
        else if (this.tileMapCopy[this.currentPosition[1]][this.currentPosition[0] - 1] == 3) { //Goal
          this.gameWon = true;
        }
        else if (this.tileMapCopy[this.currentPosition[1]][this.currentPosition[0] - 1] == 4) { //Enemy
          this.tileMapCopy[this.currentPosition[1]][this.currentPosition[0] - 1] = 0;
          this.processBoard();
          this.keycount++;
          this.keyUpdate();
        }
        else if (this.keycount > 0 && this.tileMapCopy[this.currentPosition[1]][this.currentPosition[0] - 1] == 5) { //Door
          this.tileMapCopy[this.currentPosition[1]][this.currentPosition[0] - 1] = 0;
          this.processBoard();
          this.keycount--;
          this.keyUpdate();
        }
        else if (this.keycount == 0 && this.tileMapCopy[this.currentPosition[1]][this.currentPosition[0] - 1] == 5) { //Door
          this.moveValid = false;
        }
        break;
      case 38: //Up Arrow
        if (this.currentPosition[1] <= 0 || this.tileMapCopy[this.currentPosition[1] - 1][this.currentPosition[0]] == 1) { //Out of bounds OR Wall
          this.moveValid = false;
        }
        else if (this.tileMapCopy[this.currentPosition[1] - 1][this.currentPosition[0]] == 3) { //Goal
          this.gameWon = true;
        }
        else if (this.tileMapCopy[this.currentPosition[1] - 1][this.currentPosition[0]] == 4) { //Enemy
          this.tileMapCopy[this.currentPosition[1] - 1][this.currentPosition[0]] = 0;
          this.processBoard();
          this.keycount++;
          this.keyUpdate();
        }
        else if (this.keycount > 0 && this.tileMapCopy[this.currentPosition[1] - 1][this.currentPosition[0]] == 5) { //Door
          this.tileMapCopy[this.currentPosition[1] - 1][this.currentPosition[0]] = 0;
          this.processBoard();
          this.keycount--;
          this.keyUpdate();
        }
        else if (this.keycount == 0 && this.tileMapCopy[this.currentPosition[1] - 1][this.currentPosition[0]] == 5) { //Door
          this.moveValid = false;
        }
        break;
      case 39: //Right Arrow
        if (this.currentPosition[0] >= (this.dungeonDimensions[0] - 1) || this.tileMapCopy[this.currentPosition[1]][this.currentPosition[0] + 1] == 1) { //Out of bounds OR Wall
          this.moveValid = false;
        }
        else if (this.tileMapCopy[this.currentPosition[1]][this.currentPosition[0] + 1] == 3) { //Goal
          this.gameWon = true;
        }
        else if (this.tileMapCopy[this.currentPosition[1]][this.currentPosition[0] + 1] == 4) { //Enemy
          this.tileMapCopy[this.currentPosition[1]][this.currentPosition[0] + 1] = 0;
          this.processBoard();
          this.keycount++;
          this.keyUpdate();
        }
        else if (this.keycount > 0 && this.tileMapCopy[this.currentPosition[1]][this.currentPosition[0] + 1] == 5) { //Door
          this.tileMapCopy[this.currentPosition[1]][this.currentPosition[0] + 1] = 0;
          this.processBoard();
          this.keycount--;
          this.keyUpdate();
        }
        else if (this.keycount == 0 && this.tileMapCopy[this.currentPosition[1]][this.currentPosition[0] + 1] == 5) { //Door
          this.moveValid = false;
        }
        break;
      case 40: //Down Arrow
        if (this.currentPosition[1] >= (this.dungeonDimensions[1] - 1) || this.tileMapCopy[this.currentPosition[1] + 1][this.currentPosition[0]] == 1) { //Out of bounds OR Wall
          this.moveValid = false;
        }
        else if (this.tileMapCopy[this.currentPosition[1] + 1][this.currentPosition[0]] == 3) { //Goal
          this.gameWon = true;
        }
        else if (this.tileMapCopy[this.currentPosition[1] + 1][this.currentPosition[0]] == 4) { //Enemy
          this.tileMapCopy[this.currentPosition[1] + 1][this.currentPosition[0]] = 0;
          this.processBoard();
          this.keycount++;
          this.keyUpdate();
        }
        else if (this.keycount > 0 && this.tileMapCopy[this.currentPosition[1] + 1][this.currentPosition[0]] == 5) { //Door
          this.tileMapCopy[this.currentPosition[1] + 1][this.currentPosition[0]] = 0;
          this.processBoard();
          this.keycount--;
          this.keyUpdate();
        }
        else if (this.keycount == 0 && this.tileMapCopy[this.currentPosition[1] + 1][this.currentPosition[0]] == 5) { //Door
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
      default:
        return;
    }

    pressedKey.preventDefault();
  }
}
