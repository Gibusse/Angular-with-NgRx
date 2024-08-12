import { counterReducer } from "../counter/state/counter.reducer";
import { CounterState } from "../counter/state/counter.state";
import { PostsState } from "../post/state/post.state";
import { postsReducer } from "../post/state/posts.reducer";

export interface AppState {
    counter: CounterState,
    posts: PostsState
}

export const appReducer =  {
    counter: counterReducer,
    posts: postsReducer
}