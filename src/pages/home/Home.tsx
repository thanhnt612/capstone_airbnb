import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DispatchType, RootState } from '../../redux/configStore';
import { getBookingLocationApi } from '../../redux/reducers/bookingReducer';

type Props = {}

export default function Home({ }: Props) {
  const dispatch: DispatchType = useDispatch();
  const content = useRef(null);
  const navigate = useNavigate();
  const { arrBooking } = useSelector((state: RootState) => state.bookingReducer)
  const onList = (city: number) => {
    const action = getBookingLocationApi(city);
    dispatch(action)
    navigate("/list");
  }
  //scroll To section page
  const scrollToSection = (link: any) => {
    window.scrollTo({
      top: link.current.offsetTop,
      behavior: "smooth",
    });
  };
  return (
    <div className='home-page'>
      <div className="carousel">
        <div className="introduce container">
          <h3>Hãy bắt đầu những chuyến du lịch</h3>
          <h4>Tận hưởng cuộc sống</h4>
          <button className='btn'
            onClick={() => scrollToSection(content)}>
            Trải nghiệm ngay
          </button>
        </div>
      </div>
      <div className='content' ref={content}>
        <div className="container">
          <div className="list mb-5">
            <div className="tittle">
              <h3>Khám phá những điểm đến gần đây</h3>
            </div>
            <div className="menu pt-5" ref={content}>
              <div className="row">
                {arrBooking.map((location, index) => {
                  if (location.id < 9) {
                    return <div className="list-city col-xl-3 col-lg-4 col-md-6 pb-3" key={index}>
                      <div className="item d-flex p-3 bg-light border border-2 
                      border-success border-opacity-25 rounded">
                        <div className="thumbnail col-4 pe-3">
                          <img src={location.hinhAnh}
                            className='w-100' alt="" />
                        </div>
                        <div className="detail col-8">
                          <h5>{location.tinhThanh} , {location.quocGia}</h5>
                          <p>{location.tenViTri}</p>
                          <button className="locate" onClick={() => onList(location.id)}>
                            Danh sách phòng
                          </button>
                        </div>
                      </div>
                    </div>
                  }
                })}
              </div>
            </div>
          </div>
          <div className="convenient">
            <div className="tittle">
              <h3>Ở bất cứ đâu</h3>
            </div>
            <div className="row">
              <div className="item col-lg-3 col-md-6">
                <div className="thumbnail">
                  <img src="/img/home/home.png" className='w-100' alt="" />
                </div>
                <p>Toàn bộ nhà</p>
              </div>
              <div className="item col-lg-3 col-md-6">
                <div className="thumbnail">
                  <img src="/img/home/special.jpg" className='w-100 ' alt="" />
                </div>
                <p>Chỗ ở độc đáo</p>
              </div>
              <div className="item col-lg-3 col-md-6">
                <div className="thumbnail">
                  <img src="/img/home/farm.jpg" className='w-100' alt="" />
                </div>
                <p>Trang trại và thiên nhiên</p>
              </div>
              <div className="item col-lg-3 col-md-6">
                <div className="thumbnail">
                  <img src="/img/home/dog.png" className='w-100' alt="" />
                </div>
                <p>Cho phép mang theo thú cưng</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}