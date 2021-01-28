import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { map, startWith, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TextSearchStateService } from 'src/app/components/dashboard/services/textsearch.service';

@Component({
  selector: 'app-data-search',
  templateUrl: './data-search.component.html',
  styleUrls: ['./data-search.component.css']
})
export class DataSearchComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput') input: ElementRef;
  private searchSubscription: Subscription;
  constructor(private textSearchStateService: TextSearchStateService) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    const search$ = fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map(event => event.target.value),
        startWith(''),
        debounceTime(200),
        distinctUntilChanged()
      )

    this.searchSubscription = search$.subscribe((str: string) => {
      this.textSearchStateService.setTextSearchState(str.toLowerCase());
    });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }
}
