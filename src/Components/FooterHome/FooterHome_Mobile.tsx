import React from 'react'
import { NavLink } from "react-router-dom";

type Props = {}

export default function Footerhome({ }: Props) {
    return (
        <div className='footer-mobile'>
            <div className="container">
                <div className="list-footer row">
                    <div className="footer-1 col-6">
                        <p>Hỗ trợ</p>
                        <ul>
                            <li>
                                <NavLink to="">
                                    Trung tâm trợ giúp
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="">
                                    AirCover
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="">
                                    Hỗ trợ người khuyết tật
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="">
                                    Các tùy chọn hủy
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="">
                                    Biện pháp ứng phó với đại dịch COVID-19 của chúng tôi
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="">
                                    Báo cáo lo ngại của hàng xóm
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-2 col-6">
                        <p>Cộng đồng</p>
                        <ul>
                            <li>
                                <NavLink to="">
                                    Airbnb.org: nhà ở cứu trợ
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="">
                                    Chống phân biệt đối xử
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-3 col-6">
                        <p>Đón tiếp khách</p>
                        <ul>
                            <li>
                                <NavLink to="">
                                    Cho thuê nhà trên Airbnb
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="">
                                    AirCover cho Chủ nhà
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="">
                                    Xem tài nguyên đón tiếp khách

                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="">
                                    Truy cập diễn đàn cộng đồng
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="">
                                    Đón tiếp khách có trách nhiệm
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-4 col-6">
                        <p>Airbnb</p>
                        <ul>
                            <li>
                                <NavLink to="">
                                    Trang tin tức
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="">
                                    Tìm hiểu các tính năng mới
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="">
                                    Thư ngỏ từ các nhà sáng lập
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="">
                                    Cơ hội nghề nghiệp
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="">
                                    Nhà đầu tư
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='license border-top py-3 d-flex align-items-center'>
                    <p>© 2022 Airbnb, Inc.</p>
                </div>
                <div className="list-license">
                    <ul>
                        <li>
                            <NavLink to="">
                                Quyền riêng tư
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="">
                                Điều khoản
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="">
                                Sơ đồ trang web
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}