import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser } from "../Components/Redux/userSlice";
import axios from "axios";
import { BACKEND_URL } from "./Config";

export function verifyUserJWT() {
  console.log(`**** VerifUseryJWT *****`)
  const dispatch = useDispatch();

  const userJwt = localStorage.getItem("userJWT");

  useEffect(() => {
    if (!userJwt) {
      dispatch(logoutUser());
      return;
    }

    async function verifyUser() {
      try {
        const response = await axios.post(`${BACKEND_URL}/user/verifyUser`, {
          userJwt,
        });

        if (response.data.success) {
          dispatch(loginUser())
        }
      } catch (error) {
        console.log('Error from verifyUserJWT', error.message);
        dispatch(logoutUser());
      }
    }

    verifyUser();
  }, []);

  return useSelector((store) => store.user.userLogged);
}
