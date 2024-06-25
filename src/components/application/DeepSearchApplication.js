import React, { useState, useEffect, useRef } from 'react'

import {
    Button,
    Form,
    Select,
    InputNumber,
    Slider,
    Tag,
    Pagination,
    Modal,
    Table,
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
const round4 = (value) =>
    Math.round(value * 10000) / 10000
export default function DeepSearchApplication() {

    const [errorMessage, setErrorMessage] = useState("");
    const [applications, setApplications] = useState([]);

    const [careers, setCareers] = useState([]);
    // const [majors, setMajors] = useState([]);
    const [degrees, setDegrees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const [open, setOpen] = useState(false);
    const [weight, setWeight] = useState([0, 0, 0, 0])
    const [bestSolution, setBestSolution] = useState([])
    const [worstSolution, setWorstSolution] = useState([])
    // const listRef = useRef(null);
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
    // useEffect(() => {
    //     if (listRef.current) {
    //         window.scrollTo({
    //             top: listRef.current.offsetTop - 80, // 100px offset from the top
    //             behavior: 'smooth'
    //           });
    //     }
    //   }, [currentPage]);
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
            const response = await axios.post('http://localhost:8080/applies/topsisSearch', { ...values, employerId: localStorage.getItem('userId') }, { headers });
            console.log('DeepSearchApplication response:', response.data);
            setApplications(response.data.applies)
            setWeight(response.data.weight)
            setBestSolution(response.data.bestSolution)
            setWorstSolution(response.data.worstSolution)
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

    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const columns = [
        {
            title: '',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ngành nghề',
            dataIndex: 'career',
            key: 'career',
        },
        {
            title: 'Bằng cấp',
            dataIndex: 'degree',
            key: 'degree',
        },
        {
            title: 'Kinh nghiệm',
            dataIndex: 'experience',
            key: 'experience',
        },

    ];
    const columns3 = [
        {
            title: '',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ngành nghề x ' + round4(weight[0]),
            dataIndex: 'career',
            key: 'career',
        },
        {
            title: 'Bằng cấp x ' + round4(weight[1]),
            dataIndex: 'degree',
            key: 'degree',
        },
        {
            title: 'Kinh nghiệm x ' + round4(weight[2]),
            dataIndex: 'experience',
            key: 'experience',
        },
    ];
    const columns5 = [
        {
            title: '',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ngành nghề',
            dataIndex: 'career',
            key: 'career',
        },
        {
            title: 'Bằng cấp',
            dataIndex: 'degree',
            key: 'degree',
        },
        {
            title: 'Kinh nghiệm',
            dataIndex: 'experience',
            key: 'experience',
        },
        {
            title: 'D+',
            dataIndex: 'distanceBest',
            key: 'distanceBest',

        },
        {
            title: 'D-',
            dataIndex: 'distanceWorst',
            key: 'distanceWorst',

        },
    ];
    const columns6 = [
        {
            title: '',
            dataIndex: 'name',
            key: 'name',
        },

        {
            title: 'D+',
            dataIndex: 'distanceBest',
            key: 'distanceBest',

        },
        {
            title: 'D-',
            dataIndex: 'distanceWorst',
            key: 'distanceWorst',

        },
        {
            title: 'P',
            dataIndex: 'p',
            key: 'p',

        },


    ];
    const columns7 = [
        {
            title: '',
            dataIndex: 'name',
            key: 'name',
        },


        {
            title: 'P',
            dataIndex: 'p',
            key: 'p',

        },
        {
            title: 'Rank',
            dataIndex: 'rank',
            key: 'rank',
            render: (text, record, index) => index + 1,
        },


    ];
    return (
        <div className='deep-search-job mt-15'>
            <h1 className='mt-0 mb-8'>Trợ giúp đánh giá ứng viên</h1>
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
                    initialValues={{
                        careerId: 14,
                        degreeId: 3,
                        experience: 1,
                        careerWeight: 1,
                        degreeWeight: 1,
                        experienceWeight: 1,

                    }}
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
                    <Form.Item name="careerWeight"
                        // rules={[{ required: true, message: 'Vui lòng chọn trọng số ngành nghề' }]}
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Slider min={1} max={5} />

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
                    <Form.Item name="degreeWeight"
                        // rules={[{ required: true, message: 'Vui lòng chọn trọng số bằng cấp' }]}
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Slider min={1} max={5} />

                    </Form.Item>
                    <Form.Item
                        label="Yêu cầu kinh nghiệm"
                        name="experience"
                        rules={[{ required: true, message: 'Vui lòng nhập yêu cầu về số năm kinh nghiệm!' }]}

                    >
                        <InputNumber addonAfter="năm" style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="experienceWeight"
                        // rules={[{ required: true, message: 'Vui lòng chọn trọng số kinh nghiệm' }]}
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Slider min={1} max={5} />

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
            {applications.length > 0 &&
                <div className='deep-search-job-list pt-8'>
                    <div className='flex justify-end mb-6' >
                        <Button type="primary" onClick={showModal}>
                            Xem chi tiết
                        </Button>
                        <Modal
                            open={open}
                            title={null}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            width={1000}
                            footer={null}>
                            <div>
                                <h1>Thuật toán Topsis</h1>
                                <div>
                                    <h2>Bước 1: Xây dựng ma trận quyết định</h2>
                                    <Table columns={columns} dataSource={
                                        applications.map(application => ({
                                            key: application.id,
                                            id: application.id,
                                            name: application.name,
                                            career: application.originPoint[0],
                                            degree: application.originPoint[1],
                                            experience: application.originPoint[2],

                                        }))
                                        // data
                                    } />
                                </div>
                                <div>
                                    <h2>Bước 2: Chuẩn hóa ma trận quyết định</h2>
                                    <Table columns={columns} dataSource={
                                        applications.map(application => ({
                                            key: application.id,
                                            id: application.id,
                                            name: application.name,
                                            career: round4(application.normalPoint[0]),
                                            degree: round4(application.normalPoint[1]),
                                            experience: round4(application.normalPoint[2]),

                                        }))
                                        // data
                                    } />
                                </div>
                                <div>
                                    <h2>Bước 3: Xây dựng ma trận quyết định đã chuẩn hóa có trọng số</h2>
                                    <Table columns={columns3} dataSource={
                                        applications.map(application => ({
                                            key: application.id,
                                            id: application.id,
                                            name: application.name,
                                            career: round4(application.weightPoint[0]),
                                            degree: round4(application.weightPoint[1]),
                                            experience: round4(application.weightPoint[2]),


                                        }))
                                        // data
                                    } />
                                </div>
                                <div>
                                    <h2>Bước 4: Xác định giải pháp lý tưởng tích cực và giải pháp lý tưởng tiêu cực</h2>
                                    <Table columns={columns} dataSource={
                                        [
                                            {

                                                name: "Best Solution",
                                                value: bestSolution
                                            },
                                            {
                                                name: "Worst Solution",
                                                value: worstSolution
                                            },
                                        ].map((solution, index) => ({
                                            key: index + 1,
                                            id: index + 1,
                                            name: solution.name,
                                            career: round4(solution.value[0]),
                                            degree: round4(solution.value[1]),
                                            experience: round4(solution.value[2]),
                                        }))

                                        // data
                                    } />
                                </div>
                                <div>
                                    <h2>Bước 5: Tính khoảng cách đến các giải pháp lý tưởng tích cực và tiêu cực</h2>
                                    <Table columns={columns5} dataSource={
                                        applications.map(application => ({
                                            key: application.id,
                                            id: application.id,
                                            name: application.name,
                                            career: round4(application.weightPoint[0]),
                                            degree: round4(application.weightPoint[1]),
                                            experience: round4(application.weightPoint[2]),
                                            distanceBest: round4(application.distanceBest),
                                            distanceWorst: round4(application.distanceWorst),

                                        }))
                                        // data
                                    } />
                                </div>
                                <div>
                                    <h2>Bước 6: Tính chỉ số tương đồng với giải pháp lý tưởng</h2>
                                    <Table columns={columns6} dataSource={
                                        applications.map(application => ({
                                            key: application.id,
                                            id: application.id,
                                            name: application.name,
                                            distanceBest: round4(application.distanceBest),
                                            distanceWorst: round4(application.distanceWorst),
                                            p: round4(application.p)

                                        }))
                                        // data
                                    } />
                                </div>
                                <div>
                                    <h2>Bước 7: Xếp hạng các phương án</h2>
                                    <Table columns={columns7} dataSource={
                                        [...applications].sort((a, b) => b.p - a.p).map(application => ({
                                            key: application.id,
                                            id: application.id,
                                            name: application.name,
                                            distanceBest: round4(application.distanceBest),
                                            distanceWorst: round4(application.distanceWorst),
                                            p: round4(application.p)

                                        }))
                                        // data
                                    } />
                                </div>



                            </div>

                        </Modal>
                    </div>
                    <div
                    // ref={listRef}
                    >
                        {[...applications].sort((a, b) => b.p - a.p).slice((currentPage - 1) * pageSize, ((currentPage - 1) * pageSize) + pageSize).map(application => (
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
                         <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            total={applications.length}
                            onChange={handlePageChange}
                        />
                    </div>

                </div>
            }
        </div>
    )
}
