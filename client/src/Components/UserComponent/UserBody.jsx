import React, { useEffect, useState } from 'react';
import '../../assets/UserCSS/body.css'
import axios from 'axios';
import { BACKEND_URL } from '../../Util/Config';
import Swal from 'sweetalert2';
import { data } from 'autoprefixer';

function UserBody() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({})

  function imageHandler(e) {
    setImage([...e.currentTarget.files][0]);
  }

 useEffect(() => {

  async function fethcUserData() {
    const userJWT = localStorage.getItem("userJWT");
    const response = await axios.post(`${BACKEND_URL}/user/fetchUserData`, {
      userJWT
    })

    if(response.data.success){
      setUserData(response.data.userData)
      // setImage(data)
      console.log('***** ', response.data.userData)
    }
  }
  fethcUserData();

 }, []);

 async function uploadImage(event) {
  event.preventDefault(); // Fix typo: 'preventDefault'
  setLoading(true); // Set loading state to true

  const formData = new FormData(); // Use the event correctly
  formData.append("image", image)

  const userJWT = localStorage.getItem("userJWT");

  if (userJWT) formData.append("userJWT", userJWT); // Append JWT to form data

  try {
    const response = await axios.post(`${BACKEND_URL}/user/uploadImage`, formData); // Send the image to the server

    // console.log(response);
    if (response.data.success) {
      setLoading(false); // Reset loading state
      setUserData(response.data.userData);
      // Show success alert
      Swal.fire({
        icon: 'success',
        title: 'Image Uploaded!',
        text: 'Your image has been uploaded successfully.',
        confirmButtonText: 'Okay'
      });
    } else {
      setLoading(false);
      // Show error alert if upload was not successful
      Swal.fire({
        icon: 'error',
        title: 'Upload Failed',
        text: 'There was a problem uploading your image. Please try again.',
        confirmButtonText: 'Okay'
      });
    }
  } catch (error) {
    setLoading(false); // Reset loading state on error
    console.error('Upload error:', error);
    // Show error alert for any network or server errors
    Swal.fire({
      icon: 'error',
      title: 'Upload Failed',
      text: 'There was an error uploading your image. Please check your network connection and try again.',
      confirmButtonText: 'Okay'
    });
  }
}

  return (
    <div className="user-body">
      <div className="profile-card">
        <div className="p-10 h-[85%] md:w-[45%] w-[90%]">
          <form onSubmit={uploadImage} encType="multipart/form-data">
            <img
              width="400px"
              height="400px"
              src={ image? URL.createObjectURL(image) : userData?.image ? `${BACKEND_URL}/images/${userData?.image}` : `${BACKEND_URL}/images/default.jpg` }
              className="profile-image"
              alt="Profile"
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => imageHandler(e)} // Set the image to state
            />
            <button
              type="submit"
              className="p-2 bg-fuchsia-700 text-white font-bold my-2 rounded"
            >
              {loading ? 'Uploading...' : 'Upload Image'}
            </button>
          </form>
        </div>
        <h2 className="user-name">{userData.username}</h2>
        <p className="user-email">Email: {userData.email}</p>
        <p className="user-phone">Phone: {userData.phone}</p>
      </div>
    </div>
  );
}

export default UserBody;
