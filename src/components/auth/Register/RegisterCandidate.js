import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';
import "../auth.css";
import "../../base/Modal.css"



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
const RegisterCandidate = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleClose = () => {
        setIsVisible(false);
    };

    const moveToRegisterEmployer = () => {
        console.log("vao day r");
        navigate("/register/employer")
        console.log("lkl")
    }

    const onFinish = async (values) => {
        try {
            const response = await axios.post('http://localhost:8080/candidates', values);
            // setUser(response.data);
            // console.log('Data posted successfully:', response.data);
            navigate("/login")
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
        <>
            {isVisible && (
                <div className="modal-overlay">
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2 className='modal-title'>Chào bạn</h2>
                        <div className='modal-text'>Vui lòng lựa chọn vai trò phù hợp nhất với bạn</div>
                        <button className="modal-close" onClick={handleClose}>
                            Ứng viên
                        </button>
                        <button className="modal-close" onClick={moveToRegisterEmployer}>
                            Nhà tuyển dụng
                        </button>
                    </div>
                </div>
            )}
            <div className="login">
                <div className="login-content">
                    <h1 className="login-title">Đăng kí</h1>
                    {/* <Link className="ml-200" to="/register/employer">Bạn là nhà tuyển dụng</Link> */}
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
                        initialValues={{
                            remember: true,
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
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className='auth-link-wrap'>Bạn đã có tài khoản?<Link className='auth-link' to="/login">Đăng nhập ngay</Link></div>
                </div>
            </div>
        </>
    );
};
export default RegisterCandidate;