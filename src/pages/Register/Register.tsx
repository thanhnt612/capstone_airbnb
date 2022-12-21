import React from 'react'
import { FormikProps, useFormik } from 'formik'
import * as yup from 'yup';
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { DispatchType } from '../../redux/configStore'

type Props = {}
export type UserRegister = {
  email: string,
  password: string,
  passwordConfirm: string,
  name: string,
  phone: string,
  birthday: string,
  gender: any
}
export default function Register({ }: Props) {
  const dispatch: DispatchType = useDispatch();
  const frm: FormikProps<UserRegister> = useFormik<UserRegister>({
    initialValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      name: '',
      phone: '',
      birthday: '',
      gender: true
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Email không đúng định dạng")
        .required("Xin mời nhập vào email !!!"),
      password: yup.string().required("Xin mời nhập mật khẩu !!!"),
      passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password"), null], "Mật khẩu chưa khớp"),
      name: yup.string().required("Xin mời nhập vào tên !!!"),
      phone: yup
        .number()
        .typeError("Xin hãy nhập vào ký tự là số")
        .required("Xin mời nhập vào số điện thoại !!!"),
      birthday: yup.string().required("Xin mời nhập ngày tháng năm sinh !!!"),
    }),
    onSubmit: (values: UserRegister) => {
      if (values.gender === 'true') {
        values.gender = true;
      } else {
        values.gender = false;
      }
      console.log(values)
    }
  });
  return (
    <div className='register-page '>
      <div className="container">
        <div className="row rounded">
          <div className="signup-content">
            <div className="signup-form">
              <NavLink to="/">
                <img src='../img/logo.png' className='d-block' width="102px" height='32px' alt="" />
              </NavLink>
              <h2 className="form-title">Sign up</h2>
              <form className="register-form" onSubmit={frm.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email"><i className="fa-regular fa-envelope"></i></label>
                  <input type="email" name="email" id="email" placeholder="Your Email"
                    onChange={frm.handleChange} onBlur={frm.handleBlur}
                  />
                </div>
                {frm.errors.email ? (
                  <p className="text text-danger">{frm.errors.email}</p>
                ) : (
                  ""
                )}
                <div className="form-group">
                  <label htmlFor="pass"><i className="fa-solid fa-lock"></i></label>
                  <input type="password" name="password" id="password" placeholder="Password"
                    onChange={frm.handleChange} onBlur={frm.handleBlur} />
                </div>
                {frm.errors.password ? (
                  <p className="text text-danger">{frm.errors.password}</p>
                ) : (
                  ""
                )}
                <div className="form-group">
                  <label htmlFor="re-pass"><i className="fa-solid fa-lock"></i></label>
                  <input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="Repeat your password"
                    onChange={frm.handleChange} onBlur={frm.handleBlur} />
                </div>
                {frm.errors.passwordConfirm ? (
                  <p className="text text-danger">{frm.errors.passwordConfirm}</p>
                ) : (
                  ""
                )}
                <div className="form-group">
                  <label htmlFor="name"><i className="fa-regular fa-user"></i></label>
                  <input type="text" name="name" id="name" placeholder="Your Name"
                    onChange={frm.handleChange} onBlur={frm.handleBlur} />
                </div>
                {frm.errors.name ? (
                  <p className="text text-danger">{frm.errors.name}</p>
                ) : (
                  ""
                )}
                <div className="form-group">
                  <label htmlFor="phone"><i className="fa-solid fa-mobile-screen-button"></i></label>
                  <input name="phone" id="phone" placeholder="Your Phone"
                    onChange={frm.handleChange} onBlur={frm.handleBlur} />
                </div>
                {frm.errors.phone ? (
                  <p className="text text-danger">{frm.errors.phone}</p>
                ) : (
                  ""
                )}
                <div className="form-group">
                  <label htmlFor="birthday"><i className="fa-solid fa-cake-candles"></i></label>
                  <input type="date" name="birthday" id="birthday" placeholder="Your birthday"
                    onChange={frm.handleChange} onBlur={frm.handleBlur} />
                </div>
                {frm.errors.birthday ? (
                  <p className="text text-danger">{frm.errors.birthday}</p>
                ) : (
                  ""
                )}
                <div className="radioGroup">
                  <span>Gender:</span>
                  <input
                    className="radioButton"
                    type="radio"
                    value="true"
                    name="gender"
                    onChange={frm.handleChange}
                  />
                  <label htmlFor="">Male</label>
                  <input
                    className="radioButton"
                    type="radio"
                    value="false"
                    name="gender"
                    onChange={frm.handleChange}
                  />
                  <label htmlFor="">Female</label>
                </div>
                <div className="button">
                  <button type="submit" className="btn-register" >Đăng Ký</button>
                  <span>Bạn đã có tài khoản?</span><NavLink to='/user/login'>Đăng nhập ở đây</NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}