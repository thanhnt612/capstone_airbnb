import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../redux/configStore'
import { getBookingApi, getBookingLocationApi } from '../../redux/reducers/bookingReducer'
import { ACCESSTOKEN, USER_LOGIN } from '../../utils/config';
type Props = {}

export default function HeaderHome({ }: Props) {
    const { arrBooking } = useSelector((state: RootState) => state.bookingReducer)
    const [search, setSearch] = useState([]);
    const dispatch: DispatchType = useDispatch();
    const navigate = useNavigate();
    const { userLogin } = useSelector((state: RootState) => state.userReduder);
    const renderLogin = () => {
        if (userLogin.user?.name) {
            return (
                <>
                    <li><NavLink className="dropdown-item" to="/profile">
                        Hi!! {userLogin.user.name}
                    </NavLink></li>
                    <li><button className="dropdown-item"
                        onClick={() => {
                            localStorage.removeItem(USER_LOGIN);
                            localStorage.removeItem(ACCESSTOKEN);
                            window.location.href = "/user/login";
                        }}>
                        Đăng xuất
                    </button>
                    </li>
                </>
            );
        }
        return (
            <>
                <li><NavLink className="dropdown-item" to="/user/register">Đăng ký</NavLink></li>
                <li><NavLink className="dropdown-item" to="/user/login">Đăng nhập</NavLink></li>
            </>
        );
    };
    const renderUser = () => {
        if (userLogin.user?.name) {
            return (
                <>
                    <img src="http://picsum.photos/20/20" alt=""
                        className='rounded' />
                </>
            )
        }
        return (
            <>
                <i className="user fa-solid fa-user"></i>
            </>
        );
    }
    useEffect(() => {
        const actionAsync = getBookingApi();
        dispatch(actionAsync)
    }, [])
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchWord: any = event.target.value;
        setSearch(searchWord)
    }
    const onSearchRoom = (search: any) => {
        setSearch(search);
        if (search === 'Hồ Chí Minh') {
            search = 1
        } else if (search === 'Cần Thơ') {
            search = 2
        } else if (search === 'Nha Trang') {
            search = 3
        } else if (search === 'Hà Nội') {
            search = 4
        } else if (search === 'Phú Quốc') {
            search = 5
        } else if (search === 'Đà Nẵng') {
            search = 6
        } else if (search === 'Đà Lạt') {
            search = 7
        } else if (search === 'Phan Thiết') {
            search = 8
        } else {
            search = ''
        }
        console.log("Mã Vị Trí: ", search);
        const action = getBookingLocationApi(search);
        dispatch(action)
        navigate("/list");
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(event)
    };
    return (
        <div className='header-layout-mobile'>
            <div className="header-page">
                <div className="header-home">
                    <NavLink to="/">
                        <img src='./img/logo.png' alt="" />
                    </NavLink>
                </div>
                <div className="header-info">
                    <div className="right-info">
                        <li className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle" to="" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bar fa-solid fa-bars"></i>
                                {renderUser()}
                            </NavLink>
                            <ul className="dropdown-menu list-info">
                                {renderLogin()}
                                <li><hr /></li>
                                <li><NavLink className="dropdown-item" to="">Cho thuê chỗ ở qua Airbnb</NavLink></li>
                                <li><NavLink className="dropdown-item" to="">Tổ chức trải nghiệm</NavLink></li>
                                <li><NavLink className="dropdown-item" to="">Trợ giúp</NavLink></li>
                            </ul>
                        </li>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-search">
                <form onSubmit={handleSubmit}>
                    <div className="form-fill">
                        <div className="location col-6">
                            <h4>Địa điểm</h4>
                            <div className="destination">
                                <input className='w-100'
                                    value={search}
                                    onChange={handleChange}
                                    placeholder='Tìm kiếm địa điểm' />
                            </div>
                        </div>
                        <div className="add col-6">
                            <div className="btn">
                                <button type='submit'
                                    onSubmit={onSearchRoom}
                                >
                                    <i className='fa fa-search'></i> Tìm kiếm
                                </button>
                            </div>
                        </div>
                    </div>
                    {search.length !== 0 && (
                        <div className="result-location">
                            {arrBooking
                                .filter((item) => {
                                    const searchTerm = search.toString().toLowerCase();
                                    const location = item.tinhThanh.toLowerCase();
                                    return (
                                        searchTerm &&
                                        location.startsWith(searchTerm) &&
                                        location !== searchTerm
                                    );
                                }).map((item, index) => (
                                    <button
                                        onClick={() => onSearchRoom(item.tinhThanh)}
                                        className='data-result p-2'
                                        key={index}>
                                        {item.tenViTri} , {item.tinhThanh}
                                    </button>
                                ))}
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}