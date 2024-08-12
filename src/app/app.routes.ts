import { Routes } from '@angular/router';
import { postResolver } from './post/resolver/post.resolver';
import { Action, StoreModule } from '@ngrx/store';
import { importProvidersFrom } from '@angular/core';
import { postsReducer } from './post/state/posts.reducer';
import { counterReducer } from './counter/state/counter.reducer';
import { POST_STATE_NAME } from './post/state/posts.selector';
import { COUNTER_STATE_NAME } from './counter/state/counter.selector';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/home.component')
                        .then(c => c.HomeComponent)
    },
    {
        path: "counter",
        loadComponent: () => import('./counter/counter/counter.component')
                        .then(c => c.CounterComponent),
        providers: [
            importProvidersFrom([
                StoreModule.forFeature<unknown, Action<string>>(COUNTER_STATE_NAME, counterReducer)
            ])
            
        ],
    },
    {
        path: 'posts',
        loadComponent: () => import('./post/posts-list/posts-list.component')
                        .then(p => p.PostsListComponent),
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        providers: [
            importProvidersFrom([
                StoreModule.forFeature<unknown, Action<string>>(POST_STATE_NAME, postsReducer)
            ])
            
        ],
        children: [
            {
                path: 'add-post',
                loadComponent: () => import('./post/posts-list/add-edit-post/add-edit-post.component')
                                    .then(p => p.AddEditPostComponent)
            },
            {
                path: 'edit-post/:id',
                loadComponent: () => import('./post/posts-list/add-edit-post/add-edit-post.component')
                                    .then(p => p.AddEditPostComponent),
                resolve: {
                    postId: postResolver
                }
            }
        ]
    },
    {
        path: 'auth',
        loadComponent: () => import('./authentication/authentication.component')
                        .then(a => a.AuthenticationComponent),
        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            {
                path: 'login',
                loadComponent: () => import('./authentication/login/login.component')
                                .then(l => l.LoginComponent)
            },
            {
                path: 'signup',
                loadComponent: () => import('./authentication/signup/signup.component')
                                .then(s => s.SignupComponent)
            }
        ]
    }
];
