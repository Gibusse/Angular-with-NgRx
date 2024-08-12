import { Action, createReducer, on } from "@ngrx/store";
import { CounterState, initialState } from "./counter.state";
import { changeChannelName, customIncrement, decrement, increment, reset } from "./counter.action";

const _counterReducer = createReducer<CounterState, Action<string>>(
    initialState,
    on(increment, (state) => ({ ...state, counter: state.counter + 1 })),
    on(decrement, (state) => ({ ...state, counter: !state.counter ? 0 : state.counter - 1})),
    on(reset, (state) => ({ ...state, counter: 0})),
    on(customIncrement, (state, action) => ({ ...state, counter: state.counter + action.value })),
    on(changeChannelName, (state, action) => ({ ...state, channelName: action.channelName }))
)
export function counterReducer(state: CounterState, action: Action<string>) {
    return _counterReducer(state, action);
}