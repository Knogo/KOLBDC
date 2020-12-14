import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Dungeon } from 'src/app/classes/dungeon';
import { DungeonService } from 'src/app/classes/dungeon.service';

@Component({
  selector: 'app-edit-dungeon',
  templateUrl: './edit-dungeon.component.html',
  styleUrls: ['./edit-dungeon.component.css']
})
export class EditDungeonComponent implements OnInit {
  dungeon: Dungeon = new Dungeon();

  //Context
  de: any;
  le: any;
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

  constructor(private titleService: Title, private dungeonService: DungeonService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      var did = params.get('did'); //Now id has value 10000
      this.titleService.setTitle("Editing Dungeon: " + did);
      this.dungeonService.getDungeon(did).subscribe(
        data => {
          this.dungeon = data;
          this.readLayout(this.dungeon.layout);
        },
        error => {
          console.error(error);
        }, () => {
          this.Context();
          this.drawLayout()
        });
    });
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
    this.xdim = numArray[0]; //x
    this.ydim = numArray[1]; //y

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
    this.tileMap[tempy] = tempArray;
  }

  drawLayout() {
    for (let y = 0; y < this.ydim; y++) {
      for (let x = 0; x < this.xdim; x++) {
        this.drawLayoutTiles(this.tileMap[y][x], x, y);
      }
    }
  }

  Context() {
    this.de = document.getElementById("dstate");
    this.le = document.getElementById("lstate");

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
  }

  backDetail() {
    this.de.style.display = "block";
    this.le.style.display = "none";
  }

  submitDetails(myform: NgForm) {
    this.lecc.style.width = (this.xdim * 30) + "px";
    this.lecc.style.height = (this.ydim * 30) + "px";

    this.drawGrid();

    this.de.style.display = "none";
    this.le.style.display = "block";
  }

  submitDungeon() {
    var tempArray = [];
    for (var i = 0; i < this.tileMap.length; i++) {
      tempArray = tempArray.concat(this.tileMap[i]);
    }

    var tempString = "";
    tempString = tempString + this.xdim.toString() + ", " + this.ydim.toString() + ", ";
    tempString = tempString + "[" + tempArray.toString() + "]";

    this.dungeon.layout = tempString;

    this.dungeonService.editDungeon(this.dungeon).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.error(error);
      },
      () => {
        this.router.navigateByUrl('/admin/dungeonlist');
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

  //Needed since there's no tile replacement
  drawLayoutTiles(tile: number, x: number, y: number) {
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

  drawSquare(tile: number, x: number, y: number) {
    if (this.tileMap[y][x] == 2) { //If that position was the player
      this.oneplayer = false; //Reset the player limit
      this.testbtn.disabled = true;
    }

    if (this.tileMap[y][x] == 3) { //If that position was the player
      this.goalcount--;
      if (this.goalcount < 1) {
        this.testbtn.disabled = true;
      }
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
}