import React from 'react'
import { NavLink } from 'react-router-dom'
import { useFormik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { DispatchType } from '../../redux/configStore';
import { loginApi } from '../../redux/reducers/userReduder';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
type Props = {}
export type UserLogin = { email: string, password: string }
export default function Login({ }: Props) {
  const dispatch: DispatchType = useDispatch();
  const frm: FormikProps<UserLogin> = useFormik<UserLogin>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required("Xin mời nhập vào email !!!"),
      password: Yup.string().required("Xin mời nhập vào password !!!"),
    }),
    onSubmit: (values: UserLogin) => {
      console.log("Đăng nhập: ", values);
      const action = loginApi(values);
      dispatch(action);
    }
  });
  return (
    <div>
      <div className='login-page '>
        <div className="container">
          <div className="row rounded">
            <div className="signin-content">
              <div className="signin-form">
                <NavLink to="/">
                  <img src='../img/logo.png' className='d-block' width="102px" height='32px' alt="" />
                </NavLink>
                <h2 className="form-title">Sign in</h2>
                <form className="register-form" onSubmit={frm.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="account"><i className="fa-solid fa-circle-user"></i></label>
                    <input name="email" placeholder="Email" onBlur={frm.handleBlur} onChange={frm.handleChange} />
                  </div>
                  {frm.errors.email ? (
                    <p className="text text-danger">{frm.errors.email}</p>
                  ) : (
                    ""
                  )}
                  <div className="form-group">
                    <label htmlFor="pass"><i className="fa-solid fa-lock"></i></label>
                    <input name="password" type="password" placeholder="Password" onBlur={frm.handleBlur} onChange={frm.handleChange} />
                  </div>
                  {frm.errors.password ? (
                    <p className="text text-danger">{frm.errors.password}</p>
                  ) : (
                    ""
                  )}
                  <div className="button">
                    <button type="submit" className="btn-register"
                    >Đăng Nhập</button>
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
                    <p>
                      <NavLink to='/user/register'>Bạn quên mật khẩu?</NavLink>
                    </p>
                    <span>Bạn chưa có tài khoản?</span><NavLink to='/user/register'>Đăng ký ở đây</NavLink>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}