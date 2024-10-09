import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginAdmin, logoutAdmin } from '../Components/Redux/adminSlice'
import axios from 'axios'
import { BACKEND_URL } from './Config'

function verifyAdminJWT() {

    const dispatch = useDispatch()

    const adminJWT = localStorage.getItem("adminJWT")

    useEffect(() => {
        if(!adminJWT) { 
            dispatch(logoutAdmin())
            return;
            }

            async function verifyAmin() {
                try {
                    const response = await axios.post(`${BACKEND_URL}/admin/verifyAdmin`, {
                        adminJWT
                    })
                    if(response.data.success) dispatch(loginAdmin());
                } catch (error) {
                    dispatch(logoutAdmin());
                }
            }
            verifyAmin()
    }, [])

    return useSelector((store) => store.admin.adminLogged);
}

export default verifyAdminJWT
