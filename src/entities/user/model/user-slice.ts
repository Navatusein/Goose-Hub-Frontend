import {IUser} from "@/entities/user";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface State {
  user?: IUser
}

const initialState: State = {
  user: undefined
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = undefined;
    }
  }
})

export const {setUser, logout} = userSlice.actions;
export default userSlice.reducer;