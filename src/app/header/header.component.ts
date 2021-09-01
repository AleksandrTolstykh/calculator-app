import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() selectThemeEvent = new EventEmitter<number>();
  theme: number;
  backgroundColor = ["hsl(222, 26%, 31%)", "hsl(0, 0%, 90%)", "hsl(268, 75%, 9%)"];

  constructor() {
    this.theme = 1;
  }

  ngOnInit(): void {
    document.body.style.backgroundColor = this.backgroundColor[0];
  }

  onInputChange(event: any) {
    if (event.value < 1) {
      event.source.value = 1;
    }
    if (event.value > 3) {
      event.source.value = 3;
    }
    document.body.style.backgroundColor = this.backgroundColor[event.source.value - 1];
    this.theme = event.source.value;
    this.selectThemeEvent.emit(event.source.value)
  }
}
