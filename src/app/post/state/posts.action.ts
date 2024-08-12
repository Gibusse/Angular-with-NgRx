import { createAction, props } from "@ngrx/store";
import { Post } from "../models/post";

export const posts = createAction('posts');
export const ADD_POST_ACTION = '[posts page] add post';
export const UPDATE_POST_ACTION = '[posts page] update post';
export const DELETE_POST_ACTION = '[posts page] delete post';
export const GET_POSTS_ACTION = '[posts page] get posts';
export const addPost = createAction(ADD_POST_ACTION, props<{ post: Post }>());
export const updatePost = createAction(UPDATE_POST_ACTION, props<{ post: Post }>());
export const deletePost = createAction(DELETE_POST_ACTION, props<{ id: number }>());
export const getPosts = createAction(GET_POSTS_ACTION, props<{ page: number }>());