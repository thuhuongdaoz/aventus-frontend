import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'antd';
import axios from 'axios';
import './header.css'


export default function Header() {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const role = localStorage.getItem("role")
  useEffect(() => {
    // setToken(localStorage.getItem('token'));
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    // Fetch provinces data when component mounts
    axios.get('http://localhost:8080/users/myInfo', { headers })
      .then(response => {
        setUser(response.data)

      })
      .catch(error => {
        console.error('Error fetching myInfo:', error);
      });
  }, []);
  const logout = () => {
    localStorage.removeItem('token'); // Remove the token
    navigate('/login'); // Redirect to login page
  }
  const candidateItems = [
    {
      key: '1',
      label: (
        <Link to="/profile">
          Thông tin cá nhân
        </Link>

      ),
    },
    {
      key: '2',
      label: (
        <Link to="/change-password">
          Đổi mật khẩu
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <div onClick={logout}>
          Đăng xuất
        </div>
      ),
    },

  ];
  const employerItems = [
    {
      key: '1',
      label: (
        <Link to="/profile">
          Thông tin cá nhân
        </Link>

      ),
    },
    {
      key: '2',
      label: (
        <Link to="/change-password">
          Đổi mật khẩu
        </Link>

      ),
    },
    {
      key: '3',
      label: (
        <Link to="/listJob">
          Quản lý việc làm
        </Link>
      ),
    },
    {
      key: '4',
      label: (
        <div onClick={logout}>
          Đăng xuất
        </div>
      ),
    },

  ];



  return (
    <div className='header'>
      {/* <div className='left-header'>Aventus</div> */}
      <Link className='left-header' to="/ ">Aventus</Link>
      <Dropdown
        menu={{
          items: role == 'CANDIDATE' ? candidateItems : employerItems,
        }}
        placement="bottomRight"
      >
        <div className='right-header'>
          <img className="avatar" src={user ? (user.avatar ? "http://localhost:8080" + user.avatar : "https://media.vneconomy.vn/images/upload/2021/04/21/1-1604555533642683459571-1604566620108397274357.png") : "https://media.vneconomy.vn/images/upload/2021/04/21/1-1604555533642683459571-1604566620108397274357.png"} />
          <div>{user ? user.name : 'Loading data...'}</div>
        </div>
      </Dropdown>

    </div>
  )
}
