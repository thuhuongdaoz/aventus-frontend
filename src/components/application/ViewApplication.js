import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import {
    Button, Form, Card,
    notification
} from 'antd';

import axios from 'axios';
import './view-application.css'
export default function ViewApplication() {
    const [application, setApplication] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        loadApplication()
    },[])
    const loadApplication = async () => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const result = await axios.get(`http://localhost:8080/applies/${id}`, { headers });
        // console.log(result.data)
        setApplication(result.data);

    };
    const changeStatus = async (status) => {
        try {
          const token = localStorage.getItem('token');
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          const response = await axios.post(`http://localhost:8080/applies/${id}/changeStatus`, { status }, { headers });
          notification.success({
            message: 'Cập nhật trạng thái thành công',
          });
          setApplication({...application, status})
    
        //   navigate("/listjob")
        } catch (error) {
          if (error.response) {
            // Server responded with a status code other than 2xx
            console.log(`Error: ${error.response.data}`)
            // setErrorMessage(`Error: ${error.response.data}`);
          }
        }
      };
    return (
        <div className='view-application hu-mt-60 p-4 flex justify-center items-center' >
            <Card title="Hồ sơ ứng viên" headStyle={{ fontSize: '32px' }}>
            <div className='info'>
                    <div className='flex gap-10 mb-5'>
                        <div className='label text-right '>Họ tên: </div>
                        <div className='value'>{application?.name}</div>
                    </div>
                    <div className='flex gap-10 mb-5'>
                        <div className='label text-right'>Email: </div>
                        <div className='value'>{application?.candidate.email}</div>
                    </div>
                    <div className='flex gap-10 mb-5'>
                        <div className='label text-right'>Số điện thoại: </div>
                        <div className='value'>{application?.phoneNumber}</div>
                    </div>
                    <div className='flex gap-10 mb-5'>
                        <div className='label text-right'>Chuyên ngành: </div>
                        <div className='value'>{application?.major.name}</div>
                    </div>
                    <div className='flex gap-10 mb-5'>
                        <div className='label text-right'>Bằng cấp: </div>
                        <div className='value'>{application?.degree.name}</div>
                    </div>
                    <div className='flex gap-10 mb-5'>
                        <div className='label text-right'>Kinh nghiệm: </div>
                        <div className='value'>{(application?.experience == 0 ? 'Không có kinh nghiệm' : application?.experience + ' năm') + ' kinh nghiệm'}</div>
                    </div>
                    <div className='flex gap-10 mb-5'>
                        <div className='label text-right'>Trình độ Tiếng Anh: </div>
                        <div className='value'>{application?.englishLevel.name}</div>
                    </div>
                    <div className='flex gap-10 mb-5'>
                        <div className='label text-right'>Trạng thái: </div>
                        <div className='value'>{application?.status == 1 ? 'Chờ duyệt' : (application?.status == 2 ? 'Đã chấp nhận' : 'Đã từ chối')}</div>
                    </div>

                    <div className='flex gap-10 mb-5'>
                        <div className='label text-right'></div>
                        <div className='value'>
                            {/* <a href={'http://localhost:8080' + application?.resume} target='_blank'>Xem CV</a> */}
                            {/* <Button className='btn-view-cv pa-0' size="large" type="link" onClick={() => window.open(application?.resume, '_blank')} size='large'>
                                Xem CV
                            </Button> */}
                            <a href={'http://localhost:8080' + application?.resume} target='_blank'>
                                <Button className='btn-view-cv pa-0' size="large" type="link" >
                                Xem CV
                            </Button></a>
                            
                        </div>
                    </div>
                </div>
                {application?.status == 1 &&
                    <div className='flex justify-end gap-10'>
                        <Button size='large' type="primary" onClick={() => changeStatus(2)}>Chấp nhận</Button>
                        <Button size='large' onClick={() => changeStatus(3)}>Từ chối</Button>

                    </div>}

            </Card>




        </div>
    )
}
