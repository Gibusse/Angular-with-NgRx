import { Action, createReducer, on } from "@ngrx/store";
import { initialStatePosts, PostsState } from "./post.state";
import { addPost, deletePost, posts, updatePost } from "./posts.action";
import { Post } from "../models/post";

const _postsReducer = createReducer(
    initialStatePosts,
    on(posts, state => state),
    on(addPost, (state, action) => {
        const post = { ...action.post };
        post.id = (state.posts.length + 1);

        return {
            ...state,
            posts: [...state.posts, post]
        }
    }),
    on(updatePost, (state, action) => {
        const updatePosts = state.posts.map(post => {
            return action.post.id === post.id ? action.post : post;
        })

        return {
            ...state,
            posts: updatePosts
        }
    }),
    on(deletePost, (state, { id }) => {
        const posts = state.posts.filter((post: Post) => post?.id !== id);
        return {
            ...state,
            posts: posts
        }
    })
);

export function postsReducer(state: PostsState, action: Action<string>) {
    return _postsReducer(state, action);
}