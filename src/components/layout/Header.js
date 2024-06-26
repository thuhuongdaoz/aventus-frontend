import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'antd';
import { useData } from '../../DataContext';
import axios from 'axios';
import './header.css'


export default function Header() {
  const { user } = useData()

  // const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const role = localStorage.getItem("role")
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   const headers = {
  //     Authorization: `Bearer ${token}`,
  //   };

  //   axios.get('http://localhost:8080/users/myInfo', { headers })
  //     .then(response => {
  //       setUser(response.data)

  //     })
  //     .catch(error => {
  //       console.error('Error fetching myInfo:', error);
  //     });
  // }, []);
  const logout = () => {
    localStorage.removeItem('token'); // Remove the token
    navigate('/login'); // Redirect to login page
  }
  const adminItems = [
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
    // {
    //   key: '3',
    //   label: (
    //     <Link to="/">
    //       Quản lý người dùng
    //     </Link>
    //   ),
    // },
    {
      key: '4',
      label: (
        <div onClick={logout}>
          Đăng xuất
        </div>
      ),
    },


  ];
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
    // {
    //   key: '3',
    //   label: (
    //     <Link to="/">
    //       Tìm kiếm việc làm
    //     </Link>
    //   ),
    // },
    // {
    //   key: '4',
    //   label: (
    //     <Link to="/deepsearchjob">
    //       Trợ giúp tìm kiếm
    //     </Link>
    //   ),
    // },
    {
      key: '5',
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
    // {
    //   key: '3',
    //   label: (
    //     <Link to="/listJob">
    //       Quản lý việc làm
    //     </Link>
    //   ),
    // },
    // {
    //   key: '4',
    //   label: (
    //     <Link to="/">
    //       Đánh giá ứng viên
    //     </Link>
    //   ),
    // },
    // {
    //   key: '5',
    //   label: (
    //     <Link to="/deepsearchapplication">
    //       Trợ giúp đánh giá
    //     </Link>
    //   ),
    // },
    {
      key: '6',
      label: (
        <div onClick={logout}>
          Đăng xuất
        </div>
      ),
    },

  ];



  return (
    <div className='header'>
      <div className='flex items-center'>
        <Link className='left-header logo' to="/">Aventus</Link>
        {
          role == 'ADMIN' ? (<Link className='left-header header-item' to="/"> Quản lý người dùng</Link>)
            : (role == 'CANDIDATE' ?
              (
                <>
                  <Link className='left-header header-item' to="/ ">Tìm kiếm việc làm</Link>
                  <Link className='left-header header-item' to="/deepsearchjob">Trợ giúp tìm kiếm</Link>
                </>

              ) : (
                <>
                  <Link className='left-header header-item' to="/listJob">Quản lý việc làm</Link>
                  <Link className='left-header header-item' to="/">Đánh giá ứng viên</Link>
                  <Link className='left-header header-item' to="/deepsearchapplication">Trợ giúp đánh giá</Link>
                </>
              ))
        }
      </div>

      <Dropdown
        menu={{
          items: role == 'ADMIN' ? adminItems : (role == 'CANDIDATE' ? candidateItems : employerItems),
        }}
        placement="bottomRight"
      >
        <div className='right-header'>
          <img className="avatar" src={user ? (user.avatar ? "http://localhost:8080" + user.avatar : "https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png") : "https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png"} />
          <div>{user ? user.name : 'Loading data...'}</div>
        </div>
      </Dropdown>

    </div>
  )
}
