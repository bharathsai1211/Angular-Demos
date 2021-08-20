import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  control = new FormControl();
  testForm!: FormGroup;
  streets: string[][] = [['Champs-Élysées', '1'], ['Lombard Street', '2'], ['Abbey Road', '3'], ['Fifth Avenue', '4']];
  filteredStreets: Observable<string[]> | undefined;
  stre: string[] = [];

  constructor(private fb: FormBuilder) {
  }


  onKeypressEvent(event: any) {

    console.log(event.target.value);


  }
  ngOnInit() {


    this.testForm = this.fb.group({
      control: new FormControl(''),

    });



    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );


  }

  private _filter(value: string): string[] {
    if (value.length < 2) {
      return [];
    }
    const filterValue = this._normalizeValue(value);
    this.stre = [];
    for (let i = 0; i < this.streets.length; i++) {
      this.stre[i] = this.streets[i][0] + ", " + this.streets[i][1];
    }
    return this.stre.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  value(data: any): void {
    console.log(data);
    console.log(this.control.value);
  }

}

