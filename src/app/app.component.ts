import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { GithubService } from './github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'commutatus-assignment';

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['title', 'state', 'author', 'label', 'url'];
  labelData = new MatTableDataSource<any>();
  alldata = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSubscription = new Subscription();

  constructor(private githubService: GithubService, private fb: FormBuilder) { }

  issueForm = this.fb.group({
    username: [''],
    repo: ['']
  })

  ngOnInit() {
    this.dataSubscription = this.githubService.fetchRepoIssues().subscribe(data => {
      this.dataSource.data = data as Array<any>[];
      console.log(data);
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getSpecificIssues() {
    let user = this.issueForm.get('username').value;
    let repo = this.issueForm.get('repo').value;
    console.log(user, repo);
    this.githubService.fetchRepoIssues(user, repo).subscribe(data => {
      this.dataSource.data = data as Array<any>[];
      console.log(data);
    })
  }
}
