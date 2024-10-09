import { createSlice } from "@reduxjs/toolkit";

const userJWT = localStorage.getItem('userJWT')
let isValid = false

if(userJWT){
    isValid = true
}

const initialState = {
    userLogged: isValid || false
}
console.log(`**** userSlice *****`)
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state) => {
            state.userLogged = true
        },
        logoutUser: (state) => {
            state.userLogged = false
        }
    }
})

export const { loginUser, logoutUser } = userSlice.actions

export default userSlice.reducer
