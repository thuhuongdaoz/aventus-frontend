import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Checkbox,
  Form,
  Input,
  DatePicker,
  Select,
  InputNumber,
  Upload,
  message,
  notification
} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import axios from 'axios';
import './profile.css'
import Avatar from 'antd/es/avatar/avatar';
import { useData } from '../../DataContext';


const validatePhoneNumber = (rule, value, callback) => {
  const phoneRegex = /^[0-9]{10}$/; // Change this regex according to your phone number format
  if (!value || phoneRegex.test(value)) {
    callback();
  } else {
    callback('Số điện thoại không hợp lệ');
  }
};






const ProfileAdmin = () => {
  const { updateData } = useData();
  const [errorMessage, setErrorMessage] = useState("");
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    
    loadAdmin();
  }, []);

  const loadAdmin = async () => {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const result = await axios.get(`http://localhost:8080/users/myInfo`, { headers });
    console.log("loadAdmin", result.data)
    setAdmin(result.data);
    setImageUrl(result.data.avatar)
  };

  
  const onFinish = async (values) => {
    try {
      console.log('Update admin info request', values)
      console.log('Update admin info request format', { ...values, dateOfBirth: values.dateOfBirth ? dayjs(values.dateOfBirth).format('YYYY-MM-DD') : null, avatar: imageUrl })
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.put('http://localhost:8080/users/myInfo', { ...values, dateOfBirth: values.dateOfBirth ? dayjs(values.dateOfBirth).format('YYYY-MM-DD') : null, avatar: imageUrl }, { headers });
      console.log('Update candidate info response:', response.data);
      notification.success({
        message: 'Cập nhật thông tin cá nhân thành công',
      });
      updateData();
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
    if (admin != null) {
      form.setFieldsValue({
        ...admin,
        dateOfBirth: admin.dateOfBirth ? dayjs(admin.dateOfBirth) : admin.dateOfBirth,
        
      })


    }
  }
    , [admin]
  )
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   message.error('Image must smaller than 2MB!');
    // }  
    return isJpgOrPng
    // && isLt2M;
  };
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      // console.log(info.file)
      setLoading(false);
      setImageUrl(info.file.response);
    }
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  return (
    <div className='profile flex justify-center items-center'>
      <div className='profile-content'>
        <h1 className='text-center'>Thông tin cá nhân</h1>
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
              initialValues={admin || {}}
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
                label="Ngày sinh"
                name="dateOfBirth"
              // rules={[{ required: true, message: 'Please input!' }]}
              >
                <DatePicker style={{ width: '100%' }} maxDate={dayjs()} />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                label="Phone Number"
                // rules={[{ required: true, message: 'Please input your phone number!' }]}
                rules={[{ validator: validatePhoneNumber }]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Ảnh đại diện"
                name="avatar">
                <Upload
                  action="http://localhost:8080/upload/avatar" // URL for backend upload API
                  method="post"
                  name="file"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <img
                      src={"http://localhost:8080" + imageUrl}
                      alt="avatar"
                      style={{
                        width: '100%',
                      }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>
              


              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
              </Form.Item>
            </Form>
          </div>

        </div>

      </div>
    </div>

  )
}

export default ProfileAdmin