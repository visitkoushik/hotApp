import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  pageTitle:string="";
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,) {


    }
  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter(route => {return route.outlet === 'primary';}),
      mergeMap(route => route.data),
    ).subscribe((event) => {this.pageTitle=event?.title||""} );
  }
}
