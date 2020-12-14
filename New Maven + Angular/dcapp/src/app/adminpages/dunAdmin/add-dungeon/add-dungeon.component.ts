import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Dungeon } from 'src/app/classes/dungeon';
import { DungeonService } from 'src/app/classes/dungeon.service';

@Component({
  selector: 'app-add-dungeon',
  templateUrl: './add-dungeon.component.html',
  styleUrls: ['./add-dungeon.component.css']
})
export class AddDungeonComponent implements OnInit {
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

  constructor(private titleService: Title, private dungeonService: DungeonService, private router: Router) { }

  ngOnInit(): void {
    this.titleService.setTitle("New Dungeon");
    this.dungeon.cname = localStorage.getItem("name");

    this.Context();

    document.getElementById("xdim").setAttribute("max", "25");
    document.getElementById("ydim").setAttribute("max", "25");
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
    this.xdim = myform.value.xdim;
    this.ydim = myform.value.ydim;

    this.lecc.style.width = (this.xdim * 30) + "px";
    this.lecc.style.height = (this.ydim * 30) + "px";

    this.tileMap = []; //Reset
    this.oneplayer = false;
    this.goalcount = 0;
    this.generateBlankLayout(); //Easier just to make a new one each time
    this.tctx.clearRect(0, 0, 750, 750); //Reset
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

    this.dungeonService.addDungeon(this.dungeon).subscribe(
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
