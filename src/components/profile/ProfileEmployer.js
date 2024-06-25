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
import { useData } from '../../DataContext';

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const validatePhoneNumber = (rule, value, callback) => {
  const phoneRegex = /^[0-9]{10}$/; // Change this regex according to your phone number format
  if (!value || phoneRegex.test(value)) {
    callback();
  } else {
    callback('Số điện thoại không hợp lệ');
  }
};

const { Option } = Select;

const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log('search:', value);
};

const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


const ProfileEmployer = () => {
  const { updateData } = useData();
  const [errorMessage, setErrorMessage] = useState("");
  const [employer, setEmployer] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [pictureUrl, setPictureUrl] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    // Fetch provinces data when component mounts
    axios.get('http://localhost:8080/provinces')
      .then(response => {
        // console.log(response.data)
        setProvinces(response.data);
      })
      .catch(error => {
        console.error('Error fetching provinces:', error);
      });

    loadEmployer();
  }, []);

  const loadEmployer = async () => {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const result = await axios.get(`http://localhost:8080/employers/myInfo`, { headers });
    console.log("loadEmployer", result.data)
    setEmployer(result.data);
    setImageUrl(result.data.avatar)
    setPictureUrl( result.data.picture)
  };

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
      console.log('Update employer info request', values)
      console.log('Update employer info request format', { ...values, dateOfBirth: values.dateOfBirth ? dayjs(values.dateOfBirth).format('YYYY-MM-DD') : null  , avatar : imageUrl,  picture : pictureUrl})
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.put('http://localhost:8080/employers/myInfo', { ...values, dateOfBirth: values.dateOfBirth ? dayjs(values.dateOfBirth).format('YYYY-MM-DD') : null  , avatar : imageUrl,  picture : pictureUrl}, { headers });
      notification.success({
        message: 'Cập nhật thông tin cá nhân thành công',
      });
      updateData();
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
    if (employer != null) {
      form.setFieldsValue({
        ...employer,
        dateOfBirth: employer.dateOfBirth ? dayjs(employer.dateOfBirth) : employer.dateOfBirth,
        province_code: employer.ward?.district?.province?.code,
        district_code: employer.ward?.district?.code,
        ward_code: employer.ward?.code,
        
      })

      if (employer?.ward?.district?.province?.code) {
        handleProvinceChange(employer?.ward?.district?.province?.code);
      }
      if (employer?.ward?.district?.code) {
        handleDistrictChange(employer?.ward?.district?.code);
      }


    }
  }
    , [employer]
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
  const handlePictureChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      // console.log(info.file)
      setLoading(false);
      setPictureUrl(info.file.response);
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
        {/* <div className='left-profile'>

          <Upload
            action="http://yourbackend.com/upload" // URL for backend upload API
            method="post"
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: '100%',
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </div> */}
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
              {...tailFormItemLayout}>
              <h2 style={{ margin: '0px' }}>Tài khoản</h2>
            </Form.Item>

            {/* <Form.Item
          {...tailFormItemLayout}
        >
          <h2 style={{ margin: '0px' }}>Thông tin cá nhân</h2>
        </Form.Item> */}
            <Form.Item
              // initialValue={candidate?.name || 'demo'}
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
              {...tailFormItemLayout}>
              <h2 style={{ margin: '0' }}>Thông tin công ty</h2>
            </Form.Item>
            <Form.Item
              label="Tên công ty"
              name="companyName"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên công ty!',
                },
              ]}
            ><Input /></Form.Item>
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
            {/* <Form.Item label="Phường/xã" name="ward" rules={[{ required: true, message: 'Vui lòng chọn phường/xã!' }]}>
          <Select showSearch
            placeholder="Chọn phường/xã"
            optionFilterProp="children"
            onSearch={onSearch}
            filterOption={filterOption}
            options={
              wards.map(ward => ({
                value: ward.code,
                label: ward.name
              }))
            }
          />

        </Form.Item> */}
            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập địa chỉ công ty!',
                },

              ]}
            ><Input /></Form.Item>
            <Form.Item label="Ảnh công ty"
              name="picture">
              <Upload
                action="http://localhost:8080/upload/picture" // URL for backend upload API
                method="post"
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handlePictureChange}
              >
                {pictureUrl ? (
                  <img
                    src={"http://localhost:8080" + pictureUrl}
                    alt="picture"
                    style={{
                      width: '100%',
                    }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>

            {/* <Form.Item
          {...tailFormItemLayout}
        >
          {errorMessage && (<div className="error-msg">{errorMessage}</div>)}
        </Form.Item> */}





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

export default ProfileEmployer