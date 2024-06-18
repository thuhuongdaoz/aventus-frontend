import React, { useState } from 'react'
import Header from '../layout/Header'
import { Button, Form, Input, message, notification } from 'antd';
import axios from 'axios';
import './change-password.css'


export default function ChangePassword() {
    const [errorMessage, setErrorMessage] = useState("");
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish = async (values) => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        try {
            const response = await axios.post('http://localhost:8080/users/change-password', values, {headers});
            console.log('Đổi mật khẩu thành công:', response.data);
            // messageApi.open({
            //     type: 'success',
            //     content: 'Đổi mật khẩu thành công',
            //   });
            notification.success({
                message: 'Đổi mật khẩu thành công',
            });

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
        <div>
            {/* <Header /> */}
            <div className='change-password'>
                <div className='change-password-content'>
                    <h1 className='change-password-title'>Đổi mật khẩu</h1>
                    {errorMessage && (<div className="error-msg">{errorMessage}</div>)}
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
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Mật khẩu cũ"
                            name="oldPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu cũ của bạn!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            label="Mật khẩu mới"
                            name="newPassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập mật khẩu mới của bạn!',
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
                                    message: 'Vui lòng xác nhận mật khẩu mới của bạn!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newPassword') === value) {
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
    )
}
