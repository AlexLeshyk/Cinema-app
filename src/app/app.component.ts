import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cinema-app';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://www.themoviedb.org/discover/movie?sort_by=popularity.desc')
      .subscribe( response => {
        console.log('Response', response)
      })
  }
}
