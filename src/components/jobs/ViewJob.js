import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Tag, Button } from 'antd';
import { DollarOutlined, UnorderedListOutlined, BookOutlined, HourglassOutlined, EnvironmentOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import './view-job.css'

export default function ViewJob() {
  const [job, setJob] = useState(null);
  const { id } = useParams();
  useEffect(() => {

    loadJob()
  }, []);
  const loadJob = async () => {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const result = await axios.get(`http://localhost:8080/jobs/${id}`, { headers });
    // console.log(result.data)
    setJob(result.data);
  };
  return (
    <div className='view-job mt-60 py-11 flex gap-12'>
      <div className='left-side flex flex-col gap-12'>
        <div className='job-title px-6 py-5 flex flex-col gap-8'>
          <h1 className='job-name my-0 font-bold '>{job?.name}</h1>
          <div className='flex items-center'>
            <div className='job-info-item flex items-center gap-8'>
              <UnorderedListOutlined className='job-info-icon' />
              <div className='flex flex-col gap-1'>
                <div className='job-field'>Ngành nghề</div>
                <div className='job-value'>{job?.career.name}</div>
              </div>
            </div>
            <div className='job-info-item flex items-center gap-8'>
              <BookOutlined className='job-info-icon' />
              <div className='flex flex-col gap-1'>
                <div className='job-field'>Bằng cấp</div>
                <div className='job-value'>{job?.degree.name}</div>
              </div>
            </div>
            <div className='job-info-item flex items-center gap-8'>
              <HourglassOutlined className='job-info-icon' />
              <div className='flex flex-col gap-1'>
                <div className='job-field'>Kinh nghiệm</div>
                <div className='job-value'>{job?.experience} năm</div>
              </div>
            </div>
          </div>
          <div className='flex items-center job-info-2'>
            <div className='job-info-item flex items-center gap-8'>
              <DollarOutlined className='job-info-icon' />
              <div className='flex flex-col gap-1'>
                <div className='job-field'>Mức lương</div>
                <div className='job-value'>{job?.minOffer} - {job?.maxOffer} triệu</div>
              </div>
            </div>

            <div className='job-info-item flex items-center gap-8'>
              <EnvironmentOutlined className='job-info-icon' />
              <div className='flex flex-col gap-1'>
                <div className='job-field'>Địa điểm</div>
                <div className='job-value'>{job?.ward.district.province.name}</div>
              </div>
            </div>
          </div>
          <div className='flex items-center gap-9'>
            <Tag style={{ fontSize: '14px' }} icon={<UserOutlined />} color="cyan" >Số lượng tuyển: {job?.quantity} người</Tag>
            <Tag style={{ fontSize: '14px' }} icon={<ClockCircleOutlined />} color="cyan" >Hạn nộp hồ sơ: {job?.deadline}</Tag>
          </div>
          <div>
            <Button className="w-full" type="primary">Ứng tuyển ngay</Button>
          </div>

        </div>
        <div className='job-detail px-6 py-7 flex flex-col gap-10'>
          <div >
            <h2 className='job-detail-title'>Chi tiết tin tuyển dụng</h2>
          </div>
          <div className='flex flex-col gap-4'>
            <div className='job-criteria-title'>Mô tả công việc</div>
            <div className='pl-10 job-criteria-value'>{job?.description}</div>
          </div>
          <div className='flex flex-col gap-4'>
            <div className='job-criteria-title'>Yêu cầu ứng viên</div>
            <div className='pl-10 job-criteria-value'>{job?.requirement}</div>
          </div>
          <div className='flex flex-col gap-4'>
            <div className='job-criteria-title'>Quyền lợi</div>
            <div className='pl-10 job-criteria-value'>{job?.benefit}</div>

          </div>
          <div className='flex flex-col gap-4'>
            <div className='job-criteria-title'>Địa điểm làm việc</div>
            <div className='pl-10 job-criteria-value'>{job?.address}, {job?.ward.full_name}, {job?.ward.district.full_name}, {job?.ward.district.province.full_name}</div>
          </div>
        </div>
      </div>
      <div className='right-side'>
        <div className='company-info pa-5 flex flex-col '>
          <div className='flex gap-8 mb-3 items-center'>
            {job?.employer.pictiure ? (<img className='company-image' src={"http://localhost:8080" + job?.employer.pictiure} />) : (<img className='company-image' src="https://www.shutterstock.com/image-vector/building-icon-260nw-377768164.jpg" />)

            }

            <div className='company-name'>{job?.employer.companyName}</div>
          </div>
          <div className='flex gap-8 items-center'>
            <div className='company-location text-center'>
              Địa điểm
            </div>
            <div className='company-location-value'>
            {job?.employer.address}, {job?.employer.ward.full_name}, {job?.employer.ward.district.full_name}, {job?.employer.ward.district.province.full_name}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
