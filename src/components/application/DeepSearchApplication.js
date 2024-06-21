import React, { useState, useEffect , useRef } from 'react'

import {
    Button,
    Form,
    Select,
    InputNumber,
    Tag,
    Pagination,
    notification
} from 'antd';
import axios from 'axios';

// import './deep-search-job.css'
import { Link } from 'react-router-dom';


const { Option } = Select;

const onChange = (value) => {
    console.log(`selected ${value}`);
};
const onSearch = (value) => {
    console.log('search:', value);
};

const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
export default function DeepSearchApplication() {

    const [errorMessage, setErrorMessage] = useState("");
    const [applications, setApplications] = useState([]);
    
    const [careers, setCareers] = useState([]);
    // const [majors, setMajors] = useState([]);
    const [degrees, setDegrees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const listRef = useRef(null);
    useEffect(() => {
        axios.get('http://localhost:8080/careers')
            .then(response => {
                // console.log(response.data)
                setCareers(response.data);
            })
            .catch(error => {
                console.error('Error fetching careers:', error);
            });

        axios.get('http://localhost:8080/degrees')
            .then(response => {
                // console.log(response.data)
                setDegrees(response.data);
            })
            .catch(error => {
                console.error('Error fetching degrees:', error);
            });

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
    const onFinish = async (values) => {
        try {
            console.log('DeepSearchApplication request', values)
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const response = await axios.post('http://localhost:8080/applies/topsisSearch', values, { headers });
            console.log('DeepSearchApplication response:', response.data);
            setApplications(response.data)
            setCurrentPage(1)
            setErrorMessage(null)

        } catch (error) {
            if (error.response) {
                // Server responded with a status code other than 2xx
                setErrorMessage(`Error: ${error.response.data}`);
            }
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='deep-search-job mt-15'>
            <h1 className='mt-0 mb-8'>Trợ giúp tìm kiếm ứng viên</h1>
            <div className='deep-search-job-form ma-auto'>
                {errorMessage && (<div className="error-msg">{errorMessage}</div>)}
                <Form className='ma-auto'
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    
                    <Form.Item label="Ngành nghề" name="careerId"
                        rules={[{ required: true, message: 'Vui lòng chọn ngành nghề' }]}
                    >
                        <Select
                            showSearch
                            placeholder="Chọn ngành nghề"
                            optionFilterProp="children"
                            onChange={onChange}
                            onSearch={onSearch}
                            filterOption={filterOption}
                            options={
                                careers.map(career => ({
                                    value: career.id,
                                    label: career.name
                                }))
                            }
                        />
                    </Form.Item>

                    <Form.Item label="Yêu cầu bằng cấp" name="degreeId"
                        rules={[{ required: true, message: 'Vui lòng chọn bằng cấp' }]}
                    >
                        <Select placeholder="Chọn bằng cấp">
                            {degrees.map(degree => (
                                <Option key={degree.id} value={degree.id}>{degree.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Yêu cầu kinh nghiệm"
                        name="experience"
                        rules={[{ required: true, message: 'Vui lòng nhập yêu cầu về số năm kinh nghiệm!' }]}

                    >
                        <InputNumber addonAfter="năm" style={{ width: '100%' }} />
                    </Form.Item>
                    {/* <Form.Item
                        label="Mức lương mong muốn"
                        name="expectedOffer"
                        rules={[{ required: true, message: 'Vui lòng nhập mức lương tối thiểu!' }]}
                    >
                        <InputNumber addonAfter="triệu" style={{ width: '100%' }} />
                    </Form.Item> */}
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Tìm kiếm
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className='deep-search-job-list pt-15'>
                <div ref={listRef}>
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
                                    {/* <div className='offer'>{job.minOffer + " - " + job.maxOffer + " triệu"}</div> */}
                                    <div className='offer'>{application.status == 1 ? 'Chờ duyệt' : (application.status == 2 ? 'Đã chấp nhận' : 'Đã từ chối')}</div>
                                    
                                </div>
                                <div>
                                    {/* <Tag color="cyan" >{job.career.name}</Tag> */}
                                    <Tag color="cyan" >{application.degree.name}</Tag>
                                    <Tag color="cyan" >{(application.experience == 0 ? 'Không có kinh nghiệm' : application.experience + ' năm') + ' kinh nghiệm'}</Tag>
                                    <Tag color="cyan" >{application.englishLevel.name}</Tag>
                                    {/* <Tag color="cyan" >{applicaton.status == 1 ? 'Chờ duyệt' : (applicaton.status == 2 ? 'Chấp nhận' : 'Từ chối')}</Tag> */}
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

            </div>
        </div>
    )
}
