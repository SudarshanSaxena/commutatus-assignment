import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  allData: any;
  relevantData = {
    title: '', author: '', status: '', label: '', url: ''
  };
  dataArray = [];
  dataObervable = new Observable();

  dataChanges = new Subject();

  constructor(private http: HttpClient) { }

  fetchRepoIssues() {
    this.dataObervable = this.http.get('https://api.github.com/repos/angular/angular/issues');
    return this.dataObervable;
    // this.http.get('https://api.github.com/repos/angular/angular/issues')
    //   .subscribe(data => {
    //     this.allData = data;
    //     this.allData.forEach(item => {
    //       const obj = {
    //         title: item.title,
    //         author: item.user.login,
    //         status: item.state,
    //         label: item.label,
    //         url: item.url
    //       }
    //       this.dataArray.push(obj);
    //     });
    //   });
    // return this.dataArray;
  }
}
