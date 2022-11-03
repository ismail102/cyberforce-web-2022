import { Component, OnInit } from '@angular/core';
import { DataGetService } from '../services/data-get.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  solarArr: any;

  constructor(private dataGetService: DataGetService) {}

  ngOnInit(): void {
    this.dataGetService.getFiles().subscribe((data: any) => {
      this.solarArr = data;
      console.log('Data: ', this.solarArr);
    });
  }
}
