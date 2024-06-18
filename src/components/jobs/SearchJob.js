import React, { useState, useEffect, useRef  } from 'react'
import { Link } from "react-router-dom";
import { Button, Select, Input, InputNumber, Table, Space, Popover ,Tag,Pagination} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Header from '../layout/Header'
import axios from 'axios';
import './job.css'

const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const handleChange = (value) => {
  console.log(`selected ${value}`);
};



export default function SearchJob() {


  const [careers, setCareers] = useState([]);
  const [degrees, setDegrees] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [name, setName] = useState(null)
  const [careerId, setCareerId] = useState(0);
  const [degreeId, setDegreeId] = useState(0);
  const [experience, setExperience] = useState(null)
  const [openExperience, setOpenExperience] = useState(false);
  const [offer, setOffer] = useState(null)
  const [openOffer, setOpenOffer] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const listRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:8080/careers')
      .then(response => {
        response.data.unshift({
          id: 0,
          name: "Tất cả ngành nghề"
        })
        setCareers(response.data);
      })
      .catch(error => {
        console.error('Error fetching careers:', error);
      });

    axios.get('http://localhost:8080/degrees')
      .then(response => {
        response.data.unshift({
          id: 0,
          name: "Tất cả bằng cấp"
        })
        setDegrees(response.data);
      })
      .catch(error => {
        console.error('Error fetching degrees:', error);
      });

    axios.get('http://localhost:8080/degrees')
      .then(response => {
        response.data.unshift({
          id: 0,
          name: "Tất cả bằng cấp"
        })
        setDegrees(response.data);
      })
      .catch(error => {
        console.error('Error fetching degrees:', error);
      });

    // axios.get('http://localhost:8080/jobs', {
    //   params: {
    //     employerId: localStorage.getItem('userId')
    //   },
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem('token')}`,
    //   }
    // })
    //   .then(response => {
    //     console.log(response.data)
    //     setJobs(response.data)
    //   })
    //   .catch(error => {
    //     console.error('Error fetching jobs:', error);
    //   });
    search();

  }, []);
  useEffect(() => {
    if (listRef.current) {
        window.scrollTo({
            top: listRef.current.offsetTop - 80, // 100px offset from the top
            behavior: 'smooth'
          });
    }
  }, [currentPage]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
};
  const onChangeName = (e) => {
    // console.log(e.target.value)
    setName(e.target.value)
  };
  const onChangeCareer = (value) => {
    // console.log(`selected ${value}`);
    setCareerId(value)
  };
  const onChangeDegree = (value) => {
    // console.log(`selected ${value}`);
    setDegreeId(value)
  };
  const onChangeExperience = (value) => {
    // console.log(value)
    setExperience(value)
  };
  const onChangeOffer = (value) => {
    // console.log(value)
    setOffer(value)
  };
  const search = async () => {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const params = {

    };

    if (name) params.name = name;
    if (careerId) params.careerId = careerId
    if (degreeId) params.degreeId = degreeId
    if (experience != null) params.experience = experience;
    if (offer) params.offer = offer
    const response = await axios.get(`http://localhost:8080/jobs`, {
      params,
      headers
    });
    console.log('search job response:', response.data);
    setJobs(response.data)

  };
  const deleteJob = async (id) => {
    // console.log(id)
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:8080/jobs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    search();
  };
  const columns = [
    {
      title: 'Tên việc làm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tên công ty',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: 'Ngành nghề',
      dataIndex: 'career',
      key: 'career',
    },
    {
      title: 'Yêu cầu bằng cấp',
      dataIndex: 'degree',
      key: 'degree',
    },
    {
      title: 'Yêu cầu kinh nghiệm',
      dataIndex: 'experience',
      key: 'experience',

    },
    {
      title: 'Mức lương',
      dataIndex: 'offer',
      key: 'offer',
    },
    {
      title: 'Địa điểm',
      dataIndex: 'province',
      key: 'province',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        // <Space size="middle">
          <Link to={`/viewjob/${record.id}`}>Xem</Link>
        // </Space>
      ),
    },


  ];
  const hideExperience = () => {
    setOpenExperience(false);
  };
  const handleOpenExperienceChange = (newOpen) => {
    setOpenExperience(newOpen);
  };

  const hideOffer = () => {
    setOpenOffer(false);
  };
  const handleOpenOfferChange = (newOpen) => {
    setOpenOffer(newOpen);
  };
  return (

    <div className='list-job'>
      <h1 className='list-job-title'>Tìm kiếm việc làm</h1>
      <div className='add-job-row'>
        <Link to="/deepsearchjob">
          <Button type="primary" size='large'>Trợ giúp tìm kiếm</Button>
        </Link>
      </div>
      <div className='filter'>
        <Input className='filter-item search-name' prefix={<SearchOutlined />} placeholder="Tên việc làm" defaultValue={name} onChange={onChangeName} />
        <Select className='filter-item'
          showSearch
          placeholder="Chọn ngành nghề"
          optionFilterProp="children"
          filterOption={filterOption}
          onChange={onChangeCareer}
          options={
            careers.map(career => ({
              value: career.id,
              label: career.name
            }))
          }
          defaultValue={careerId}

        />
        <Select className='filter-item'
          defaultValue={degreeId}
          onChange={onChangeDegree}
          options={degrees.map(degree => ({
            value: degree.id,
            label: degree.name
          }))}
        />
        {/* <InputNumber className='filter-item' addonAfter="năm" placeholder='Yêu cầu kinh nghiệm' defaultValue={experience} onChange={onChangeExperience} /> */}
        <Popover className='filter-item' placement="bottomRight" content={
          <div className='popover-item'>
            <InputNumber addonAfter="năm" placeholder='Yêu cầu kinh nghiệm' defaultValue={experience} onChange={onChangeExperience} />
            <Button className='btn-close-popover' type='primary' onClick={hideExperience}>Đóng</Button>
          </div>
        } trigger="click" open={openExperience} onOpenChange={handleOpenExperienceChange}>
          <Button>{experience == null ? 'Tất cả kinh nghiệm' : (experience == 0 ? 'Không yêu cầu kinh nghiệm' : experience + " năm")}</Button>
        </Popover>

        <Popover className='filter-item' placement="bottomRight" content={
          <div className='popover-item'>
            <InputNumber addonAfter="triệu" placeholder='Mức lương' min={1} defaultValue={offer} onChange={onChangeOffer} />
            <Button className='btn-close-popover' type='primary' onClick={hideOffer}>Đóng</Button>
          </div>
        } trigger="click" open={openOffer} onOpenChange={handleOpenOfferChange}>
          <Button>
            {offer == null ? 'Tất cả mức lương' : (offer + " triệu")}
          </Button>
        </Popover>
        <Button type="primary" onClick={search}>Tìm kiếm</Button>
      </div>
      <div className='job-table'>
        <Table columns={columns} dataSource={
          jobs.map(job => ({
            key: job.id,
            id: job.id,
            companyName : job.employer.companyName,
            name: job.name,
            career: job.career.name,
            degree: job.degree.name,
            experience: job.experience == 0 ? 'Không yêu cầu' : job.experience + ' năm',
            offer: job.minOffer + " - " + job.maxOffer + " triệu",
            province : job.ward.district.province.name

          }))
          // data
        } />
      </div>
      {/* <div className='deep-search-job-list pt-15'>
                <div ref={listRef}>
                    {jobs.slice((currentPage - 1) * pageSize, ((currentPage - 1) * pageSize) + pageSize).map(job => (
                        <Link key={job.id} className='job pa-4 mb-5 flex gap-8 pa-3 mb-3'>
                            <div className=''>
                                <img className="company-picture" src={job.employer.picture ? "http://localhost:8080" + job.employer.picture : 'https://www.shutterstock.com/image-vector/building-icon-260nw-377768164.jpg'} />
                            </div>
                            <div className='flex flex-col justify-between w-full'>
                                <div className='flex justify-between items-baseline'>
                                    <div>
                                        <div className='job-name mb-1'>{job.name}</div>
                                        <div className='company-name'>{job.employer.companyName}</div>
                                    </div>
                                    <div className='offer'>{job.minOffer + " - " + job.maxOffer + " triệu"}</div>
                                </div>
                                <div>
                                    <Tag color="cyan" >{job.career.name}</Tag>
                                    <Tag color="cyan" >{job.degree.name}</Tag>
                                    <Tag color="cyan" >{(job.experience == 0 ? 'Không yêu cầu' : job.experience + ' năm') + ' kinh nghiệm'}</Tag>
                                    <Tag color="cyan" >{job.ward.district.province.name}</Tag>
                                    <Tag color="cyan" >{job.deadline}</Tag>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="flex justify-center mt-9">
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={jobs.length}
                        onChange={handlePageChange}
                    />
                </div>

            </div> */}
    </div>


  )
}
