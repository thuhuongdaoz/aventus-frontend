import React, { useState, useEffect } from 'react'

import {
    Button,
    Form,
    Select,
    InputNumber,
    notification
} from 'antd';
import axios from 'axios';

import './deep-search-job.css'


const { Option } = Select;

const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log('search:', value);
};

const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
export default function DeepSearchJob() {
    
    const [errorMessage, setErrorMessage] = useState("error");
    const [majors, setMajors] = useState([]);
    const [degrees, setDegrees] = useState([]);
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

    }, []);
    const onFinish = async (values) => {
        try {
          console.log('DeepSearchJob request', values)
        //   console.log('Update candidate info request format', { ...values, dateOfBirth: values.dateOfBirth ? dayjs(values.dateOfBirth).format('YYYY-MM-DD') : null , avatar : imageUrl})
        //   const token = localStorage.getItem('token');
        //   const headers = {
        //     Authorization: `Bearer ${token}`,
        //   };
        //   const response = await axios.put('http://localhost:8080/candidates/myInfo', { ...values, dateOfBirth: values.dateOfBirth ? dayjs(values.dateOfBirth).format('YYYY-MM-DD') : null , avatar : imageUrl}, { headers });
        //   console.log('Update candidate info response:', response.data);
        //   notification.success({
        //     message: 'Cập nhật thông tin cá nhân thành công',
        // });
    
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
    return (
        <div className='deep-search-job mt-15'>
            <h1 className='mt-0'>Trợ giúp tìm kiếm</h1>
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

                <Form.Item label="Chuyên ngành" name="major_id"
                    rules={[{ required: true, message: 'Vui lòng chọn chuyên ngành' }]}
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

                <Form.Item label="Bằng cấp" name="degree_id"
                    rules={[{ required: true, message: 'Vui lòng chọn bằng cấp' }]}
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
                <Form.Item
                    label="Mức lương mong muốn"
                    name="expectedOffer"
                    rules={[{ required: true, message: 'Vui lòng nhập mức lương tối thiểu!' }]}
                >
                    <InputNumber addonAfter="triệu" style={{ width: '100%' }} />
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
    )
}
