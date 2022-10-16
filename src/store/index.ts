import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./user.slice";
import infoSlice from "./info.slice";
import authSlice from "./auth.slice";

const rootReucer = combineReducers({
  auth: authSlice,
  user: userSlice,
  info: infoSlice,
})

export const store = configureStore({
  reducer: rootReucer,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch