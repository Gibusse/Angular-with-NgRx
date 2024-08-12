import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { getPosts } from '../state/posts.selector';
import { RouterLink, RouterOutlet } from '@angular/router';
import { deletePost } from '../state/posts.action';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss'
})
export class PostsListComponent {
  posts$: Observable<Post[]> = this.store.select(getPosts);

  constructor(private store: Store<AppState>) {}

  public onDeletePost(id: number) {
    if (confirm('Are you sure you want to delete')) {
      this.store.dispatch(deletePost({ id }));
    }
  }

}
