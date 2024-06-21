import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import {
  Tag, Button, Modal, Form,
  Select,
  InputNumber,
  Input,
  message, Upload,
  notification
} from 'antd';


import { DollarOutlined, UnorderedListOutlined, BookOutlined, HourglassOutlined, EnvironmentOutlined, UserOutlined, ClockCircleOutlined, 
  InboxOutlined 
} from '@ant-design/icons';
import axios from 'axios';
import './view-job.css'
const { Option } = Select;
const { Dragger } = Upload;
const validatePhoneNumber = (rule, value, callback) => {
  const phoneRegex = /^[0-9]{10}$/; // Change this regex according to your phone number format
  if (!value || phoneRegex.test(value)) {
    callback();
  } else {
    callback('Số điện thoại không hợp lệ');
  }
};

const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log('search:', value);
};

const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


const props = {
  name: 'file',
  multiple: false,
  action: 'http://localhost:8080/upload/cv',
  maxCount: 1,
  onChange(info) {
    const { status } = info.file;
    console.log("status upload cv", status)
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

export default function ViewJob() {
  const [job, setJob] = useState(null);
  const [hasApplied, setHasApplied] = useState(false)
  

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [majors, setMajors] = useState([]);
  const [degrees, setDegrees] = useState([]);
  const [englishLevels, setEnglishLevels] = useState([]);

  const [candidate, setCandidate] = useState(null);



  const { id } = useParams();
  useEffect(() => {
    axios.get('http://localhost:8080/majors')
      .then(response => {
        // console.log(response.data)
        setMajors(response.data);
      })
      .catch(error => {
        console.error('Error fetching majors:', error);
      });

    axios.get('http://localhost:8080/degrees')
      .then(response => {
        // console.log(response.data)
        setDegrees(response.data);
      })
      .catch(error => {
        console.error('Error fetching degrees:', error);
      });


    axios.get('http://localhost:8080/englishLevels')
      .then(response => {
        // console.log(response.data)
        setEnglishLevels(response.data);
      })
      .catch(error => {
        console.error('Error fetching englishLevels:', error);
      });
    loadJob()
    loadCandidate();
    checkApplied()
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
  const loadCandidate = async () => {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const result = await axios.get(`http://localhost:8080/candidates/myInfo`, { headers });
    console.log("loadCandidate", result.data)
    setCandidate(result.data);
  };
  const checkApplied = async () => {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const params = {
      candidateId : localStorage.getItem('userId'),
      jobId : id,
    };


    const response = await axios.get(`http://localhost:8080/applies/check`, {
      params,
      headers
    });
    console.log('check has applied job response:', response.data);
    setHasApplied(response.data)

  };
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const onFinish = async (values) => {
    console.log('apply request', values)
    if(!values.cv || values.cv.fileList.length === 0){
      Modal.warning({
        title: 'Thông báo',
        content: 'Vui lòng chọn CV trước khi nộp hồ sơ ứng tuyển!',
      });
    }
    try {

      console.log('apply request format', {...values,jobId: id ,resume: values.cv.file.response})
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post('http://localhost:8080/candidates/apply', {...values,jobId: id ,resume: values.cv.file.response}, { headers });
      console.log('apply response:', response.data);
      notification.success({
        message: 'Nộp hồ sơ ứng tuyển thành công',
      });
      setOpen(false);
      setHasApplied(true)


      // navigate("/login")
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
  const [form] = Form.useForm();
  useEffect(() => {
    if (candidate != null) {
      
      form.setFieldsValue({
        ...candidate,
        majorId: candidate.major?.id,
        degreeId: candidate.degree?.id,
        englishLevelId: candidate.englishLevel?.id
      })
    }
  }
    , [candidate]
  )
  return (
    <div className='view-job hu-mt-60 py-11 flex gap-12'>
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
            {!hasApplied? 
            <Button className="w-full" type="primary" onClick={showModal}>Ứng tuyển ngay</Button>
          :
              <div className='btn-applied text-center'>Đã ứng tuyển</div>
          }
            <Modal
              open={open}
              title={"Ứng tuyển " + job?.name}
              onOk={handleOk}
              onCancel={handleCancel}
              width={760}
              footer={null}
            >
              <div className='profile-content'>
                <h1 className='text-center'>Hồ sơ ứng tuyển</h1>
                <div className='box-update-info'>
                  <div className='right-profile'>
                    {errorMessage && (<div className="error-msg">{errorMessage}</div>)}
                    <Form
                      form={form}
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
                      <Form.Item
                        label="Họ tên"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập họ tên của bạn!',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập email của bạn!',
                          },
                          {
                            type: "email",
                            message: "Email không hợp lệ!"
                          },
                        ]}
                      >
                        <Input disabled />
                      </Form.Item>


                      <Form.Item
                        name="phoneNumber"
                        label="Số điện thoại"
                        // rules={[{ required: true, message: 'Please input your phone number!' }]}
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }, { validator: validatePhoneNumber }]}
                      >
                        <Input />
                      </Form.Item>


                      <Form.Item label="Chuyên ngành" name="majorId"
                        rules={[{ required: true, message: 'Vui lòng chọn chuyên ngành!' }]}
                      >
                        <Select
                          showSearch
                          placeholder="Chọn chuyên ngành"
                          optionFilterProp="children"
                          onChange={onChange}
                          onSearch={onSearch}
                          filterOption={filterOption}
                          options={
                            majors.map(major => ({
                              value: major.id,
                              label: major.name
                            }))
                          }
                        />
                      </Form.Item>
                      <Form.Item label="Bằng cấp" name="degreeId"
                        rules={[{ required: true, message: 'Vui lòng chọn bằng cấp!' }]}
                      >
                        <Select placeholder="Chọn bằng cấp">
                          {degrees.map(degree => (
                            <Option key={degree.id} value={degree.id}>{degree.name}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        label="Kinh nghiệm"
                        name="experience"
                        rules={[{ required: true, message: 'Vui lòng nhập số năm kinh nghiệm!' }]}

                      >
                        <InputNumber addonAfter="năm" style={{ width: '100%' }} />
                      </Form.Item>
                      <Form.Item label="Trình độ Tiếng Anh" name="englishLevelId"
                        rules={[{ required: true, message: 'Vui lòng chọn trình độ Tiếng Anh!' }]}
                      >
                        <Select placeholder="Chọn trình độ Tiếng Anh">
                          {englishLevels.map(englishLevel => (
                            <Option key={englishLevel.id} value={englishLevel.id}>{`${englishLevel.name} (${englishLevel.description})`}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                      // label="Chọn CV"
                        name="cv"
                        layout="vertical"
                        wrapperCol={{
                          offset: 4,
                          span: 24,
                        }}  
                      >
                        <Dragger {...props}>
                          <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                          </p>
                          <p className="ant-upload-text">Tải lên CV từ máy tính, chọn hoặc kéo thả</p>
                          {/* <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                            banned files.
                          </p> */}
                        </Dragger>
                      </Form.Item>
                      <Form.Item
                        layout="vertical"
                        wrapperCol={{
                          offset: 4,
                          span: 24,
                        }}
                      >

                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                          Ứng tuyển
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>

                </div>

              </div>
            </Modal>
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
