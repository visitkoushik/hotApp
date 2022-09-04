import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FILTER_BY } from 'src/model/util';

@Component({
  selector: 'app-report-tab',
  templateUrl: './report-tab.page.html',
  styleUrls: ['./report-tab.page.scss'],
})
export class ReportTabPage implements OnInit {
  private queryP: any;

  constructor(private activeRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((p) => {
      debugger;
      if(p.filterDateBy)
      {this.queryP = p;}
      this.onOpenItem('showreports');
    });
  }

  onOpenItem = (param: string) => {
    this.router.navigate([`${param}`], {
      relativeTo: this.activeRoute,
      queryParams: this.queryP,
    });
  };
}
