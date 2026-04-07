import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface User {
    id: number,
    name: string
}

interface UserState {
    users: User[]
}

const initialState: UserState = {
    users: []
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload)
        },
        removeUser: (state, action: PayloadAction<number>) => {
            state.users = state.users.filter(user => user.id !== action.payload)
        }
    }
})

export const {addUser, removeUser} = userSlice.actions
export default userSlice.reducer