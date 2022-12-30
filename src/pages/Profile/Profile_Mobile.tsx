import React, { useEffect, useState, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { DispatchType, RootState } from '../../redux/configStore';
import { deleteBookingAction, getBookingProfileIdApi } from '../../redux/reducers/bookingReducer';
import { updateProfileApi } from '../../redux/reducers/userReduder';
import { useFormik, FormikProps } from 'formik';
import * as yup from 'yup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
type Props = {}

export type EditProfile = {
  email: string,
  name: string,
  phone: string,
  birthday: string,
  gender: any
}

export default function Profile({ }: Props) {
  const dispatch: DispatchType = useDispatch();
  const { userLogin } = useSelector((state: RootState) => state.userReduder);
  const { arrHistory } = useSelector((state: RootState) => state.bookingReducer);
  const { arrDetailHistory } = useSelector((state: RootState) => state.bookingReducer);
  const [image, setImage] = useState<File | null>(null);

  if (Object.keys(userLogin).length === 0) {
    window.location.href = "/user/login";
  }

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    setImage(event.target.files[0]);
  }

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
      if (values.gender === "male") {
        values.gender = true;
      } else {
        values.gender = false;
      }
      dispatch(updateProfileApi(userLogin.user.id, values))
    }
  });

  useEffect(() => {
    const actionAsync = getBookingProfileIdApi(userLogin.user.id);
    dispatch(actionAsync)
  }, []);

  return (
    <div className='profile-page-mobile pt-3'>
      <div className="container">
        <div className="row">
          <div className="info col-12">
            <div className="account bg-light border rounded p-4">
              <div className="avatar text-center">
                <img src={image === null ? "http://picsum.photos/200/200" : URL.createObjectURL(image)} alt="preview"
                  className='rounded-circle' />
                <div className="update-avatar bg-white pt-3">
                  <button className='border-0 text-decoration-underline'
                    data-bs-toggle="modal"
                    data-bs-target="#addAvatar">Cập nhật ảnh</button>
                  <div className="modal fade " id="addAvatar" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'none' }}>
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5" id="exampleModalLabel">Cập nhật avatar</h1>
                        </div>
                        <div className="modal-body">
                          <input type="file" onChange={onImageChange} className="filetype" />
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn bg-danger text-light" data-bs-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className='verify pt-2'>
                <div className="identity">
                  <h5>Xác minh danh tính <i className="fa-regular fa-square-check"></i></h5>
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
          <div className="history col-12 mb-3 pt-3">
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
                    <form onSubmit={frm.handleSubmit}>
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
                          <input name="birthday" id="birthday" type="date"
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
                              (frm.values.gender === true
                                || frm.values.gender === "male")
                                ? true : undefined
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
                              (frm.values.gender === false
                                || frm.values.gender === "female")
                                ? true : undefined
                            }
                            onChange={frm.handleChange}
                          />
                          <label htmlFor="">Nữ</label>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn border-dark " data-bs-dismiss="modal">Hủy</button>
                        <button type="submit" className="btn border-dark">Cập nhật</button>
                        <ToastContainer
                          position="top-center"
                          autoClose={2000}
                          hideProgressBar={false}
                          newestOnTop={false}
                          closeOnClick
                          rtl={false}
                          pauseOnFocusLoss
                          draggable
                          pauseOnHover
                          theme="colored" />
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
                    return <div className="list-choose d-flex py-3
                    bg-light border border-2 border-success 
              border-opacity-25 rounded mb-3" key={item.maPhong}>
                      <div className="thumbnail col-5 p-3">
                        <img src={prod.hinhAnh}
                          className='w-100' alt="" />
                      </div>
                      <div className="detail col-7 p-2">
                        <div className="info">
                          <h5>{prod.tenPhong}</h5>
                          <p>
                            Số lượng khách: {item.soLuongKhach} khách
                          </p>
                        </div>
                        <div className="time">
                          <p>Ngày đặt phòng:<span> {(new Date(item.ngayDen)).toLocaleDateString()}</span></p>
                          <p>Ngày hẹn trả: <span> {(new Date(item.ngayDi)).toLocaleDateString()}</span></p>
                        </div>
                        <div className="view-more row">
                          <div className="button col-12">
                            <NavLink to={`/detail/${prod.id}`} className="btn">
                              <span>
                                Xem chi tiết
                              </span>
                            </NavLink>
                          </div>
                          <div className="cancel col-12 mt-2">
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