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

import './deep-search-job.css'
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
export default function DeepSearchJob() {

    const [errorMessage, setErrorMessage] = useState("");
    const [jobs, setJobs] = useState([
        // { id: 154, employer: { id: 604, email: "huong7@gmail.com", password: "$2a$10$pm4JwzFs64.tZJ1oHHxPCuGWt5.gYQGphmyrXhnd3mPguFleYUIN2", name: "huong7000", role: { name: "EMPLOYER", description: "Nhà tuyển dụng" }, dateOfBirth: "2024-05-02", phoneNumber: "0123456788", avatar: "/upload/avatar/images.jpg", companyName: "Công Ty TNHH LG CNS VIỆT NAM", ward: { code: "00175", name: "Trung Hoà", full_name: "Phường Trung Hoà", district: { code: "005", name: "Cầu Giấy", full_name: "Quận Cầu Giấy", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "100 Đ. Trần Duy Hưng", picture: "/upload/picture/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg", block: false }, name: "kế toán", career: { id: 35, name: "Kế toán / Kiểm toán", majorCareers: [{ id: 3, point: 0.2 }, { id: 1, point: 1.0 }] }, degree: { id: 2, name: "Cao đẳng" }, experience: 3, minOffer: 20, maxOffer: 22, description: "a", requirement: "b", benefit: "c", quantity: 2, ward: { code: "00001", name: "Phúc Xá", full_name: "Phường Phúc Xá", district: { code: "001", name: "Ba Đình", full_name: "Quận Ba Đình", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "10d", deadline: "2024-06-01", point: [0.049029033784546004, 0.17677669529663687, 0.24821920962173052, 0.211999576001272], distanceBest: 0.19611613513818402, distanceWorst: 0.23245033549780986, p: 0.5423903908134785 }, { id: 153, employer: { id: 604, email: "huong7@gmail.com", password: "$2a$10$pm4JwzFs64.tZJ1oHHxPCuGWt5.gYQGphmyrXhnd3mPguFleYUIN2", name: "huong7000", role: { name: "EMPLOYER", description: "Nhà tuyển dụng" }, dateOfBirth: "2024-05-02", phoneNumber: "0123456788", avatar: "/upload/avatar/images.jpg", companyName: "Công Ty TNHH LG CNS VIỆT NAM", ward: { code: "00175", name: "Trung Hoà", full_name: "Phường Trung Hoà", district: { code: "005", name: "Cầu Giấy", full_name: "Quận Cầu Giấy", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "100 Đ. Trần Duy Hưng", picture: "/upload/picture/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg", block: false }, name: "Back End Developer (Java, MySQL, Spring)", career: { id: 14, name: "Công nghệ thông tin", majorCareers: [{ id: 2, point: 1.0 }] }, degree: { id: 3, name: "Đại học" }, experience: 5, minOffer: 10, maxOffer: 15, description: "LG CNS đang tìm kiếm các lập trình viên Back-End đủ tiêu chuẩn tham gia vào các dự án phát triển của công ty. Bạn sẽ phát triển trong việc phát triển ứng dụng web trong các lĩnh vực khác nhau, chẳng hạn như: AI Machine learning / Data , Security & Solution, DX...", requirement: "Có ít nhất 2 năm kinh nghiệm về JAVA (Ưu tiên kinh nghiệm cao)", benefit: "Lương, thưởng sẽ được thảo luận sau khi thông qua CV & Phỏng vấn", quantity: 5, ward: { code: "00199", name: "Láng Hạ", full_name: "Phường Láng Hạ", district: { code: "006", name: "Đống Đa", full_name: "Quận Đống Đa", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "171 Thái Hà", deadline: "2024-06-04", point: [0.24514516892273003, 0.17677669529663687, 0.02978630515460766, 0.132499735000795], distanceBest: 0.23245033549780986, distanceWorst: 0.19611613513818402, p: 0.45760960918652155 },
        // { id: 154, employer: { id: 604, email: "huong7@gmail.com", password: "$2a$10$pm4JwzFs64.tZJ1oHHxPCuGWt5.gYQGphmyrXhnd3mPguFleYUIN2", name: "huong7000", role: { name: "EMPLOYER", description: "Nhà tuyển dụng" }, dateOfBirth: "2024-05-02", phoneNumber: "0123456788", avatar: "/upload/avatar/images.jpg", companyName: "Công Ty TNHH LG CNS VIỆT NAM", ward: { code: "00175", name: "Trung Hoà", full_name: "Phường Trung Hoà", district: { code: "005", name: "Cầu Giấy", full_name: "Quận Cầu Giấy", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "100 Đ. Trần Duy Hưng", picture: "/upload/picture/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg", block: false }, name: "kế toán", career: { id: 35, name: "Kế toán / Kiểm toán", majorCareers: [{ id: 3, point: 0.2 }, { id: 1, point: 1.0 }] }, degree: { id: 2, name: "Cao đẳng" }, experience: 3, minOffer: 20, maxOffer: 22, description: "a", requirement: "b", benefit: "c", quantity: 2, ward: { code: "00001", name: "Phúc Xá", full_name: "Phường Phúc Xá", district: { code: "001", name: "Ba Đình", full_name: "Quận Ba Đình", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "10d", deadline: "2024-06-01", point: [0.049029033784546004, 0.17677669529663687, 0.24821920962173052, 0.211999576001272], distanceBest: 0.19611613513818402, distanceWorst: 0.23245033549780986, p: 0.5423903908134785 }, { id: 153, employer: { id: 604, email: "huong7@gmail.com", password: "$2a$10$pm4JwzFs64.tZJ1oHHxPCuGWt5.gYQGphmyrXhnd3mPguFleYUIN2", name: "huong7000", role: { name: "EMPLOYER", description: "Nhà tuyển dụng" }, dateOfBirth: "2024-05-02", phoneNumber: "0123456788", avatar: "/upload/avatar/images.jpg", companyName: "Công Ty TNHH LG CNS VIỆT NAM", ward: { code: "00175", name: "Trung Hoà", full_name: "Phường Trung Hoà", district: { code: "005", name: "Cầu Giấy", full_name: "Quận Cầu Giấy", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "100 Đ. Trần Duy Hưng", picture: "/upload/picture/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg", block: false }, name: "Back End Developer (Java, MySQL, Spring)", career: { id: 14, name: "Công nghệ thông tin", majorCareers: [{ id: 2, point: 1.0 }] }, degree: { id: 3, name: "Đại học" }, experience: 5, minOffer: 10, maxOffer: 15, description: "LG CNS đang tìm kiếm các lập trình viên Back-End đủ tiêu chuẩn tham gia vào các dự án phát triển của công ty. Bạn sẽ phát triển trong việc phát triển ứng dụng web trong các lĩnh vực khác nhau, chẳng hạn như: AI Machine learning / Data , Security & Solution, DX...", requirement: "Có ít nhất 2 năm kinh nghiệm về JAVA (Ưu tiên kinh nghiệm cao)", benefit: "Lương, thưởng sẽ được thảo luận sau khi thông qua CV & Phỏng vấn", quantity: 5, ward: { code: "00199", name: "Láng Hạ", full_name: "Phường Láng Hạ", district: { code: "006", name: "Đống Đa", full_name: "Quận Đống Đa", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "171 Thái Hà", deadline: "2024-06-04", point: [0.24514516892273003, 0.17677669529663687, 0.02978630515460766, 0.132499735000795], distanceBest: 0.23245033549780986, distanceWorst: 0.19611613513818402, p: 0.45760960918652155 },
        // { id: 154, employer: { id: 604, email: "huong7@gmail.com", password: "$2a$10$pm4JwzFs64.tZJ1oHHxPCuGWt5.gYQGphmyrXhnd3mPguFleYUIN2", name: "huong7000", role: { name: "EMPLOYER", description: "Nhà tuyển dụng" }, dateOfBirth: "2024-05-02", phoneNumber: "0123456788", avatar: "/upload/avatar/images.jpg", companyName: "Công Ty TNHH LG CNS VIỆT NAM", ward: { code: "00175", name: "Trung Hoà", full_name: "Phường Trung Hoà", district: { code: "005", name: "Cầu Giấy", full_name: "Quận Cầu Giấy", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "100 Đ. Trần Duy Hưng", picture: "/upload/picture/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg", block: false }, name: "kế toán", career: { id: 35, name: "Kế toán / Kiểm toán", majorCareers: [{ id: 3, point: 0.2 }, { id: 1, point: 1.0 }] }, degree: { id: 2, name: "Cao đẳng" }, experience: 3, minOffer: 20, maxOffer: 22, description: "a", requirement: "b", benefit: "c", quantity: 2, ward: { code: "00001", name: "Phúc Xá", full_name: "Phường Phúc Xá", district: { code: "001", name: "Ba Đình", full_name: "Quận Ba Đình", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "10d", deadline: "2024-06-01", point: [0.049029033784546004, 0.17677669529663687, 0.24821920962173052, 0.211999576001272], distanceBest: 0.19611613513818402, distanceWorst: 0.23245033549780986, p: 0.5423903908134785 }, { id: 153, employer: { id: 604, email: "huong7@gmail.com", password: "$2a$10$pm4JwzFs64.tZJ1oHHxPCuGWt5.gYQGphmyrXhnd3mPguFleYUIN2", name: "huong7000", role: { name: "EMPLOYER", description: "Nhà tuyển dụng" }, dateOfBirth: "2024-05-02", phoneNumber: "0123456788", avatar: "/upload/avatar/images.jpg", companyName: "Công Ty TNHH LG CNS VIỆT NAM", ward: { code: "00175", name: "Trung Hoà", full_name: "Phường Trung Hoà", district: { code: "005", name: "Cầu Giấy", full_name: "Quận Cầu Giấy", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "100 Đ. Trần Duy Hưng", picture: "/upload/picture/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg", block: false }, name: "Back End Developer (Java, MySQL, Spring)", career: { id: 14, name: "Công nghệ thông tin", majorCareers: [{ id: 2, point: 1.0 }] }, degree: { id: 3, name: "Đại học" }, experience: 5, minOffer: 10, maxOffer: 15, description: "LG CNS đang tìm kiếm các lập trình viên Back-End đủ tiêu chuẩn tham gia vào các dự án phát triển của công ty. Bạn sẽ phát triển trong việc phát triển ứng dụng web trong các lĩnh vực khác nhau, chẳng hạn như: AI Machine learning / Data , Security & Solution, DX...", requirement: "Có ít nhất 2 năm kinh nghiệm về JAVA (Ưu tiên kinh nghiệm cao)", benefit: "Lương, thưởng sẽ được thảo luận sau khi thông qua CV & Phỏng vấn", quantity: 5, ward: { code: "00199", name: "Láng Hạ", full_name: "Phường Láng Hạ", district: { code: "006", name: "Đống Đa", full_name: "Quận Đống Đa", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "171 Thái Hà", deadline: "2024-06-04", point: [0.24514516892273003, 0.17677669529663687, 0.02978630515460766, 0.132499735000795], distanceBest: 0.23245033549780986, distanceWorst: 0.19611613513818402, p: 0.45760960918652155 },
        // { id: 154, employer: { id: 604, email: "huong7@gmail.com", password: "$2a$10$pm4JwzFs64.tZJ1oHHxPCuGWt5.gYQGphmyrXhnd3mPguFleYUIN2", name: "huong7000", role: { name: "EMPLOYER", description: "Nhà tuyển dụng" }, dateOfBirth: "2024-05-02", phoneNumber: "0123456788", avatar: "/upload/avatar/images.jpg", companyName: "Công Ty TNHH LG CNS VIỆT NAM", ward: { code: "00175", name: "Trung Hoà", full_name: "Phường Trung Hoà", district: { code: "005", name: "Cầu Giấy", full_name: "Quận Cầu Giấy", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "100 Đ. Trần Duy Hưng", picture: "/upload/picture/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg", block: false }, name: "kế toán", career: { id: 35, name: "Kế toán / Kiểm toán", majorCareers: [{ id: 3, point: 0.2 }, { id: 1, point: 1.0 }] }, degree: { id: 2, name: "Cao đẳng" }, experience: 3, minOffer: 20, maxOffer: 22, description: "a", requirement: "b", benefit: "c", quantity: 2, ward: { code: "00001", name: "Phúc Xá", full_name: "Phường Phúc Xá", district: { code: "001", name: "Ba Đình", full_name: "Quận Ba Đình", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "10d", deadline: "2024-06-01", point: [0.049029033784546004, 0.17677669529663687, 0.24821920962173052, 0.211999576001272], distanceBest: 0.19611613513818402, distanceWorst: 0.23245033549780986, p: 0.5423903908134785 }, { id: 153, employer: { id: 604, email: "huong7@gmail.com", password: "$2a$10$pm4JwzFs64.tZJ1oHHxPCuGWt5.gYQGphmyrXhnd3mPguFleYUIN2", name: "huong7000", role: { name: "EMPLOYER", description: "Nhà tuyển dụng" }, dateOfBirth: "2024-05-02", phoneNumber: "0123456788", avatar: "/upload/avatar/images.jpg", companyName: "Công Ty TNHH LG CNS VIỆT NAM", ward: { code: "00175", name: "Trung Hoà", full_name: "Phường Trung Hoà", district: { code: "005", name: "Cầu Giấy", full_name: "Quận Cầu Giấy", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "100 Đ. Trần Duy Hưng", picture: "/upload/picture/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg", block: false }, name: "Back End Developer (Java, MySQL, Spring)", career: { id: 14, name: "Công nghệ thông tin", majorCareers: [{ id: 2, point: 1.0 }] }, degree: { id: 3, name: "Đại học" }, experience: 5, minOffer: 10, maxOffer: 15, description: "LG CNS đang tìm kiếm các lập trình viên Back-End đủ tiêu chuẩn tham gia vào các dự án phát triển của công ty. Bạn sẽ phát triển trong việc phát triển ứng dụng web trong các lĩnh vực khác nhau, chẳng hạn như: AI Machine learning / Data , Security & Solution, DX...", requirement: "Có ít nhất 2 năm kinh nghiệm về JAVA (Ưu tiên kinh nghiệm cao)", benefit: "Lương, thưởng sẽ được thảo luận sau khi thông qua CV & Phỏng vấn", quantity: 5, ward: { code: "00199", name: "Láng Hạ", full_name: "Phường Láng Hạ", district: { code: "006", name: "Đống Đa", full_name: "Quận Đống Đa", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "171 Thái Hà", deadline: "2024-06-04", point: [0.24514516892273003, 0.17677669529663687, 0.02978630515460766, 0.132499735000795], distanceBest: 0.23245033549780986, distanceWorst: 0.19611613513818402, p: 0.45760960918652155 },
        // { id: 154, employer: { id: 604, email: "huong7@gmail.com", password: "$2a$10$pm4JwzFs64.tZJ1oHHxPCuGWt5.gYQGphmyrXhnd3mPguFleYUIN2", name: "huong7000", role: { name: "EMPLOYER", description: "Nhà tuyển dụng" }, dateOfBirth: "2024-05-02", phoneNumber: "0123456788", avatar: "/upload/avatar/images.jpg", companyName: "Công Ty TNHH LG CNS VIỆT NAM", ward: { code: "00175", name: "Trung Hoà", full_name: "Phường Trung Hoà", district: { code: "005", name: "Cầu Giấy", full_name: "Quận Cầu Giấy", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "100 Đ. Trần Duy Hưng", picture: "/upload/picture/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg", block: false }, name: "kế toán", career: { id: 35, name: "Kế toán / Kiểm toán", majorCareers: [{ id: 3, point: 0.2 }, { id: 1, point: 1.0 }] }, degree: { id: 2, name: "Cao đẳng" }, experience: 3, minOffer: 20, maxOffer: 22, description: "a", requirement: "b", benefit: "c", quantity: 2, ward: { code: "00001", name: "Phúc Xá", full_name: "Phường Phúc Xá", district: { code: "001", name: "Ba Đình", full_name: "Quận Ba Đình", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "10d", deadline: "2024-06-01", point: [0.049029033784546004, 0.17677669529663687, 0.24821920962173052, 0.211999576001272], distanceBest: 0.19611613513818402, distanceWorst: 0.23245033549780986, p: 0.5423903908134785 }, { id: 153, employer: { id: 604, email: "huong7@gmail.com", password: "$2a$10$pm4JwzFs64.tZJ1oHHxPCuGWt5.gYQGphmyrXhnd3mPguFleYUIN2", name: "huong7000", role: { name: "EMPLOYER", description: "Nhà tuyển dụng" }, dateOfBirth: "2024-05-02", phoneNumber: "0123456788", avatar: "/upload/avatar/images.jpg", companyName: "Công Ty TNHH LG CNS VIỆT NAM", ward: { code: "00175", name: "Trung Hoà", full_name: "Phường Trung Hoà", district: { code: "005", name: "Cầu Giấy", full_name: "Quận Cầu Giấy", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "100 Đ. Trần Duy Hưng", picture: "/upload/picture/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg", block: false }, name: "Back End Developer (Java, MySQL, Spring)", career: { id: 14, name: "Công nghệ thông tin", majorCareers: [{ id: 2, point: 1.0 }] }, degree: { id: 3, name: "Đại học" }, experience: 5, minOffer: 10, maxOffer: 15, description: "LG CNS đang tìm kiếm các lập trình viên Back-End đủ tiêu chuẩn tham gia vào các dự án phát triển của công ty. Bạn sẽ phát triển trong việc phát triển ứng dụng web trong các lĩnh vực khác nhau, chẳng hạn như: AI Machine learning / Data , Security & Solution, DX...", requirement: "Có ít nhất 2 năm kinh nghiệm về JAVA (Ưu tiên kinh nghiệm cao)", benefit: "Lương, thưởng sẽ được thảo luận sau khi thông qua CV & Phỏng vấn", quantity: 5, ward: { code: "00199", name: "Láng Hạ", full_name: "Phường Láng Hạ", district: { code: "006", name: "Đống Đa", full_name: "Quận Đống Đa", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "171 Thái Hà", deadline: "2024-06-04", point: [0.24514516892273003, 0.17677669529663687, 0.02978630515460766, 0.132499735000795], distanceBest: 0.23245033549780986, distanceWorst: 0.19611613513818402, p: 0.45760960918652155 },
        // { id: 154, employer: { id: 604, email: "huong7@gmail.com", password: "$2a$10$pm4JwzFs64.tZJ1oHHxPCuGWt5.gYQGphmyrXhnd3mPguFleYUIN2", name: "huong7000", role: { name: "EMPLOYER", description: "Nhà tuyển dụng" }, dateOfBirth: "2024-05-02", phoneNumber: "0123456788", avatar: "/upload/avatar/images.jpg", companyName: "Công Ty kkkkkkkkkkkkkkkkkkkkTNHH LG CNS VIỆT NAM", ward: { code: "00175", name: "Trung Hoà", full_name: "Phường Trung Hoà", district: { code: "005", name: "Cầu Giấy", full_name: "Quận Cầu Giấy", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "100 Đ. Trần Duy Hưng", picture: "/upload/picture/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg", block: false }, name: "kế toán", career: { id: 35, name: "Kế toán / Kiểm toán", majorCareers: [{ id: 3, point: 0.2 }, { id: 1, point: 1.0 }] }, degree: { id: 2, name: "Cao đẳng" }, experience: 3, minOffer: 20, maxOffer: 22, description: "a", requirement: "b", benefit: "c", quantity: 2, ward: { code: "00001", name: "Phúc Xá", full_name: "Phường Phúc Xá", district: { code: "001", name: "Ba Đình", full_name: "Quận Ba Đình", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "10d", deadline: "2024-06-01", point: [0.049029033784546004, 0.17677669529663687, 0.24821920962173052, 0.211999576001272], distanceBest: 0.19611613513818402, distanceWorst: 0.23245033549780986, p: 0.5423903908134785 }, { id: 153, employer: { id: 604, email: "huong7@gmail.com", password: "$2a$10$pm4JwzFs64.tZJ1oHHxPCuGWt5.gYQGphmyrXhnd3mPguFleYUIN2", name: "huong7000", role: { name: "EMPLOYER", description: "Nhà tuyển dụng" }, dateOfBirth: "2024-05-02", phoneNumber: "0123456788", avatar: "/upload/avatar/images.jpg", companyName: "Công Ty TNHH LG CNS VIỆT NAM", ward: { code: "00175", name: "Trung Hoà", full_name: "Phường Trung Hoà", district: { code: "005", name: "Cầu Giấy", full_name: "Quận Cầu Giấy", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "100 Đ. Trần Duy Hưng", picture: "/upload/picture/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg", block: false }, name: "Back End Developer (Java, MySQL, Spring)", career: { id: 14, name: "Công nghệ thông tin", majorCareers: [{ id: 2, point: 1.0 }] }, degree: { id: 3, name: "Đại học" }, experience: 5, minOffer: 10, maxOffer: 15, description: "LG CNS đang tìm kiếm các lập trình viên Back-End đủ tiêu chuẩn tham gia vào các dự án phát triển của công ty. Bạn sẽ phát triển trong việc phát triển ứng dụng web trong các lĩnh vực khác nhau, chẳng hạn như: AI Machine learning / Data , Security & Solution, DX...", requirement: "Có ít nhất 2 năm kinh nghiệm về JAVA (Ưu tiên kinh nghiệm cao)", benefit: "Lương, thưởng sẽ được thảo luận sau khi thông qua CV & Phỏng vấn", quantity: 5, ward: { code: "00199", name: "Láng Hạ", full_name: "Phường Láng Hạ", district: { code: "006", name: "Đống Đa", full_name: "Quận Đống Đa", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "171 Thái Hà", deadline: "2024-06-04", point: [0.24514516892273003, 0.17677669529663687, 0.02978630515460766, 0.132499735000795], distanceBest: 0.23245033549780986, distanceWorst: 0.19611613513818402, p: 0.45760960918652155 },
        // { id: 154, employer: { id: 604, email: "huong7@gmail.com", password: "$2a$10$pm4JwzFs64.tZJ1oHHxPCuGWt5.gYQGphmyrXhnd3mPguFleYUIN2", name: "huong7000", role: { name: "EMPLOYER", description: "Nhà tuyển dụng" }, dateOfBirth: "2024-05-02", phoneNumber: "0123456788", avatar: "/upload/avatar/images.jpg", companyName: "Công Ty TNHH LG CNS VIỆT NAM", ward: { code: "00175", name: "Trung Hoà", full_name: "Phường Trung Hoà", district: { code: "005", name: "Cầu Giấy", full_name: "Quận Cầu Giấy", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "100 Đ. Trần Duy Hưng", picture: "/upload/picture/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg", block: false }, name: "kế toán", career: { id: 35, name: "Kế toán / Kiểm toán", majorCareers: [{ id: 3, point: 0.2 }, { id: 1, point: 1.0 }] }, degree: { id: 2, name: "Cao đẳng" }, experience: 3, minOffer: 20, maxOffer: 22, description: "a", requirement: "b", benefit: "c", quantity: 2, ward: { code: "00001", name: "Phúc Xá", full_name: "Phường Phúc Xá", district: { code: "001", name: "Ba Đình", full_name: "Quận Ba Đình", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "10d", deadline: "2024-06-01", point: [0.049029033784546004, 0.17677669529663687, 0.24821920962173052, 0.211999576001272], distanceBest: 0.19611613513818402, distanceWorst: 0.23245033549780986, p: 0.5423903908134785 }, { id: 153, employer: { id: 604, email: "huong7@gmail.com", password: "$2a$10$pm4JwzFs64.tZJ1oHHxPCuGWt5.gYQGphmyrXhnd3mPguFleYUIN2", name: "huong7000", role: { name: "EMPLOYER", description: "Nhà tuyển dụng" }, dateOfBirth: "2024-05-02", phoneNumber: "0123456788", avatar: "/upload/avatar/images.jpg", companyName: "Công Ty TNHH LG CNS VIỆT NAM", ward: { code: "00175", name: "Trung Hoà", full_name: "Phường Trung Hoà", district: { code: "005", name: "Cầu Giấy", full_name: "Quận Cầu Giấy", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "100 Đ. Trần Duy Hưng", picture: "/upload/picture/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg", block: false }, name: "Back End Developer (Java, MySQL, Spring)", career: { id: 14, name: "Công nghệ thông tin", majorCareers: [{ id: 2, point: 1.0 }] }, degree: { id: 3, name: "Đại học" }, experience: 5, minOffer: 10, maxOffer: 15, description: "LG CNS đang tìm kiếm các lập trình viên Back-End đủ tiêu chuẩn tham gia vào các dự án phát triển của công ty. Bạn sẽ phát triển trong việc phát triển ứng dụng web trong các lĩnh vực khác nhau, chẳng hạn như: AI Machine learning / Data , Security & Solution, DX...", requirement: "Có ít nhất 2 năm kinh nghiệm về JAVA (Ưu tiên kinh nghiệm cao)", benefit: "Lương, thưởng sẽ được thảo luận sau khi thông qua CV & Phỏng vấn", quantity: 5, ward: { code: "00199", name: "Láng Hạ", full_name: "Phường Láng Hạ", district: { code: "006", name: "Đống Đa", full_name: "Quận Đống Đa", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "171 Thái Hà", deadline: "2024-06-04", point: [0.24514516892273003, 0.17677669529663687, 0.02978630515460766, 0.132499735000795], distanceBest: 0.23245033549780986, distanceWorst: 0.19611613513818402, p: 0.45760960918652155 },
        // { id: 154, employer: { id: 604, email: "huong7@gmail.com", password: "$2a$10$pm4JwzFs64.tZJ1oHHxPCuGWt5.gYQGphmyrXhnd3mPguFleYUIN2", name: "huong7000", role: { name: "EMPLOYER", description: "Nhà tuyển dụng" }, dateOfBirth: "2024-05-02", phoneNumber: "0123456788", avatar: "/upload/avatar/images.jpg", companyName: "Công Ty TNHH LG CNS VIỆT NAM", ward: { code: "00175", name: "Trung Hoà", full_name: "Phường Trung Hoà", district: { code: "005", name: "Cầu Giấy", full_name: "Quận Cầu Giấy", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "100 Đ. Trần Duy Hưng", picture: "/upload/picture/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg", block: false }, name: "kế toán", career: { id: 35, name: "Kế toán / Kiểm toán", majorCareers: [{ id: 3, point: 0.2 }, { id: 1, point: 1.0 }] }, degree: { id: 2, name: "Cao đẳng" }, experience: 3, minOffer: 20, maxOffer: 22, description: "a", requirement: "b", benefit: "c", quantity: 2, ward: { code: "00001", name: "Phúc Xá", full_name: "Phường Phúc Xá", district: { code: "001", name: "Ba Đình", full_name: "Quận Ba Đình", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "10d", deadline: "2024-06-01", point: [0.049029033784546004, 0.17677669529663687, 0.24821920962173052, 0.211999576001272], distanceBest: 0.19611613513818402, distanceWorst: 0.23245033549780986, p: 0.5423903908134785 }, { id: 153, employer: { id: 604, email: "huong7@gmail.com", password: "$2a$10$pm4JwzFs64.tZJ1oHHxPCuGWt5.gYQGphmyrXhnd3mPguFleYUIN2", name: "huong7000", role: { name: "EMPLOYER", description: "Nhà tuyển dụng" }, dateOfBirth: "2024-05-02", phoneNumber: "0123456788", avatar: "/upload/avatar/images.jpg", companyName: "Công Ty TNHH LG CNS VIỆT NAM", ward: { code: "00175", name: "Trung Hoà", full_name: "Phường Trung Hoà", district: { code: "005", name: "Cầu Giấy", full_name: "Quận Cầu Giấy", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "100 Đ. Trần Duy Hưng", picture: "/upload/picture/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg", block: false }, name: "Back End Developer (Java, MySQL, Spring)", career: { id: 14, name: "Công nghệ thông tin", majorCareers: [{ id: 2, point: 1.0 }] }, degree: { id: 3, name: "Đại học" }, experience: 5, minOffer: 10, maxOffer: 15, description: "LG CNS đang tìm kiếm các lập trình viên Back-End đủ tiêu chuẩn tham gia vào các dự án phát triển của công ty. Bạn sẽ phát triển trong việc phát triển ứng dụng web trong các lĩnh vực khác nhau, chẳng hạn như: AI Machine learning / Data , Security & Solution, DX...", requirement: "Có ít nhất 2 năm kinh nghiệm về JAVA (Ưu tiên kinh nghiệm cao)", benefit: "Lương, thưởng sẽ được thảo luận sau khi thông qua CV & Phỏng vấn", quantity: 5, ward: { code: "00199", name: "Láng Hạ", full_name: "Phường Láng Hạ", district: { code: "006", name: "Đống Đa", full_name: "Quận Đống Đa", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "171 Thái Hà", deadline: "2024-06-04", point: [0.24514516892273003, 0.17677669529663687, 0.02978630515460766, 0.132499735000795], distanceBest: 0.23245033549780986, distanceWorst: 0.19611613513818402, p: 0.45760960918652155 },
        // { id: 154, employer: { id: 604, email: "huong7@gmail.com", password: "$2a$10$pm4JwzFs64.tZJ1oHHxPCuGWt5.gYQGphmyrXhnd3mPguFleYUIN2", name: "huong7000", role: { name: "EMPLOYER", description: "Nhà tuyển dụng" }, dateOfBirth: "2024-05-02", phoneNumber: "0123456788", avatar: "/upload/avatar/images.jpg", companyName: "Công Ty TNHH LG CNS VIỆT NAM", ward: { code: "00175", name: "Trung Hoà", full_name: "Phường Trung Hoà", district: { code: "005", name: "Cầu Giấy", full_name: "Quận Cầu Giấy", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "100 Đ. Trần Duy Hưng", picture: "/upload/picture/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg", block: false }, name: "kế toán", career: { id: 35, name: "Kế toán / Kiểm toán", majorCareers: [{ id: 3, point: 0.2 }, { id: 1, point: 1.0 }] }, degree: { id: 2, name: "Cao đẳng" }, experience: 3, minOffer: 20, maxOffer: 22, description: "a", requirement: "b", benefit: "c", quantity: 2, ward: { code: "00001", name: "Phúc Xá", full_name: "Phường Phúc Xá", district: { code: "001", name: "Ba Đình", full_name: "Quận Ba Đình", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "10d", deadline: "2024-06-01", point: [0.049029033784546004, 0.17677669529663687, 0.24821920962173052, 0.211999576001272], distanceBest: 0.19611613513818402, distanceWorst: 0.23245033549780986, p: 0.5423903908134785 }, { id: 153, employer: { id: 604, email: "huong7@gmail.com", password: "$2a$10$pm4JwzFs64.tZJ1oHHxPCuGWt5.gYQGphmyrXhnd3mPguFleYUIN2", name: "huong7000", role: { name: "EMPLOYER", description: "Nhà tuyển dụng" }, dateOfBirth: "2024-05-02", phoneNumber: "0123456788", avatar: "/upload/avatar/images.jpg", companyName: "Công Ty TNHH LG CNS VIỆT NAM", ward: { code: "00175", name: "Trung Hoà", full_name: "Phường Trung Hoà", district: { code: "005", name: "Cầu Giấy", full_name: "Quận Cầu Giấy", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "100 Đ. Trần Duy Hưng", picture: "/upload/picture/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg", block: false }, name: "Back End Developer (Java, MySQL, Spring)", career: { id: 14, name: "Công nghệ thông tin", majorCareers: [{ id: 2, point: 1.0 }] }, degree: { id: 3, name: "Đại học" }, experience: 5, minOffer: 10, maxOffer: 15, description: "LG CNS đang tìm kiếm các lập trình viên Back-End đủ tiêu chuẩn tham gia vào các dự án phát triển của công ty. Bạn sẽ phát triển trong việc phát triển ứng dụng web trong các lĩnh vực khác nhau, chẳng hạn như: AI Machine learning / Data , Security & Solution, DX...", requirement: "Có ít nhất 2 năm kinh nghiệm về JAVA (Ưu tiên kinh nghiệm cao)", benefit: "Lương, thưởng sẽ được thảo luận sau khi thông qua CV & Phỏng vấn", quantity: 5, ward: { code: "00199", name: "Láng Hạ", full_name: "Phường Láng Hạ", district: { code: "006", name: "Đống Đa", full_name: "Quận Đống Đa", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "171 Thái Hà", deadline: "2024-06-04", point: [0.24514516892273003, 0.17677669529663687, 0.02978630515460766, 0.132499735000795], distanceBest: 0.23245033549780986, distanceWorst: 0.19611613513818402, p: 0.45760960918652155 },
        // { id: 154, employer: { id: 604, email: "huong7@gmail.com", password: "$2a$10$pm4JwzFs64.tZJ1oHHxPCuGWt5.gYQGphmyrXhnd3mPguFleYUIN2", name: "huong7000", role: { name: "EMPLOYER", description: "Nhà tuyển dụng" }, dateOfBirth: "2024-05-02", phoneNumber: "0123456788", avatar: "/upload/avatar/images.jpg", companyName: "Công Ty TNHH LG CNS VIỆT NAM", ward: { code: "00175", name: "Trung Hoà", full_name: "Phường Trung Hoà", district: { code: "005", name: "Cầu Giấy", full_name: "Quận Cầu Giấy", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "100 Đ. Trần Duy Hưng", picture: "/upload/picture/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg", block: false }, name: "kế toán", career: { id: 35, name: "Kế toán / Kiểm toán", majorCareers: [{ id: 3, point: 0.2 }, { id: 1, point: 1.0 }] }, degree: { id: 2, name: "Cao đẳng" }, experience: 3, minOffer: 20, maxOffer: 22, description: "a", requirement: "b", benefit: "c", quantity: 2, ward: { code: "00001", name: "Phúc Xá", full_name: "Phường Phúc Xá", district: { code: "001", name: "Ba Đình", full_name: "Quận Ba Đình", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "10d", deadline: "2024-06-01", point: [0.049029033784546004, 0.17677669529663687, 0.24821920962173052, 0.211999576001272], distanceBest: 0.19611613513818402, distanceWorst: 0.23245033549780986, p: 0.5423903908134785 }, { id: 153, employer: { id: 604, email: "huong7@gmail.com", password: "$2a$10$pm4JwzFs64.tZJ1oHHxPCuGWt5.gYQGphmyrXhnd3mPguFleYUIN2", name: "huong7000", role: { name: "EMPLOYER", description: "Nhà tuyển dụng" }, dateOfBirth: "2024-05-02", phoneNumber: "0123456788", avatar: "/upload/avatar/images.jpg", companyName: "Công Ty TNHH LG CNS VIỆT NAM", ward: { code: "00175", name: "Trung Hoà", full_name: "Phường Trung Hoà", district: { code: "005", name: "Cầu Giấy", full_name: "Quận Cầu Giấy", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "100 Đ. Trần Duy Hưng", picture: "/upload/picture/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg", block: false }, name: "Back End Developer (Java, MySQL, Spring)", career: { id: 14, name: "Công nghệ thông tin", majorCareers: [{ id: 2, point: 1.0 }] }, degree: { id: 3, name: "Đại học" }, experience: 5, minOffer: 10, maxOffer: 15, description: "LG CNS đang tìm kiếm các lập trình viên Back-End đủ tiêu chuẩn tham gia vào các dự án phát triển của công ty. Bạn sẽ phát triển trong việc phát triển ứng dụng web trong các lĩnh vực khác nhau, chẳng hạn như: AI Machine learning / Data , Security & Solution, DX...", requirement: "Có ít nhất 2 năm kinh nghiệm về JAVA (Ưu tiên kinh nghiệm cao)", benefit: "Lương, thưởng sẽ được thảo luận sau khi thông qua CV & Phỏng vấn", quantity: 5, ward: { code: "00199", name: "Láng Hạ", full_name: "Phường Láng Hạ", district: { code: "006", name: "Đống Đa", full_name: "Quận Đống Đa", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "171 Thái Hà", deadline: "2024-06-04", point: [0.24514516892273003, 0.17677669529663687, 0.02978630515460766, 0.132499735000795], distanceBest: 0.23245033549780986, distanceWorst: 0.19611613513818402, p: 0.45760960918652155 },
        // { id: 154, employer: { id: 604, email: "huong7@gmail.com", password: "$2a$10$pm4JwzFs64.tZJ1oHHxPCuGWt5.gYQGphmyrXhnd3mPguFleYUIN2", name: "huong7000", role: { name: "EMPLOYER", description: "Nhà tuyển dụng" }, dateOfBirth: "2024-05-02", phoneNumber: "0123456788", avatar: "/upload/avatar/images.jpg", companyName: "Công Ty TNHH LG CNS VIỆT NAM", ward: { code: "00175", name: "Trung Hoà", full_name: "Phường Trung Hoà", district: { code: "005", name: "Cầu Giấy", full_name: "Quận Cầu Giấy", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "100 Đ. Trần Duy Hưng", picture: "/upload/picture/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg", block: false }, name: "kế toán", career: { id: 35, name: "Kế toán / Kiểm toán", majorCareers: [{ id: 3, point: 0.2 }, { id: 1, point: 1.0 }] }, degree: { id: 2, name: "Cao đẳng" }, experience: 3, minOffer: 20, maxOffer: 22, description: "a", requirement: "b", benefit: "c", quantity: 2, ward: { code: "00001", name: "Phúc Xá", full_name: "Phường Phúc Xá", district: { code: "001", name: "Ba Đình", full_name: "Quận Ba Đình", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "10d", deadline: "2024-06-01", point: [0.049029033784546004, 0.17677669529663687, 0.24821920962173052, 0.211999576001272], distanceBest: 0.19611613513818402, distanceWorst: 0.23245033549780986, p: 0.5423903908134785 }, { id: 153, employer: { id: 604, email: "huong7@gmail.com", password: "$2a$10$pm4JwzFs64.tZJ1oHHxPCuGWt5.gYQGphmyrXhnd3mPguFleYUIN2", name: "huong7000", role: { name: "EMPLOYER", description: "Nhà tuyển dụng" }, dateOfBirth: "2024-05-02", phoneNumber: "0123456788", avatar: "/upload/avatar/images.jpg", companyName: "Công Ty TNHH LG CNS VIỆT NAM", ward: { code: "00175", name: "Trung Hoà", full_name: "Phường Trung Hoà", district: { code: "005", name: "Cầu Giấy", full_name: "Quận Cầu Giấy", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "100 Đ. Trần Duy Hưng", picture: "/upload/picture/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg", block: false }, name: "Back End Developer (Java, MySQL, Spring)", career: { id: 14, name: "Công nghệ thông tin", majorCareers: [{ id: 2, point: 1.0 }] }, degree: { id: 3, name: "Đại học" }, experience: 5, minOffer: 10, maxOffer: 15, description: "LG CNS đang tìm kiếm các lập trình viên Back-End đủ tiêu chuẩn tham gia vào các dự án phát triển của công ty. Bạn sẽ phát triển trong việc phát triển ứng dụng web trong các lĩnh vực khác nhau, chẳng hạn như: AI Machine learning / Data , Security & Solution, DX...", requirement: "Có ít nhất 2 năm kinh nghiệm về JAVA (Ưu tiên kinh nghiệm cao)", benefit: "Lương, thưởng sẽ được thảo luận sau khi thông qua CV & Phỏng vấn", quantity: 5, ward: { code: "00199", name: "Láng Hạ", full_name: "Phường Láng Hạ", district: { code: "006", name: "Đống Đa", full_name: "Quận Đống Đa", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "171 Thái Hà", deadline: "2024-06-04", point: [0.24514516892273003, 0.17677669529663687, 0.02978630515460766, 0.132499735000795], distanceBest: 0.23245033549780986, distanceWorst: 0.19611613513818402, p: 0.45760960918652155 },
        // { id: 154, employer: { id: 604, email: "huong7@gmail.com", password: "$2a$10$pm4JwzFs64.tZJ1oHHxPCuGWt5.gYQGphmyrXhnd3mPguFleYUIN2", name: "huong7000", role: { name: "EMPLOYER", description: "Nhà tuyển dụng" }, dateOfBirth: "2024-05-02", phoneNumber: "0123456788", avatar: "/upload/avatar/images.jpg", companyName: "Công Ty TNHH LG CNS VIỆT NAM", ward: { code: "00175", name: "Trung Hoà", full_name: "Phường Trung Hoà", district: { code: "005", name: "Cầu Giấy", full_name: "Quận Cầu Giấy", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "100 Đ. Trần Duy Hưng", picture: "/upload/picture/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg", block: false }, name: "kế toán", career: { id: 35, name: "Kế toán / Kiểm toán", majorCareers: [{ id: 3, point: 0.2 }, { id: 1, point: 1.0 }] }, degree: { id: 2, name: "Cao đẳng" }, experience: 3, minOffer: 20, maxOffer: 22, description: "a", requirement: "b", benefit: "c", quantity: 2, ward: { code: "00001", name: "Phúc Xá", full_name: "Phường Phúc Xá", district: { code: "001", name: "Ba Đình", full_name: "Quận Ba Đình", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "10d", deadline: "2024-06-01", point: [0.049029033784546004, 0.17677669529663687, 0.24821920962173052, 0.211999576001272], distanceBest: 0.19611613513818402, distanceWorst: 0.23245033549780986, p: 0.5423903908134785 }, { id: 153, employer: { id: 604, email: "huong7@gmail.com", password: "$2a$10$pm4JwzFs64.tZJ1oHHxPCuGWt5.gYQGphmyrXhnd3mPguFleYUIN2", name: "huong7000", role: { name: "EMPLOYER", description: "Nhà tuyển dụng" }, dateOfBirth: "2024-05-02", phoneNumber: "0123456788", avatar: "/upload/avatar/images.jpg", companyName: "Công Ty TNHH LG CNS VIỆT NAM", ward: { code: "00175", name: "Trung Hoà", full_name: "Phường Trung Hoà", district: { code: "005", name: "Cầu Giấy", full_name: "Quận Cầu Giấy", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "100 Đ. Trần Duy Hưng", picture: "/upload/picture/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg", block: false }, name: "Back End Developer (Java, MySQL, Spring)", career: { id: 14, name: "Công nghệ thông tin", majorCareers: [{ id: 2, point: 1.0 }] }, degree: { id: 3, name: "Đại học" }, experience: 5, minOffer: 10, maxOffer: 15, description: "LG CNS đang tìm kiếm các lập trình viên Back-End đủ tiêu chuẩn tham gia vào các dự án phát triển của công ty. Bạn sẽ phát triển trong việc phát triển ứng dụng web trong các lĩnh vực khác nhau, chẳng hạn như: AI Machine learning / Data , Security & Solution, DX...", requirement: "Có ít nhất 2 năm kinh nghiệm về JAVA (Ưu tiên kinh nghiệm cao)", benefit: "Lương, thưởng sẽ được thảo luận sau khi thông qua CV & Phỏng vấn", quantity: 5, ward: { code: "00199", name: "Láng Hạ", full_name: "Phường Láng Hạ", district: { code: "006", name: "Đống Đa", full_name: "Quận Đống Đa", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "171 Thái Hà", deadline: "2024-06-04", point: [0.24514516892273003, 0.17677669529663687, 0.02978630515460766, 0.132499735000795], distanceBest: 0.23245033549780986, distanceWorst: 0.19611613513818402, p: 0.45760960918652155 },
        // { id: 154, employer: { id: 604, email: "huong7@gmail.com", password: "$2a$10$pm4JwzFs64.tZJ1oHHxPCuGWt5.gYQGphmyrXhnd3mPguFleYUIN2", name: "huong7000", role: { name: "EMPLOYER", description: "Nhà tuyển dụng" }, dateOfBirth: "2024-05-02", phoneNumber: "0123456788", avatar: "/upload/avatar/images.jpg", companyName: "Công Ty TNHH LG CNS VIỆT NAM", ward: { code: "00175", name: "Trung Hoà", full_name: "Phường Trung Hoà", district: { code: "005", name: "Cầu Giấy", full_name: "Quận Cầu Giấy", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "100 Đ. Trần Duy Hưng", picture: "/upload/picture/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg", block: false }, name: "kế toán", career: { id: 35, name: "Kế toán / Kiểm toán", majorCareers: [{ id: 3, point: 0.2 }, { id: 1, point: 1.0 }] }, degree: { id: 2, name: "Cao đẳng" }, experience: 3, minOffer: 20, maxOffer: 22, description: "a", requirement: "b", benefit: "c", quantity: 2, ward: { code: "00001", name: "Phúc Xá", full_name: "Phường Phúc Xá", district: { code: "001", name: "Ba Đình", full_name: "Quận Ba Đình", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "10d", deadline: "2024-06-01", point: [0.049029033784546004, 0.17677669529663687, 0.24821920962173052, 0.211999576001272], distanceBest: 0.19611613513818402, distanceWorst: 0.23245033549780986, p: 0.5423903908134785 }, { id: 153, employer: { id: 604, email: "huong7@gmail.com", password: "$2a$10$pm4JwzFs64.tZJ1oHHxPCuGWt5.gYQGphmyrXhnd3mPguFleYUIN2", name: "huong7000", role: { name: "EMPLOYER", description: "Nhà tuyển dụng" }, dateOfBirth: "2024-05-02", phoneNumber: "0123456788", avatar: "/upload/avatar/images.jpg", companyName: "Công Ty TNHH LG CNS VIỆT NAM", ward: { code: "00175", name: "Trung Hoà", full_name: "Phường Trung Hoà", district: { code: "005", name: "Cầu Giấy", full_name: "Quận Cầu Giấy", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "100 Đ. Trần Duy Hưng", picture: "/upload/picture/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg", block: false }, name: "Back End Developer (Java, MySQL, Spring)", career: { id: 14, name: "Công nghệ thông tin", majorCareers: [{ id: 2, point: 1.0 }] }, degree: { id: 3, name: "Đại học" }, experience: 5, minOffer: 10, maxOffer: 15, description: "LG CNS đang tìm kiếm các lập trình viên Back-End đủ tiêu chuẩn tham gia vào các dự án phát triển của công ty. Bạn sẽ phát triển trong việc phát triển ứng dụng web trong các lĩnh vực khác nhau, chẳng hạn như: AI Machine learning / Data , Security & Solution, DX...", requirement: "Có ít nhất 2 năm kinh nghiệm về JAVA (Ưu tiên kinh nghiệm cao)", benefit: "Lương, thưởng sẽ được thảo luận sau khi thông qua CV & Phỏng vấn", quantity: 5, ward: { code: "00199", name: "Láng Hạ", full_name: "Phường Láng Hạ", district: { code: "006", name: "Đống Đa", full_name: "Quận Đống Đa", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "171 Thái Hà", deadline: "2024-06-04", point: [0.24514516892273003, 0.17677669529663687, 0.02978630515460766, 0.132499735000795], distanceBest: 0.23245033549780986, distanceWorst: 0.19611613513818402, p: 0.45760960918652155 },
        // { id: 154, employer: { id: 604, email: "huong7@gmail.com", password: "$2a$10$pm4JwzFs64.tZJ1oHHxPCuGWt5.gYQGphmyrXhnd3mPguFleYUIN2", name: "huong7000", role: { name: "EMPLOYER", description: "Nhà tuyển dụng" }, dateOfBirth: "2024-05-02", phoneNumber: "0123456788", avatar: "/upload/avatar/images.jpg", companyName: "Công Ty TNHH LG CNS VIỆT NAM", ward: { code: "00175", name: "Trung Hoà", full_name: "Phường Trung Hoà", district: { code: "005", name: "Cầu Giấy", full_name: "Quận Cầu Giấy", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "100 Đ. Trần Duy Hưng", picture: "/upload/picture/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg", block: false }, name: "kế toán", career: { id: 35, name: "Kế toán / Kiểm toán", majorCareers: [{ id: 3, point: 0.2 }, { id: 1, point: 1.0 }] }, degree: { id: 2, name: "Cao đẳng" }, experience: 3, minOffer: 20, maxOffer: 22, description: "a", requirement: "b", benefit: "c", quantity: 2, ward: { code: "00001", name: "Phúc Xá", full_name: "Phường Phúc Xá", district: { code: "001", name: "Ba Đình", full_name: "Quận Ba Đình", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "10d", deadline: "2024-06-01", point: [0.049029033784546004, 0.17677669529663687, 0.24821920962173052, 0.211999576001272], distanceBest: 0.19611613513818402, distanceWorst: 0.23245033549780986, p: 0.5423903908134785 }, { id: 153, employer: { id: 604, email: "huong7@gmail.com", password: "$2a$10$pm4JwzFs64.tZJ1oHHxPCuGWt5.gYQGphmyrXhnd3mPguFleYUIN2", name: "huong7000", role: { name: "EMPLOYER", description: "Nhà tuyển dụng" }, dateOfBirth: "2024-05-02", phoneNumber: "0123456788", avatar: "/upload/avatar/images.jpg", companyName: "Công Ty TNHH LG CNS VIỆT NAM", ward: { code: "00175", name: "Trung Hoà", full_name: "Phường Trung Hoà", district: { code: "005", name: "Cầu Giấy", full_name: "Quận Cầu Giấy", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "100 Đ. Trần Duy Hưng", picture: "/upload/picture/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg", block: false }, name: "Back End Developer (Java, MySQL, Spring)", career: { id: 14, name: "Công nghệ thông tin", majorCareers: [{ id: 2, point: 1.0 }] }, degree: { id: 3, name: "Đại học" }, experience: 5, minOffer: 10, maxOffer: 15, description: "LG CNS đang tìm kiếm các lập trình viên Back-End đủ tiêu chuẩn tham gia vào các dự án phát triển của công ty. Bạn sẽ phát triển trong việc phát triển ứng dụng web trong các lĩnh vực khác nhau, chẳng hạn như: AI Machine learning / Data , Security & Solution, DX...", requirement: "Có ít nhất 2 năm kinh nghiệm về JAVA (Ưu tiên kinh nghiệm cao)", benefit: "Lương, thưởng sẽ được thảo luận sau khi thông qua CV & Phỏng vấn", quantity: 5, ward: { code: "00199", name: "Láng Hạ", full_name: "Phường Láng Hạ", district: { code: "006", name: "Đống Đa", full_name: "Quận Đống Đa", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "171 Thái Hà", deadline: "2024-06-04", point: [0.24514516892273003, 0.17677669529663687, 0.02978630515460766, 0.132499735000795], distanceBest: 0.23245033549780986, distanceWorst: 0.19611613513818402, p: 0.45760960918652155 },
        // { id: 154, employer: { id: 604, email: "huong7@gmail.com", password: "$2a$10$pm4JwzFs64.tZJ1oHHxPCuGWt5.gYQGphmyrXhnd3mPguFleYUIN2", name: "huong7000", role: { name: "EMPLOYER", description: "Nhà tuyển dụng" }, dateOfBirth: "2024-05-02", phoneNumber: "0123456788", avatar: "/upload/avatar/images.jpg", companyName: "Công Ty TNHH LG CNS VIỆT NAM", ward: { code: "00175", name: "Trung Hoà", full_name: "Phường Trung Hoà", district: { code: "005", name: "Cầu Giấy", full_name: "Quận Cầu Giấy", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "100 Đ. Trần Duy Hưng", picture: "/upload/picture/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg", block: false }, name: "kế toán", career: { id: 35, name: "Kế toán / Kiểm toán", majorCareers: [{ id: 3, point: 0.2 }, { id: 1, point: 1.0 }] }, degree: { id: 2, name: "Cao đẳng" }, experience: 3, minOffer: 20, maxOffer: 22, description: "a", requirement: "b", benefit: "c", quantity: 2, ward: { code: "00001", name: "Phúc Xá", full_name: "Phường Phúc Xá", district: { code: "001", name: "Ba Đình", full_name: "Quận Ba Đình", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "10d", deadline: "2024-06-01", point: [0.049029033784546004, 0.17677669529663687, 0.24821920962173052, 0.211999576001272], distanceBest: 0.19611613513818402, distanceWorst: 0.23245033549780986, p: 0.5423903908134785 }, { id: 153, employer: { id: 604, email: "huong7@gmail.com", password: "$2a$10$pm4JwzFs64.tZJ1oHHxPCuGWt5.gYQGphmyrXhnd3mPguFleYUIN2", name: "huong7000", role: { name: "EMPLOYER", description: "Nhà tuyển dụng" }, dateOfBirth: "2024-05-02", phoneNumber: "0123456788", avatar: "/upload/avatar/images.jpg", companyName: "Công Ty TNHH LG CNS VIỆT NAM", ward: { code: "00175", name: "Trung Hoà", full_name: "Phường Trung Hoà", district: { code: "005", name: "Cầu Giấy", full_name: "Quận Cầu Giấy", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "100 Đ. Trần Duy Hưng", picture: "/upload/picture/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg", block: false }, name: "Back End Developer (Java, MySQL, Spring)", career: { id: 14, name: "Công nghệ thông tin", majorCareers: [{ id: 2, point: 1.0 }] }, degree: { id: 3, name: "Đại học" }, experience: 5, minOffer: 10, maxOffer: 15, description: "LG CNS đang tìm kiếm các lập trình viên Back-End đủ tiêu chuẩn tham gia vào các dự án phát triển của công ty. Bạn sẽ phát triển trong việc phát triển ứng dụng web trong các lĩnh vực khác nhau, chẳng hạn như: AI Machine learning / Data , Security & Solution, DX...", requirement: "Có ít nhất 2 năm kinh nghiệm về JAVA (Ưu tiên kinh nghiệm cao)", benefit: "Lương, thưởng sẽ được thảo luận sau khi thông qua CV & Phỏng vấn", quantity: 5, ward: { code: "00199", name: "Láng Hạ", full_name: "Phường Láng Hạ", district: { code: "006", name: "Đống Đa", full_name: "Quận Đống Đa", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "171 Thái Hà", deadline: "2024-06-04", point: [0.24514516892273003, 0.17677669529663687, 0.02978630515460766, 0.132499735000795], distanceBest: 0.23245033549780986, distanceWorst: 0.19611613513818402, p: 0.45760960918652155 },
        // { id: 154, employer: { id: 604, email: "huong7@gmail.com", password: "$2a$10$pm4JwzFs64.tZJ1oHHxPCuGWt5.gYQGphmyrXhnd3mPguFleYUIN2", name: "huong7000", role: { name: "EMPLOYER", description: "Nhà tuyển dụng" }, dateOfBirth: "2024-05-02", phoneNumber: "0123456788", avatar: "/upload/avatar/images.jpg", companyName: "Công Ty TNHH LG CNS VIỆT NAM", ward: { code: "00175", name: "Trung Hoà", full_name: "Phường Trung Hoà", district: { code: "005", name: "Cầu Giấy", full_name: "Quận Cầu Giấy", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "100 Đ. Trần Duy Hưng", picture: "/upload/picture/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg", block: false }, name: "kế toán", career: { id: 35, name: "Kế toán / Kiểm toán", majorCareers: [{ id: 3, point: 0.2 }, { id: 1, point: 1.0 }] }, degree: { id: 2, name: "Cao đẳng" }, experience: 3, minOffer: 20, maxOffer: 22, description: "a", requirement: "b", benefit: "c", quantity: 2, ward: { code: "00001", name: "Phúc Xá", full_name: "Phường Phúc Xá", district: { code: "001", name: "Ba Đình", full_name: "Quận Ba Đình", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "10d", deadline: "2024-06-01", point: [0.049029033784546004, 0.17677669529663687, 0.24821920962173052, 0.211999576001272], distanceBest: 0.19611613513818402, distanceWorst: 0.23245033549780986, p: 0.5423903908134785 }, { id: 153, employer: { id: 604, email: "huong7@gmail.com", password: "$2a$10$pm4JwzFs64.tZJ1oHHxPCuGWt5.gYQGphmyrXhnd3mPguFleYUIN2", name: "huong7000", role: { name: "EMPLOYER", description: "Nhà tuyển dụng" }, dateOfBirth: "2024-05-02", phoneNumber: "0123456788", avatar: "/upload/avatar/images.jpg", companyName: "Công Ty TNHH LG CNS VIỆT NAM", ward: { code: "00175", name: "Trung Hoà", full_name: "Phường Trung Hoà", district: { code: "005", name: "Cầu Giấy", full_name: "Quận Cầu Giấy", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "100 Đ. Trần Duy Hưng", picture: "/upload/picture/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg", block: false }, name: "Back End Developer (Java, MySQL, Spring)", career: { id: 14, name: "Công nghệ thông tin", majorCareers: [{ id: 2, point: 1.0 }] }, degree: { id: 3, name: "Đại học" }, experience: 5, minOffer: 10, maxOffer: 15, description: "LG CNS đang tìm kiếm các lập trình viên Back-End đủ tiêu chuẩn tham gia vào các dự án phát triển của công ty. Bạn sẽ phát triển trong việc phát triển ứng dụng web trong các lĩnh vực khác nhau, chẳng hạn như: AI Machine learning / Data , Security & Solution, DX...", requirement: "Có ít nhất 2 năm kinh nghiệm về JAVA (Ưu tiên kinh nghiệm cao)", benefit: "Lương, thưởng sẽ được thảo luận sau khi thông qua CV & Phỏng vấn", quantity: 5, ward: { code: "00199", name: "Láng Hạ", full_name: "Phường Láng Hạ", district: { code: "006", name: "Đống Đa", full_name: "Quận Đống Đa", province: { code: "01", name: "Hà Nội", full_name: "Thành phố Hà Nội" } } }, address: "171 Thái Hà", deadline: "2024-06-04", point: [0.24514516892273003, 0.17677669529663687, 0.02978630515460766, 0.132499735000795], distanceBest: 0.23245033549780986, distanceWorst: 0.19611613513818402, p: 0.45760960918652155 },
    ]);
    const [majors, setMajors] = useState([]);
    const [degrees, setDegrees] = useState([]);
    const [currentPage, setCurrentPage] = useState();
    const pageSize = 10;

    const [open, setOpen] = useState(false);
    const [weight, setWeight] = useState([0, 0, 0, 0])
    const [bestSolution, setBestSolution] = useState([])
    const [worstSolution, setWorstSolution] = useState([])
    const listRef = useRef();
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
    useEffect(() => {
        scroll()
    }, [currentPage]);
    const scroll = () => {
        if (listRef.current) {
            console.log(listRef)
            window.scrollTo({
                top: listRef.current.offsetTop - 250, // 100px offset from the top
                behavior: 'smooth'
            });
        }
    }
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const onFinish = async (values) => {
        try {
            console.log('DeepSearchJob request', values)
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const response = await axios.post('http://localhost:8080/jobs/topsisSearch', values, { headers });
            console.log('DeepSearchJob response:', response.data);
            console.log('DeepSearchJob response 2:', response.data.jobs);
            setJobs(response.data.jobs)
            setWeight(response.data.weight)
            setBestSolution(response.data.bestSolution)
            setWorstSolution(response.data.worstSolution)

            // console.log(jobs)
            // console.log(sortedJobs)
            if(currentPage == 1){
                scroll();
            }else
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
            title: 'Chuyên ngành',
            dataIndex: 'major',
            key: 'major',
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
            title: 'Mức lương',
            dataIndex: 'offer',
            key: 'offer',

        },
    ];
    const columns3 = [
        {
            title: '',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Chuyên ngành x ' + round4(weight[0]),
            dataIndex: 'major',
            key: 'major',
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
        {
            title: 'Mức lương x ' + round4(weight[3]),
            dataIndex: 'offer',
            key: 'offer',

        },
    ];
    const columns5 = [
        {
            title: '',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Chuyên ngành',
            dataIndex: 'major',
            key: 'major',
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
            title: 'Mức lương',
            dataIndex: 'offer',
            key: 'offer',

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
            <h1 className='mt-0'>Trợ giúp tìm kiếm</h1>
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
                        majorId: 7480201,
                        degreeId: 3,
                        experience: 1,
                        expectedOffer: 10,
                        majorWeight: 1,
                        degreeWeight: 1,
                        experienceWeight: 1,
                        offerWeight: 1,

                    }}
                >

                    <Form.Item label="Chuyên ngành" name="majorId"
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
                    <Form.Item name="majorWeight"
                        // rules={[{ required: true, message: 'Vui lòng chọn trọng số chuyên ngành' }]}
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Slider min={1} max={5} />

                    </Form.Item>

                    <Form.Item label="Bằng cấp" name="degreeId"
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
                        label="Kinh nghiệm"
                        name="experience"
                        rules={[{ required: true, message: 'Vui lòng nhập số năm kinh nghiệm!' }]}

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
                    <Form.Item
                        label="Mức lương mong muốn"
                        name="expectedOffer"
                        rules={[{ required: true, message: 'Vui lòng nhập mức lương mong muốn!' }]}
                    >
                        <InputNumber addonAfter="triệu" style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="offerWeight"
                        // rules={[{ required: true, message: 'Vui lòng chọn trọng số mức lương' }]}
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Slider min={1} max={5} />

                    </Form.Item>
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
            {jobs.length > 0 &&
                <div ref={listRef} className='deep-search-job-list pt-8'>
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
                                        jobs.map(job => ({
                                            key: job.id,
                                            id: job.id,
                                            name: job.name,
                                            major: job.originPoint[0],
                                            degree: job.originPoint[1],
                                            experience: job.originPoint[2],
                                            offer: job.originPoint[3],

                                        }))
                                        // data
                                    } />
                                </div>
                                <div>
                                    <h2>Bước 2: Chuẩn hóa ma trận quyết định</h2>
                                    <Table columns={columns} dataSource={
                                        jobs.map(job => ({
                                            key: job.id,
                                            id: job.id,
                                            name: job.name,
                                            major: round4(job.normalPoint[0]),
                                            degree: round4(job.normalPoint[1]),
                                            experience: round4(job.normalPoint[2]),
                                            offer: round4(job.normalPoint[3]),

                                        }))
                                        // data
                                    } />
                                </div>
                                <div>
                                    <h2>Bước 3: Xây dựng ma trận quyết định đã chuẩn hóa có trọng số</h2>
                                    <Table columns={columns3} dataSource={
                                        jobs.map(job => ({
                                            key: job.id,
                                            id: job.id,
                                            name: job.name,
                                            major: round4(job.weightPoint[0]),
                                            degree: round4(job.weightPoint[1]),
                                            experience: round4(job.weightPoint[2]),
                                            offer: round4(job.weightPoint[3]),

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
                                            major: round4(solution.value[0]),
                                            degree: round4(solution.value[1]),
                                            experience: round4(solution.value[2]),
                                            offer: round4(solution.value[3]),
                                        }))

                                        // data
                                    } />
                                </div>
                                <div>
                                    <h2>Bước 5: Tính khoảng cách đến các giải pháp lý tưởng tích cực và tiêu cực</h2>
                                    <Table columns={columns5} dataSource={
                                        jobs.map(job => ({
                                            key: job.id,
                                            id: job.id,
                                            name: job.name,
                                            major: round4(job.weightPoint[0]),
                                            degree: round4(job.weightPoint[1]),
                                            experience: round4(job.weightPoint[2]),
                                            offer: round4(job.weightPoint[3]),
                                            distanceBest: round4(job.distanceBest),
                                            distanceWorst: round4(job.distanceWorst),

                                        }))
                                        // data
                                    } />
                                </div>
                                <div>
                                    <h2>Bước 6: Tính chỉ số tương đồng với giải pháp lý tưởng</h2>
                                    <Table columns={columns6} dataSource={
                                        jobs.map(job => ({
                                            key: job.id,
                                            id: job.id,
                                            name: job.name,
                                            distanceBest: round4(job.distanceBest),
                                            distanceWorst: round4(job.distanceWorst),
                                            p: round4(job.p)

                                        }))
                                        // data
                                    } />
                                </div>
                                <div>
                                    <h2>Bước 7: Xếp hạng các phương án</h2>
                                    <Table columns={columns7} dataSource={
                                        [...jobs].sort((a, b) => b.p - a.p).map(job => ({
                                            key: job.id,
                                            id: job.id,
                                            name: job.name,
                                            distanceBest: round4(job.distanceBest),
                                            distanceWorst: round4(job.distanceWorst),
                                            p: round4(job.p)

                                        }))
                                        // data
                                    } />
                                </div>



                            </div>

                        </Modal>
                    </div>
                    <div

                    >
                        {[...jobs].sort((a, b) => b.p - a.p).slice((currentPage - 1) * pageSize, ((currentPage - 1) * pageSize) + pageSize).map(job => (
                            <Link to={`/viewjob/${job.id}`} key={job.id} className='job pa-4 mb-5 flex gap-8 pa-3 mb-3'>
                                <div className=''>
                                    <img className="company-picture" src={job.employer.picture ? "http://localhost:8080" + job.employer.picture : 'https://www.shutterstock.com/image-vector/building-icon-260nw-377768164.jpg'} />
                                </div>
                                <div className='flex flex-col justify-between w-full'>
                                    <div className='flex justify-between items-baseline'>
                                        <div>
                                            <div className='job-name mb-1'>{job.name}</div>
                                            <div className='company-name'>{job.employer.companyName}</div>
                                        </div>
                                        <div className='offer'>{job.minOffer + " - " + job.maxOffer + " triệu"}</div>
                                    </div>
                                    <div>
                                        <Tag color="cyan" >{job.career.name}</Tag>
                                        <Tag color="cyan" >{job.degree.name}</Tag>
                                        <Tag color="cyan" >{(job.experience == 0 ? 'Không yêu cầu' : job.experience + ' năm') + ' kinh nghiệm'}</Tag>
                                        <Tag color="cyan" >{job.ward.district.province.name}</Tag>
                                        <Tag color="cyan" >{job.deadline}</Tag>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="flex justify-center mt-9">

                        <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            total={jobs.length}
                            onChange={handlePageChange}
                        />
                    </div>

                </div>
            }
        </div>
    )
}
