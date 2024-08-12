import { Post } from "../models/post";

// export type PostsState = posts<Post[]>;
export interface PostsState {
    posts: Post[];
}

export const initialStatePosts: PostsState = {
    posts: [
        { id: 1, title: 'Post 1', description: 'This is post #1'},
        { id: 2, title: 'Post 2', description: 'This is post #2'}
    ]
};