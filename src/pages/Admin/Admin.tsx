import React, { useEffect, useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme, Input, Button, Space } from 'antd';
import { DispatchType, RootState } from '../../redux/configStore';
import { useDispatch, useSelector } from 'react-redux';
import { delUserApi, getIdUserApi, getUserApi, updateUser } from '../../redux/reducers/userManager';
import { useFormik, FormikProps } from 'formik';
import * as yup from 'yup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {}
export type EditProfile = {
  id: number,
  email: string,
  name: string,
  phone: string,
  birthday: string,
  gender: any
}
export default function Admin({ }: Props) {
  const { Header, Sider, Content } = Layout;
  const { Search } = Input;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  //===========================Formik and Yup=====================================
  const dispatch: DispatchType = useDispatch();
  const { userProfile } = useSelector((state: RootState) => state.userManager);
  const { userDetail } = useSelector((state: RootState) => state.userManager);
  const frm: FormikProps<EditProfile> = useFormik<EditProfile>({
    initialValues: {
      id: userDetail.id,
      email: userDetail.email,
      name: userDetail.name,
      phone: userDetail.phone,
      birthday: userDetail.birthday,
      gender: userDetail.gender
    },
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      name: yup.string().required("Xin mời nhập vào tên !!!"),
      phone: yup
        .number()
        .typeError("Xin hãy nhập vào ký tự là số")
        .required("Xin mời nhập vào số điện thoại !!!"),
      birthday: yup.string().required("Xin mời nhập ngày tháng năm sinh !!!"),
    }),
    onSubmit: (values: EditProfile) => {
      dispatch(updateUser(values.id, values))
    },
  });
  useEffect(() => {
    const action = getUserApi();
    dispatch(action);
  }, [])
  return (
    <>
      {/* ===========================================Modal Edit =========================================================== */}
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
                    onChange={frm.handleChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="name">Tên:</label>
                  <input type="name" name="name" id="name"
                    className="form-control"
                    value={frm.values.name}
                    onChange={frm.handleChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="phone">Số điện thoại:</label>
                  <input type="phone" name="phone" id="phone"
                    className="form-control"
                    value={frm.values.phone}
                    onChange={frm.handleChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="birthday">Ngày sinh:</label>
                  <input name="birthday" id="birthday"
                    className="form-control"
                    value={frm.values.birthday}
                    onChange={frm.handleChange}
                  />
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
      {/* ===========================================Modal Information =========================================================== */}
      <div className="modal fade" id="infoModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Thông tin</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <form >
              <div className="modal-body">
                <div className="mb-3">
                  <span className='text-primary'>Email: </span> <span>{userDetail.email}</span>
                </div>
                <div className="mb-3">
                  <span className='text-primary'>Name: </span> <span>{userDetail.name}</span>
                </div>
                <div className="mb-3">
                  <span className='text-primary'>Phone: </span> <span>{userDetail.phone}</span>
                </div>
                <div className="mb-3">
                  <span className='text-primary'>Birthday: </span> <span>{userDetail.birthday}</span>
                </div>
                <div className="mb-3">
                  <span className='text-primary'>Role: </span> <span>{userDetail.role}</span>
                </div>
                <div className="mb-3">
                  <span className='text-primary'>Gender: </span>
                  {userDetail.gender === true ? (
                    <span>Male</span>
                  ) : (
                    <span>Female</span>
                  )}
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
      {/* ===========================================Layout Admin Page =========================================================== */}
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',

                label: 'Quản Lý Người Dùng',
              },
              {
                key: '2',

                label: 'Quản Lý Thông Tin Vị Trí',
              },
              {
                key: '3',

                label: 'Quản Lý Thông Tin Phòng',
              },
              {
                key: '4',

                label: 'Quản Lý Đặt Phòng',
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header style={{ padding: 0, background: colorBgContainer }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
          </Header>
          <Search placeholder="Nhập vào tên phòng" enterButton />
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <table className='table'>
              <tr>
                <th>Mã số</th>
                <th>Hình Ảnh</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Ngày sinh</th>
                <th>Loại người dùng</th>
                <th>Thông tin</th>
              </tr>
              {userProfile.map((member: any, index: number) => {
                return <tr key={index}>
                  <td>{member.id}</td>
                  <td><img src="https://i.pravatar.cc" alt="..." width={50} height={50} /></td>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.birthday}</td>
                  <td>{member.role}</td>
                  <td>
                    <Button className='me-3 p-1' type="primary" ghost
                      data-bs-toggle="modal"
                      data-bs-target="#infoModal"
                      onClick={() => {
                        dispatch(getIdUserApi(member.id));
                      }}>
                      Xem Thêm Thông Tin
                    </Button>
                    <Button className='me-3 p-1 border border-secondary rounded '
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => {
                        dispatch(getIdUserApi(member.id));
                      }}
                    >Sửa</Button>
                    <Button className='p-1' type="primary" danger ghost
                      onClick={() => {
                        dispatch(delUserApi(member.id));
                      }}>
                      Xóa
                    </Button>
                    <ToastContainer
                      position="top-center"
                      autoClose={3000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="colored" />
                  </td>
                </tr>
              })}
            </table>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
