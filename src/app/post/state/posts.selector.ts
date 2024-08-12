import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostsState } from "./post.state";

export const POST_STATE_NAME = 'posts';

const getPostsState = createFeatureSelector<PostsState>('posts');

export const getPosts = createSelector(getPostsState, state => state.posts.length ? state.posts : []);
export const getPostById = (props: { id: string}) =>
    createSelector(getPostsState, (state) => state.posts.find(post => post.id === +props.id));
