import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Button, Select, Input, InputNumber, Table, Space, Popover } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Header from '../layout/Header'
import axios from 'axios';

const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const handleChange = (value) => {
    console.log(`selected ${value}`);
};



export default function ListUser() {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [roleName, setRoleName] = useState("ALL");
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [userStatus, setUserStatus] = useState(-1);
    const statuses = [
        {
            value: -1,
            label: "Tất cả trạng thái"
        }
        ,
        {
            value: 0,
            label: "Active"
        },
        {
            value: 1,
            label: "Lock"
        }
    ]
    useEffect(() => {
        axios.get('http://localhost:8080/roles')
            .then(response => {
                response.data.shift()
                response.data.unshift({
                    name: "ALL",
                    description: "Tất cả vai trò"
                })
                setRoles(response.data);
            })
            .catch(error => {
                console.error('Error fetching careers:', error);
            });


        axios.get('http://localhost:8080/users', {
            
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then(response => {
                console.log(response.data)
                setUsers(response.data)
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });

    }, []);
    const onChangeName = (e) => {
        // console.log(e.target.value)
        setName(e.target.value)
    };
    const onChangeEmail = (e) => {
        // console.log(e.target.value)
        setEmail(e.target.value)
    };
    const onChangeRole = (value) => {
        // console.log(`selected ${value}`);
        setRoleName(value)
    };
    const onChangePhoneNumber = (value) => {
        setPhoneNumber(value)
    };
    const onChangeUserStatus = (value) => {
        setUserStatus(value)
    };
    
    const search = async () => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const params = {

        };

        if (name) params.name = name;
        if (email) params.email = email
        if (roleName != 'ALL') params.roleName = roleName
        if (phoneNumber) params.phoneNumber = phoneNumber;
        if (userStatus != -1) params.userStatus = userStatus
        const response = await axios.get(`http://localhost:8080/users`, {
            params,
            headers
        });
        // console.log('search job response:', response.data);
        setUsers(response.data)

    };
    const changeUserStatus = async (id) => {
        console.log(id)
        const token = localStorage.getItem('token');
        await axios.post(`http://localhost:8080/users/${id}/changeStatus`,null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        search();
    };
    const columns = [
        {
            title: 'Họ tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth',

        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => changeUserStatus(record.id)}>{record.status == 'Active' ? 'Lock' : 'Unlock'}</Button>
                </Space>
            ),
        },


    ];
    
    return (

        <div className='list-job'>
            <h1 className='list-job-title'>Danh sách người dùng</h1>
            <div className='add-job-row'>
                {/* <Link to="/addjob">
          <Button type="primary" size='large'>Thêm việc làm</Button>
        </Link> */}

            </div>
            <div className='filter'>
                <Input className='filter-item search-name' prefix={<SearchOutlined />} placeholder="Họ tên" defaultValue={name} onChange={onChangeName} />
                <Input className='filter-item search-name' prefix={<SearchOutlined />} placeholder="Email" defaultValue={email} onChange={onChangeEmail} />
                <Select className='filter-item'
                    defaultValue={roleName}
                    onChange={onChangeRole}
                    options={roles.map(role => ({
                        value: role.name,
                        label: role.description
                    }))}
                />
                <Input className='filter-item search-name' prefix={<SearchOutlined />} placeholder="Số điện thoại" defaultValue={phoneNumber} onChange={onChangePhoneNumber} />
                <Select className='filter-item'
                    defaultValue={userStatus}
                    onChange={onChangeUserStatus}
                    options={statuses}
                />

                <Button type="primary" onClick={search}>Tìm kiếm</Button>
            </div>
            <div className='job-table'>
                <Table columns={columns} dataSource={
                    users.filter(user => user.role.name != 'ADMIN').map(user => ({
                        key: user.id,
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role.description,
                        dateOfBirth: user.dateOfBirth,
                        phoneNumber: user.phoneNumber,
                        status: user.status == 0 ? 'Active' : 'Lock',
                    }))
                    // data
                } />
            </div>
        </div>


    )
}
