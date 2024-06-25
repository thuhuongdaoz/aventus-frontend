import React, { useState, useEffect, useRef } from 'react'
import { Link, useParams } from "react-router-dom";
import {
    Button,
    Select,
    Input,
    InputNumber,
    Table,
    Space,
    Popover,
    Tag,
    Pagination
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Header from '../layout/Header'
import axios from 'axios';
// import './job.css'

const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const handleChange = (value) => {
    console.log(`selected ${value}`);
};



export default function SearchApplicationPerJob() {
    const [job, setJob] = useState(null); 
    const [majors, setMajors] = useState([]);
    const [degrees, setDegrees] = useState([]);
    const [englishLevels, setEnglishLevels] = useState([]);
    const [applications, setApplications] = useState([]);
    const [name, setName] = useState(null)
    const [majorId, setMajorId] = useState(0);
    const [degreeId, setDegreeId] = useState(0);
    const [experience, setExperience] = useState(null)
    const [openExperience, setOpenExperience] = useState(false);
    // const [offer, setOffer] = useState(null)
    // const [openOffer, setOpenOffer] = useState(false);
    const [englishLevelId, setEnglishLevelId] = useState(0);
    const [applicationStatus, setApplicationStatus] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const { id } = useParams();
    // const listRef = useRef(null);

    const applicationStatuses = [
        {
            id: 0,
            name: "Tất cả trạng thái"
        },
        {
            id: 1,
            name: "Chờ duyệt"
        },
        {
            id: 2,
            name: "Chấp nhận"
        },
        {
            id: 3,
            name: "Từ chối"
        },
    ]
    useEffect(() => {
        axios.get('http://localhost:8080/careers')
            .then(response => {
                response.data.unshift({
                    id: 0,
                    name: "Tất cả chuyên ngành"
                })
                setMajors(response.data);
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
        axios.get('http://localhost:8080/englishLevels')
            .then(response => {
                response.data.unshift({
                    id: 0,
                    name: "Tất cả trình dộ tiếng Anh"
                })
                setEnglishLevels(response.data);
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
        loadJob();
        search();

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
    // useEffect(() => {
    //     if (listRef.current) {
    //         window.scrollTo({
    //             top: listRef.current.offsetTop - 80, // 80px offset from the top
    //             behavior: 'smooth'
    //         });
    //     }
    // }, [currentPage]);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const onChangeName = (e) => {
        // console.log(e.target.value)
        setName(e.target.value)
    };
    const onChangeMajor = (value) => {
        // console.log(`selected ${value}`);
        setMajorId(value)
    };
    const onChangeDegree = (value) => {
        // console.log(`selected ${value}`);
        setDegreeId(value)
    };
    const onChangeExperience = (value) => {
        // console.log(value)
        setExperience(value)
    };
    // const onChangeOffer = (value) => {
    //     // console.log(value)
    //     setOffer(value)
    // };
    const onChangeEnglishLevel = (value) => {
        // console.log(`selected ${value}`);
        setEnglishLevelId(value)
    };
    const search = async () => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const params = {
            jobId: id,
        };
        
        if (name) params.name = name;
        if (majorId) params.majorId = majorId
        if (degreeId) params.degreeId = degreeId
        if (experience != null) params.experience = experience;
        if (englishLevelId) params.englishLevelId = englishLevelId;
        if (applicationStatus) params.applicationStatus = applicationStatus;
        const response = await axios.get(`http://localhost:8080/applies`, {
            params,
            headers
        });
        console.log('search apply response:', response.data);
        setApplications(response.data)
    };
    // const deleteJob = async (id) => {
    //     // console.log(id)
    //     const token = localStorage.getItem('token');
    //     await axios.delete(`http://localhost:8080/jobs/${id}`, {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     });
    //     search();
    // };
    const columns = [
        {
            title: 'Tên ứng viên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Chuyên ngành',
            dataIndex: 'major',
            key: 'major',
        },
        {
            title: 'Bằng cấp',
            dataIndex: 'degree',
            key: 'degree    ',
        },
        {
            title: 'Kinh nghiệm',
            dataIndex: 'experience',
            key: 'experience',
        },
        {
            title: 'Trình độ Tiếng Anh',
            dataIndex: 'englishLevel',
            key: 'englishLevel',

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
                // <Space size="middle">
                <Link to={`/viewapplication/${record.id}`}>Xem</Link>
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

    // const hideOffer = () => {
    //     setOpenOffer(false);
    // };
    // const handleOpenOfferChange = (newOpen) => {
    //     setOpenOffer(newOpen);
    // };
    return (

        <div className='list-job'>
            <h1 className='list-job-title'>Việc làm : {job?.name}</h1>
            {/* <h1 className=''>Đánh giá ứng viên</h1> */}
            <div className='add-job-row'>
                <Link to={`/job/${id}/deepsearchapplication`}>
                    <Button type="primary" size='large'>Trợ giúp đánh giá</Button>
                </Link>
            </div>
            <div className='filter'>
                <Input className='filter-item search-name' prefix={<SearchOutlined />} placeholder="Tên ứng viên" defaultValue={name} onChange={onChangeName} />
                <Select className='filter-item'
                    showSearch
                    placeholder="Chọn chuyên ngành"
                    optionFilterProp="children"
                    filterOption={filterOption}
                    onChange={onChangeMajor}
                    options={
                        majors.map(major => ({
                            value: major.id,
                            label: major.name
                        }))
                    }
                    defaultValue={majorId}

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
                        <InputNumber addonAfter="năm" placeholder='Kinh nghiệm' defaultValue={experience} onChange={onChangeExperience} />
                        <Button className='btn-close-popover' type='primary' onClick={hideExperience}>Đóng</Button>
                    </div>
                } trigger="click" open={openExperience} onOpenChange={handleOpenExperienceChange}>
                    <Button>{experience == null ? 'Tất cả kinh nghiệm' : (experience == 0 ? 'Không có kinh nghiệm' : experience + " năm")}</Button>
                </Popover>

                {/* <Popover className='filter-item' placement="bottomRight" content={
          <div className='popover-item'>
            <InputNumber addonAfter="triệu" placeholder='Mức lương' min={1} defaultValue={offer} onChange={onChangeOffer} />
            <Button className='btn-close-popover' type='primary' onClick={hideOffer}>Đóng</Button>
          </div>
        } trigger="click" open={openOffer} onOpenChange={handleOpenOfferChange}>
          <Button>
            {offer == null ? 'Tất cả mức lương' : (offer + " triệu")}
          </Button>
        </Popover> */}
                <Select className='filter-item'
                    defaultValue={englishLevelId}
                    onChange={onChangeEnglishLevel}
                    options={englishLevels.map(englishLevel => ({
                        value: englishLevel.id,
                        label: englishLevel.name
                    }))}
                />
                <Select className='filter-item'
                    defaultValue={applicationStatus}
                    onChange={onChangeDegree}
                    options={applicationStatuses.map(applicationStatus => ({
                        value: applicationStatus.id,
                        label: applicationStatus.name
                    }))}
                />
                <Button type="primary" onClick={search}>Tìm kiếm</Button>
            </div>
            <div className='job-table'>
                <Table columns={columns} dataSource={
                    applications.map(application => ({
                        key: application.id,
                        id: application.id,
                        name: application.name,
                        major: application.major.name,
                        degree: application.degree.name,
                        experience: (application.experience == 0 ? 'Không có kinh nghiệm' : application.experience + ' năm'),
                        englishLevel: application.englishLevel.name,
                        status: application.status == 1 ? 'Chờ duyệt' : (application.status == 2 ? 'Đã chấp nhận' : 'Đã từ chối')

                    }))
                    // data
                } />
            </div>
            {/* <div className='deep-search-job-list pt-15'>
                <div 
                ref={listRef}
                >
                    {applications.slice((currentPage - 1) * pageSize, ((currentPage - 1) * pageSize) + pageSize).map(application => (
                        <Link to={`/viewapplication/${application.id}`} key={application.id} className='job pa-4 mb-5 flex gap-8 pa-3 mb-3'>
                            <div className=''>
                                <img className="company-picture" src={application.candidate?.avatar ? "http://localhost:8080" + application.candidate.avatar : 'https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png'} />
                            </div>
                            <div className='flex flex-col justify-between w-full'>
                                <div className='flex justify-between items-baseline'>
                                    <div>
                                        <div className='job-name mb-1'>{application.name}</div>
                                        <div className='company-name'>{application.major.name}</div>
                                    </div>
                                    <div className='offer'>{application.status == 1 ? 'Chờ duyệt' : (application.status == 2 ? 'Đã chấp nhận' : 'Đã từ chối')}</div>
                                </div>
                                <div>
                                    
                                    <Tag color="cyan" >{application.degree.name}</Tag>
                                    <Tag color="cyan" >{(application.experience == 0 ? 'Không có kinh nghiệm' : application.experience + ' năm') + ' kinh nghiệm'}</Tag>
                                    <Tag color="cyan" >{application.englishLevel.name}</Tag>
                                    
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="flex justify-center mt-9">
                    {applications.length > 0 && <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={applications.length}
                        onChange={handlePageChange}
                    />}
                </div>

            </div> */}
        </div>


    )
}
