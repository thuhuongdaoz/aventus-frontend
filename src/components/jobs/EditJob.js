import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Form,
  Input,
  DatePicker,
  Select,
  InputNumber,
  notification
} from 'antd';
import dayjs from 'dayjs';
import axios from 'axios';
import './add-job.css'

const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log('search:', value);
};

const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const { Option } = Select;

export default function EditJob() {
  const [errorMessage, setErrorMessage] = useState("error");
  const [job, setJob] = useState(null);
  const [careers, setCareers] = useState([]);
  const [degrees, setDegrees] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();



  useEffect(() => {
    axios.get('http://localhost:8080/careers')
      .then(response => {
        setCareers(response.data);
      })
      .catch(error => {
        console.error('Error fetching careers:', error);
      });

    axios.get('http://localhost:8080/degrees')
      .then(response => {
        setDegrees(response.data);
      })
      .catch(error => {
        console.error('Error fetching degrees:', error);
      });

    // Fetch provinces data when component mounts
    axios.get('http://localhost:8080/provinces')
      .then(response => {
        // console.log(response.data)
        setProvinces(response.data);
      })
      .catch(error => {
        console.error('Error fetching provinces:', error);
      });
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

  const [form] = Form.useForm();
  useEffect(() => {
    if (job != null) {
      form.setFieldsValue({
        ...job,
        careerId : job.career.id,
        degreeId : job.degree.id,
        province_code: job.ward.district.province.code,
        district_code: job.ward.district.code,
        ward_code: job.ward.code,
        deadline: dayjs(job.deadline),
      })

      if (job.ward.district.province.code) {
        handleProvinceChange(job.ward.district.province.code);
      }
      if (job.ward.district.code) {
        handleDistrictChange(job.ward.district.code);
      }

    }
  }, [job])
  const handleProvinceChange = (value) => {
    // Fetch districts data based on selected province
    axios.get(`http://localhost:8080/districts?province=${value}`)
      .then(response => {
        setDistricts(response.data);
        setWards([]); // Reset wards when province changes
      })
      .catch(error => {
        console.error('Error fetching districts:', error);
      });
  };

  const handleDistrictChange = (value) => {
    // Fetch wards data based on selected district
    axios.get(`http://localhost:8080/wards?district=${value}`)
      .then(response => {
        setWards(response.data);
      })
      .catch(error => {
        console.error('Error fetching wards:', error);
      });
  };
  const onFinish = async (values) => {
    try {
      // console.log('edit job', values)
      // console.log('edit job format', { ...values, deadline: dayjs(values.deadline).format('YYYY-MM-DD') })
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.put(`http://localhost:8080/jobs/${id}`, { ...values, deadline: dayjs(values.deadline).format('YYYY-MM-DD') }, { headers });
      // console.log('edit job response:', response.data);
      notification.success({
        message: 'Sửa việc làm thành công',
      });

      navigate("/listjob")
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
    <div className='add-job'>
      <h1 className='add-job-title'>Sửa việc làm</h1>
      <div className='add-job-form'>
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
            label="Tên việc làm"
            name="name"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên việc làm của bạn!',
              },
            ]}
          >
            <Input />
          </Form.Item>
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
            label="Yêu cầu kinh nghiệm (năm)"
            name="experience"
            rules={[{ required: true, message: 'Vui lòng nhập yêu cầu về số năm kinh nghiệm!' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Mức lương tối thiểu (triệu)"
            name="minOffer"
            rules={[{ required: true, message: 'Vui lòng nhập mức lương tối thiểu!' }]}
          >
            <InputNumber step={0.1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Mức lương tối đa (triệu)"
            name="maxOffer"
            rules={[{ required: true, message: 'Vui lòng nhập mức lương tối đa!' }]}
          >
            <InputNumber step={0.1} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Mô tả công việc"
            name="description"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả công việc!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Yêu cầu ứng viên"
            name="requirement"
            rules={[{ required: true, message: 'Vui lòng nhập yêu cầu ứng viên!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Quyền lợi"
            name="benefit"
            rules={[{ required: true, message: 'Vui lòng nhập quyền lợi!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Tỉnh/thành phố" name="province_code"
            rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố!' }]}
          >
            <Select placeholder="Chọn tỉnh/thành phố" onChange={handleProvinceChange}>
              {provinces.map(province => (
                <Option key={province.code} value={province.code}>{province.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Quận/huyện" name="district_code"
            rules={[{ required: true, message: 'Vui lòng chọn quận/huyện!' }]}
          >
            <Select placeholder="Chọn quận/huyện" onChange={handleDistrictChange}>
              {districts.map(district => (
                <Option key={district.code} value={district.code}>{district.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Phường/xã" name="ward_code"
            rules={[{ required: true, message: 'Vui lòng chọn phường/xã!' }]}
          >
            <Select placeholder="Chọn phường/xã">
              {wards.map(ward => (
                <Option key={ward.code} value={ward.code}>{ward.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập địa điểm làm việc!',
              },

            ]}
          ><Input /></Form.Item>
          <Form.Item
            label="Số lượng tuyển"
            name="quantity"
            rules={[{ required: true, message: 'Vui lòng nhập số lượng tuyển!' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Hạn nộp hồ sơ"
            name="deadline"
            rules={[{ required: true, message: 'Vui lòng nhập hạn nộp hồ sơ!' }]}
          >
            <DatePicker minDate={dayjs()} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button className='btn-save' type="primary" htmlType="submit">
              Lưu
            </Button>
            <Link to='/listjob'><Button>Cancel</Button></Link>

          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
