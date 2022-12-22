import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { DispatchType, RootState } from '../../redux/configStore';
import { deleteBookingAction, getBookingProfileIdApi } from '../../redux/reducers/bookingReducer';
import { getProfileApi } from '../../redux/reducers/userReduder';
import { useFormik, FormikProps } from 'formik';
import * as yup from 'yup';
type Props = {}
export type EditProfile = {
    email: string,
    name: string,
    phone: string,
    birthday: string,
    gender: boolean | undefined
}
export default function Profile({ }: Props) {
    const dispatch: DispatchType = useDispatch();
    useEffect(() => {
        const action = getProfileApi(userLogin.user?.id);
        dispatch(action);
        const actionAsync = getBookingProfileIdApi(userLogin.user?.id);
        dispatch(actionAsync)
    }, []);
    const { userLogin } = useSelector((state: RootState) => state.userReduder);
    const { arrHistory } = useSelector((state: RootState) => state.bookingReducer);
    const { arrDetailHistory } = useSelector((state: RootState) => state.bookingReducer);
    console.log(userLogin.user.gender)
    const frm: FormikProps<EditProfile> = useFormik<EditProfile>({
        initialValues: {
            email: userLogin.user.email,
            name: userLogin.user.name,
            phone: userLogin.user.phone,
            birthday: userLogin.user.birthday,
            gender: userLogin.user.gender
        },
        validationSchema: yup.object().shape({
            name: yup.string().required("Xin mời nhập vào tên !!!"),
            phone: yup
                .number()
                .typeError("Xin hãy nhập vào ký tự là số")
                .required("Xin mời nhập vào số điện thoại !!!"),
            birthday: yup.string().required("Xin mời nhập ngày tháng năm sinh !!!"),
        }),
        onSubmit: (values: EditProfile) => {
            console.log("Đăng nhập: ", values);
            // const action = loginApi(values);
            // dispatch(action);
            // alert('Đăng nhập thành công');
            // navigate("/home");
        }
    });
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
                        <div className="title">
                            <h3>Xin chào, tôi là {userLogin.user.name}</h3>
                            <p>Bắt đầu tham gia vào 2022</p>
                        </div>
                        <div className="edit-profile mb-3">
                            <button className='border-0 text-decoration-underline'
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                            >Chỉnh sửa hồ sơ</button>
                            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'none' }}>
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Chỉnh sửa thông tin</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                        </div>
                                        <form>
                                            <div className="modal-body">
                                                <div className="form-group mb-3">
                                                    <label htmlFor="email">Email:</label>
                                                    <input type="email" name="email" id="email"
                                                        className="form-control"
                                                        value={frm.values.email}
                                                    />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label htmlFor="name">Tên:</label>
                                                    <input type="name" name="name" id="name"
                                                        value={frm.values.name}
                                                        className="form-control"
                                                        onChange={frm.handleChange}
                                                        onBlur={frm.handleBlur}
                                                    />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label htmlFor="phone">Số điện thoại:</label>
                                                    <input type="phone" name="phone" id="phone"
                                                        value={frm.values.phone}
                                                        className="form-control"
                                                        onChange={frm.handleChange}
                                                        onBlur={frm.handleBlur}
                                                    />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label htmlFor="birthday">Ngày sinh:</label>
                                                    <input name="birthday" id="birthday"
                                                        value={frm.values.birthday}
                                                        className="form-control"
                                                        onChange={frm.handleChange}
                                                        onBlur={frm.handleBlur}
                                                    />
                                                </div>
                                                <div className="radioGroup">
                                                    <span>Giới:</span>
                                                    <input
                                                        className="radioButton mx-1"
                                                        type="radio"
                                                        value="male"
                                                        name="gender"
                                                        checked={
                                                            (frm.values.gender === true) ? true : undefined
                                                        }
                                                        onChange={frm.handleChange}
                                                    />
                                                    <label htmlFor="">Nam</label>
                                                    <input
                                                        className="radioButton mx-1"
                                                        type="radio"
                                                        value="female"
                                                        name="gender"
                                                        checked={
                                                            (frm.values.gender === false) ? true : undefined
                                                        }
                                                        onChange={frm.handleChange}
                                                    />
                                                    <label htmlFor="">Nữ</label>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn border-dark " data-bs-dismiss="modal">Hủy</button>
                                                <button type="submit" className="btn border-dark">Cập nhật</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='list-title'>
                            <h4>Phòng đã thuê</h4>
                        </div>
                        {arrHistory.map((item: any) => {
                            return <div key={item.maPhong}>
                                {arrDetailHistory.map((prod: any) => {
                                    if (item.maPhong === prod.id) {
                                        return <div className="list-choose d-flex py-3 border-top" key={item.maPhong}>
                                            <div className="thumbnail col-4 me-3">
                                                <img src={prod.hinhAnh}
                                                    className='w-100' alt="" />
                                            </div>
                                            <div className="detail col-8 p-2">
                                                <div className="info">
                                                    <h5>{prod.tenPhong}</h5>
                                                    <p>
                                                        Số lượng khách: {item.soLuongKhach} khách
                                                    </p>
                                                </div>
                                                <div className="time">
                                                    <p>Ngày đặt phòng: <span> {(new Date(item.ngayDen)).toLocaleDateString()}</span></p>
                                                    <p>Ngày hẹn trả: <span> {(new Date(item.ngayDi)).toLocaleDateString()}</span></p>
                                                </div>
                                                <div className="view-more">
                                                    <div className="button">
                                                        <NavLink to={`/detail/${prod.id}`} className="btn">
                                                            <span>
                                                                Xem chi tiết
                                                            </span>
                                                        </NavLink>
                                                    </div>
                                                    <div className="cancel mt-2">
                                                        <button className='btn'
                                                            onClick={() => {
                                                                const action = deleteBookingAction(item.id);
                                                                dispatch(action);
                                                            }}
                                                        >Hủy phòng</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                })
                                }
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div >
    )
}