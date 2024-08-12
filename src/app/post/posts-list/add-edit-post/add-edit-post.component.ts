import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { addPost, updatePost } from '../../state/posts.action';
import { Post } from '../../models/post';
import { ActivatedRoute } from '@angular/router';
import { getPostById } from '../../state/posts.selector';

export const enum URL {
  ADD_POST = 'add-post',
  EDIT_POST = 'edit-post'
}

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-edit-post.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditPostComponent {
  public updatePost = this.route.snapshot.url[0].path;
  public editPost = URL.EDIT_POST;
  public currentName = (this.updatePost === URL.ADD_POST) ? 'Add Post' : 'Update Post';
  public postForm: FormGroup = new FormGroup({
    id: new FormControl('', []),
    title: new FormControl('', [
      Validators.required, 
      Validators.minLength(6)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ])
  });
  public displaysErrors = '';
  
  constructor(
    private store: Store<AppState>,
    private route:ActivatedRoute = inject(ActivatedRoute)
  ) {}

  public ngOnInit(): void {
    if (this.updatePost === URL.EDIT_POST) {
      this.route.data.subscribe((params) => {
        const idPost = params['postId'] ?? '';
        this.store.select(getPostById({ id: idPost })).subscribe((data) => {
          this.postForm.setValue({
            description: data?.description || '', 
            id: data?.id ?? undefined, 
            title: data?.title || ''
          });
        })
      });
    }
  }
  get f() {
    return this.postForm?.controls;
  }

  public insertUpPost(form: FormGroup) {
    const { title, description, id } = form.value;
    const post: Post = { id, title, description };

    if (this.updatePost === URL.ADD_POST && form.valid) {
      console.log('je te call add-post');
      this.store.dispatch(addPost({ post }));
      this.postForm.reset();
      return;
    }
    if (this.updatePost === URL.EDIT_POST && form.valid) {
      console.log('je te call edit-post');
      this.store.dispatch(updatePost({ post }));
      this.postForm.reset();
      return;      
    }
    return;
  }

  public showErrors (field?: string, minLength?: number): string {
    if (field || minLength) {
      const fieldForm = this.postForm.get(field!);
  
      if ((fieldForm?.touched || fieldForm?.dirty) && fieldForm?.errors) {
        if (fieldForm.errors?.['required']) {
          return this.displaysErrors = `The ${field} is required`;
        }
  
        if (fieldForm.errors?.['minlength']) {
          return this.displaysErrors = `The ${field} should be of minimum ${minLength} characters length`;
        }
      }      
    }
  
    return this.displaysErrors = '';
  }

}
