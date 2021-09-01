import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  @Input() theme: string;
  @Input() result: string;

  constructor() {
    this.theme = "1";
    this.result = "0";
  }

  ngOnInit(): void {
  }

}
