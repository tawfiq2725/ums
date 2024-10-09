import { createSlice } from "@reduxjs/toolkit";

const adminJWT = localStorage.getItem('adminJWT')
let isValid = false

if(adminJWT){
    isValid = true
}

const initialState = {
    adminLogged: isValid  || false
}
console.log(`**** adminSlice *****`)
export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        loginAdmin: (state) => {
            state.adminLogged = true
        },

        logoutAdmin: (state) => {
            state.adminLogged = false
        }
    }
})

export const { loginAdmin, logoutAdmin } = adminSlice.actions
export default adminSlice.reducer