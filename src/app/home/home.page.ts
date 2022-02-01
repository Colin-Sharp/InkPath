import { Component } from '@angular/core';
import { ApiSerivce } from '../api.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { CountryEnum } from '../enums/country.enum';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public name: FormControl = new FormControl('');

  // our name data var.
  private ourdata$: Observable<any>

  constructor(private apiService: ApiSerivce) {
    // Get our data from our api service.
    this.ourdata$ = this.apiService.fetchPredictedNames()
  }

  // Filter our names in the search bar.
  public filterData(allData) {
    if (this.name.value === '') {
      return allData
    } else {
      return allData.filter(data => {
        return data.name.toLowerCase().indexOf(this.name.value.toLowerCase()) !== -1;
      })
    }
  }

  // Populate the src in the img tag to display scientist's pitcher.
  public makeImagePath(name: string) {
    return '../../assets/images/' + name +'.jpg'
  }

  // Conver the country code to full name of the Country.
  public getCountry(code) {
    return CountryEnum[code];
  }
}
