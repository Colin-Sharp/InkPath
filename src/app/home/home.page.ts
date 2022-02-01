import { Component, OnInit } from '@angular/core';
import { ApiSerivce } from '../api.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../base.component';
import { CountryEnum } from '../enums/country.enum';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends BaseComponent implements OnInit {
  public name: FormControl = new FormControl('');
  public countrys = CountryEnum;
  public imagename = 'albert'
  // our world population data
  private ourdata$: Observable<any>
  public listOfPredictions: [] = []
  constructor(private apiService: ApiSerivce) {
    super();
    this.ourdata$ = this.apiService.fetchPredictedNames()
    this.ourdata$.pipe(takeUntil(this.destroyed$)).subscribe(val => {
      return val;
    });
  }

  ngOnInit(): void {}

  public filterData(allData) {
    if (this.name.value === '') {
      return allData
    } else {
      return allData.filter(data => {
        return data.name.toLowerCase().indexOf(this.name.value.toLowerCase()) !== -1;
      })
    }
  }

  public makeImagePath(name) {
    return '../../assets/images/' + name +'.jpg'
  }

  public getCountry(code) {
    return CountryEnum[code];
  }
}
