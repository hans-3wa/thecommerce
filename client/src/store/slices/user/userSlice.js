import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

export const fetchUser = createAsyncThunk(
    'user/auth',
    async () => {
        const response = await fetch('/user')
        return await response.json()
    }
)

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        email: "",
        isAdmin: false,
        isLogged: false
    },
    reducers: {
        addUser: (state, action) => {
            return {
                ...state,
                email: action.payload.user.email,
                isAdmin: action.payload.user.isAdmin,
                isLogged: true

            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            return {
                ...state
            }
        })
        builder.addCase(fetchUser.rejected, (state, action) => {
            return {
                ...state,
                error: {message: "an error occured", status: 500}
            }
        })
    },
})

export const {addUser} = userSlice.actions

export default userSlice.reducer