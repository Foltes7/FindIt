import { Component, OnInit } from '@angular/core';
import { UnsplashService } from 'src/app/shared/unsplash.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: any;
  constructor(private unsplash: UnsplashService) { }

  ngOnInit(): void {
    this.user = 'https://images.unsplash.com/photo-1602084115866-60d8e9d179d2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE3MjA4OX0';
    // this.unsplash.getProfile().subscribe(x => this.user = x.user);
  }

}
