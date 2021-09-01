import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calculator-app';
  theme = 1;
  result = "0";

  changeTheme(event: any) {
    this.theme = event;
  }

  updateResult(event: any) {
    this.result = event;
  }
}
