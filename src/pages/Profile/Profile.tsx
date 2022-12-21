import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/configStore';
import { getBookingProfileIdApi } from '../../redux/reducers/bookingReducer';
import { getProfileApi } from '../../redux/reducers/userReduder';


type Props = {}

export default function Profile({ }: Props) {
    const dispatch: DispatchType = useDispatch();
    useEffect(() => {
        const action = getProfileApi(userLogin.user?.id);
        dispatch(action);
        const action2 = getBookingProfileIdApi(userLogin.user?.id);
        dispatch(action2)
    }, []);
    const { userLogin } = useSelector((state: RootState) => state.userReduder);
    const { arrHistory } = useSelector((state: RootState) => state.bookingReducer);
    console.log("History: ", arrHistory);
    // const historyDetail = (id: any) => {
    //     // dispatch(getBookingHistoryApi(id))
    // }
    return (
        <div className='profile-page pt-3'>
            <div className="container">
                <div className="row">
                    <div className="info col-3">
                        <div className="account border rounded p-4">
                            <div className="avatar text-center">
                                <img src="http://picsum.photos/200/200"
                                    className='w-50 rounded-circle'
                                    alt="" />
                                <div className="update-avatar bg-white pt-3">
                                    <button className='border-0 text-decoration-underline'>Cập nhật ảnh</button>
                                </div>
                            </div>
                            <div className='verify pt-2'>
                                <div className="identity">
                                    <p className='check-icon'>
                                        <i className="fa-regular fa-square-check"></i>
                                    </p>
                                    <h5>Xác minh danh tính</h5>
                                    <p>Xác minh danh tính của bạn với huy hiệu xác minh danh tính</p>
                                </div>
                                <div className="button">
                                    <button className='btn'>Nhận huy hiệu</button>
                                </div>
                                <hr />
                                <div className='check-profile'>
                                    <p className='fw-bold'>Tài khoản đã xác nhận</p>
                                    <div className="confirm">
                                        <i className='fa fa-check'></i><span className='ps-2'>Địa chỉ email</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="history col-9 mb-3">
                        <div className="tittle">
                            <h3>Xìn chào, tôi là {userLogin.user.name}</h3>
                            <p>Bắt đầu tham gia vào 2021</p>
                        </div>
                        <div className="edit-profile">
                            <button className='border-0 text-decoration-underline'>Chỉnh sửa hồ sơ</button>
                        </div>
                        <h3>Phòng đã thuê</h3>
                        {arrHistory.map((item: any, index) => {
                            return <div className="list-choose d-flex my-3 border-top" key={index}>
                                <div className="thumbnail col-4 me-3">
                                    <img src="http://picsum.photos/300/200"
                                        className='w-100' alt="" />
                                </div>
                                <div className="detail col-8 p-2">
                                    <div className="info">
                                        <h5>Landmark 81</h5>
                                        <p>
                                            {item.soLuongKhach} khách - phòng studio - 1 giường - 1 phòng tắm <br />
                                            Wifi - Bếp - Điều hòa nhiệt độ - Máy giặt
                                        </p>
                                    </div>
                                    <div className="time">
                                        <span>{item.ngayDen}</span>
                                        - <span>{item.ngayDi}</span>
                                    </div>
                                </div>
                            </div>
                        })}
                        {/* <div className="thumbnail col-4 me-3">
                                <img src="http://picsum.photos/300/200"
                                    className='w-100' alt="" />
                            </div>
                            <div className="detail col-8 p-2">
                                <div className="info">
                                    <h5>Landmark 81</h5>
                                    <p>
                                        2 khách - phòng studio - 1 giường - 1 phòng tắm <br />
                                        Wifi - Bếp - Điều hòa nhiệt độ - Máy giặt
                                    </p>
                                </div>
                                <div className="price">
                                    <p> <span>$396</span> / Tháng</p>
                                </div>
                            </div> */}
                    </div>
                </div>
            </div>
        </div >
    )
}