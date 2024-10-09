import React, { useEffect, useState } from 'react';
import '../../assets/AdminCSS/dashboard.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../Util/Config';
import Swal from 'sweetalert2';

function DashboardBody() {

  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminJWT = localStorage.getItem("adminJWT")

        const response = await axios.post(`${BACKEND_URL}/admin/getdashboardData`,
          JSON.stringify({adminJWT}),
          {
            headers: {
              'Content-Type': 'application/json'
            },
          }
        )

        if(response?.data?.success){
          setData(response.data.dashboardData.sort((a,b) => a.username > b.username ? 1 : -1))
        }
      } catch (error) {
        console.log(error.message)
      } finally {
        setLoading(false);
      }
    }

    fetchData()
  }, [])

  // deleting the user
  const deleteHandler = async (userId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
      });
  
      if (result.isConfirmed) {
        console.log('userId: ', userId)
        const response = await axios.delete(`${BACKEND_URL}/admin/delete?userId=${userId}`);
  
        if (response.data.success) {
          await Swal.fire(
            'Deleted!',
            'User has been deleted.',
            'success'
          );

          setData((prevData) => prevData.filter(user => user._id !== userId));
          
        } else {
          Swal.fire(
            'Error!',
            'Failed to delete the user.',
            'error'
          );
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire(
        'Error!',
        'Something went wrong. Please try again later.',
        'error'
      );
    }
  };

  return (
    <div className="dashboard-body">
      <button
        className="add-user-btn"
        onClick={() => navigate("/admin/addUser")}
      >
        Add User
      </button>
      <div className="user-list">
        {loading ? (
          <p>Loading...</p>
        ) : data && data.length > 0 ? (
          <table className="table-auto">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, i) => (
                <tr key={user._id} className="user-item">
                  <td>{i + 1}</td>
                  <td className="username">{user.username}</td>
                  <td className="user-email">{user.email}</td>
                  <td>{user.phone}</td>
                  <td className="user-actions">
                    <button
                      className="edit-btn"
                      onClick={() => navigate(`/admin/editUser`, { state: user })}
                    >
                      📝Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteHandler(user._id)}
                    >
                      🗑️Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
}

export default DashboardBody;
