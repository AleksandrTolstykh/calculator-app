import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-block',
  templateUrl: './button-block.component.html',
  styleUrls: ['./button-block.component.scss']
})
export class ButtonBlockComponent implements OnInit {
  buttons = ["7", "8", "9", "DEL", "4", "5", "6", "+", "1", "2", "3", "-", ".", "0", "/", "x"];
  @Input() theme: string;
  numbers: string[];
  amountOfNumbers: number;
  operators: string[];
  expression: string;
  @Output() newInput = new EventEmitter<string>();
  isCalculated: boolean;

  constructor() {
    this.theme = "1";
    this.numbers = [""];
    this.amountOfNumbers = 0;
    this.operators = [""];
    this.expression = "";
    this.isCalculated = false;
  }

  ngOnInit(): void {
  }

  onClick(event: any) {
    if (event.target.innerText === "." && this.numbers[this.amountOfNumbers].includes(".")) {
      return;
    }
    if (this.amountOfNumbers === 0 && this.numbers[this.amountOfNumbers] === "" && event.target.innerText === "-") {
      this.numbers[this.amountOfNumbers] += event.target.innerText;
      this.expression += event.target.innerText;
      this.newInput.emit(this.expression);
      return;
    }
    if (event.target.innerText === "+" || event.target.innerText === "-" || event.target.innerText === "x" || event.target.innerText === "/") {
      if (this.numbers[this.amountOfNumbers] === "" || this.numbers[this.amountOfNumbers] === "-") {
        return;
      }
      this.operators[this.amountOfNumbers] = event.target.innerText;
      this.amountOfNumbers++;
      this.numbers[this.amountOfNumbers] = "";
      this.expression += event.target.innerText;
      this.newInput.emit(this.expression);
    } else if (event.target.innerText === "DEL") {
      if (this.numbers[this.amountOfNumbers].length !== 0) {
        this.numbers[this.amountOfNumbers] = this.numbers[this.amountOfNumbers].slice(0, -1);
        this.expression = this.expression.slice(0, -1);
        this.newInput.emit(this.expression);
      } else if (this.amountOfNumbers === 0) {
        return;
      } else {
        this.amountOfNumbers--;
        this.operators[this.amountOfNumbers] = "";
        this.expression = this.expression.slice(0, -1);
        this.newInput.emit(this.expression);
      }
    } else if (this.numbers[this.amountOfNumbers] === "" && event.target.innerText === ".") {
      this.numbers[this.amountOfNumbers] += "0.";
      this.expression += "0.";
      this.newInput.emit(this.expression);
    } else if (this.numbers[this.amountOfNumbers] === "0" && event.target.innerText === "0" ) {
      return;
    } else if (this.numbers[this.amountOfNumbers] === "0" && event.target.innerText <= "9" && event.target.innerText > "0") {
      if (this.isCalculated) {
        this.onReset(null);
      }
      this.numbers[this.amountOfNumbers] = event.target.innerText;
      this.expression = this.expression.slice(0, -1) + event.target.innerText;
      this.newInput.emit(this.expression);
    } else {
      if (this.isCalculated) {
        this.onReset(null);
      }
      this.numbers[this.amountOfNumbers] += event.target.innerText;
      this.expression += event.target.innerText;
      this.newInput.emit(this.expression);
    }
    this.isCalculated = false;
  }

  onReset(event: any) {
    this.numbers = [""];
    this.amountOfNumbers = 0;
    this.operators = [""];
    this.expression = "";
    this.newInput.emit("0");
  }

  onCalculate(event: any) {
    for (let i = 0; i < this.operators.length; i++) {
      switch (this.operators[i]) {
        case "x":
          this.numbers[i + 1] = String(parseFloat(this.numbers[i]) * parseFloat(this.numbers[i + 1]));
          this.numbers[i] = "0";
          this.operators[i] = "+";
          break;
        case "/":
          this.numbers[i + 1] = String(parseFloat(this.numbers[i]) / parseFloat(this.numbers[i + 1]));
          this.numbers[i] = "0"
          this.operators[i] = "+";
          break;
      }
    }
    let result = parseFloat(this.numbers[0]);
    for (let i = 0; i < this.operators.length; i++) {
      switch (this.operators[i]) {
        case "+":
          result += parseFloat(this.numbers[i + 1]);
          break;
        case "-":
          result -= parseFloat(this.numbers[i + 1]);
          break;
      }
    }
    this.numbers = [""];
    this.numbers[0] = String(result);
    this.amountOfNumbers = 1;
    this.operators = [""];
    this.expression = String(result);
    this.newInput.emit(this.expression);
    this.isCalculated = true;
  }
}
