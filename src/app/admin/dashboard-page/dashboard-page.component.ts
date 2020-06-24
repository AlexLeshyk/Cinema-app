import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from '../../shared/posts.service';
import { Post } from '../../shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts : Post[] = [];
  postSub: Subscription;
  deleteSub: Subscription;
  search = '';

  constructor(private postsService: PostsService ) { }

  ngOnInit() {
    this.postSub = this.postsService.getAll().subscribe( posts => {
      this.posts = posts;
    })
  }

  remove(id: string) {
    this.deleteSub = this.postsService.remove(id).subscribe( () => {
      this.posts = this.posts.filter(post => post.id !== id);
    });
  }

  ngOnDestroy() {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }

    if (this.deleteSub) {
      this.deleteSub.unsubscribe();
    }
  }
}
