import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from '../../shared/posts.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../shared/interfaces';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  post: Post;
  submitted = false;
  updateSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getById(params['id'])
      })
    ).subscribe( (post: Post) => {
      this.post = post;
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required)
      })
    });
  }

  ngOnDestroy() {
    if (this.updateSub) {
      this.updateSub.unsubscribe();
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    this.postsService.update({
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title
    }).subscribe(() => {
      this.submitted = false;
    })
  }

}
