import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiSerivce {
  constructor(private http: HttpClient) {}
  
  public fetchPredictedNames(): Observable<any> {
    var headers = {headers: {'Content-Type': 'application/json' }}
    const url = "https://api.nationalize.io?name[]=albert&name[]=isaac&name[]=marie&name[]=galileo&name[]=charles&name[]=nikola&name[]=rosalind&name[]=louis&name[]=michael&name[]=stephen";
    return new Observable((observable) => {
        this.http.get<any>(url, headers).subscribe((data) => {
          observable.next(data);
          observable.complete()
        }, error => {
          observable.complete();
        });
      }
    )
  }
}
