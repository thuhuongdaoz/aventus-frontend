import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, Select } from 'antd';
import axios from 'axios';


import "../auth.css";

const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

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

const { Option } = Select;
const RegisterEmployer = () => {
    const [errorMessage, setErrorMessage] = useState(
        "Không tìm thấy tài khoản"
    );
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    useEffect(() => {
        console.log("o day")
        // Fetch provinces data when component mounts
        axios.get('http://localhost:8080/provinces')
            .then(response => {
                console.log(response.data)
                setProvinces(response.data);
            })
            .catch(error => {
                console.error('Error fetching provinces:', error);
            });
    }, []);

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
        console.log("co vao day", value)
        // Fetch wards data based on selected district
        axios.get(`http://localhost:8080/wards?district=${value}`)
          .then(response => {
            setWards(response.data);
          })
          .catch(error => {
            console.error('Error fetching wards:', error);
          });
      };
    return (
        <>

            <div className="login">
                <div className="content">
                    <h1 className="login-title">Đăng kí</h1>
                    {/* <Link className="ml-200" to="/register/employer">Bạn là nhà tuyển dụng</Link> */}

                    <div className="error-msg">{errorMessage}</div>
                    <Form
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
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >   <Form.Item
                        {...tailFormItemLayout}>
                            <h2>Tài khoản</h2>
                        </Form.Item>
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
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu của bạn!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            label="Xác nhận mật khẩu"
                            name="confirm"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng xác nhận mật khẩu của bạn!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Mật khẩu bạn mới nhập không khớp!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            {...tailFormItemLayout}>
                            <h2>Thông tin công ty</h2>
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
                        <Form.Item label="Tỉnh/thành phố" name="province" rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố!' }]}>
                            <Select placeholder="Chọn tỉnh/thành phố" onChange={handleProvinceChange}>
                                {provinces.map(province => (
                                    <Option key={province.code} value={province.code}>{province.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Quận/huyện" name="district" rules={[{ required: true, message: 'Vui lòng chọn quận/huyện!' }]}>
                            <Select placeholder="Chọn quận/huyện" onChange={handleDistrictChange}>
                                {districts.map(district => (
                                    <Option key={district.code} value={district.code}>{district.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Phường/xã" name="wards" rules={[{ required: true, message: 'Vui lòng chọn phường/xã!' }]}>
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
                                    message: 'Vui lòng nhập địa chỉ công ty!',
                                },

                            ]}
                        ><Input /></Form.Item>
                        
                        <Form.Item
                            name="agreement"
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        value ? Promise.resolve() : Promise.reject(new Error('Cần chấp nhận thỏa thuận')),
                                },
                            ]}
                            {...tailFormItemLayout}
                        >
                            <Checkbox>
                                Tôi đã đọc và đồng ý <a href="">thỏa thuận</a>
                            </Checkbox>
                        </Form.Item>


                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Đăng kí
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className='auth-link-wrap'>Bạn đã có tài khoản?<Link className='auth-link' to="/login">Đăng nhập ngay</Link></div>
                </div>
            </div>
        </>
    );
};
export default RegisterEmployer;