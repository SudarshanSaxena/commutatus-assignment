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

  fetchRepoIssues(user = 'angular', repo = 'angular') {
    this.dataObervable = this.http.get(`https://api.github.com/repos/${user}/${repo}/issues`);
    return this.dataObervable;
  }
}
