import { Component, OnInit, ViewChild } from '@angular/core';
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

  constructor(private githubService: GithubService) { }

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
}
