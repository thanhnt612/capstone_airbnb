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
    <div className='home-page-mobile'>
      <div className="carousel">
      <div id="carouselExampleCaptions" className="slider carousel slide" 
      data-bs-ride="carousel">
          <div className="introduce container">
            <h3>Hãy bắt đầu những chuyến du lịch</h3>
            <button className='btn'
              onClick={() => scrollToSection(content)}>
              Trải nghiệm ngay
            </button>
          </div>
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={1} aria-label="Slide 2" />
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={2} aria-label="Slide 3" />
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={3} aria-label="Slide 4" />
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={4} aria-label="Slide 5" />
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={5} aria-label="Slide 6" />
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={6} aria-label="Slide 7" />
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={7} aria-label="Slide 8" />
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={8} aria-label="Slide 9" />
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active"data-bs-interval="2000">
              <img src="../../img/slider/tphcm.jpg"
                className="d-block"
                width="100%"
                height="400px"
                alt="..." />
              <div className="carousel-caption d-md-block">
                <h5>Thành Phố Hồ Chí Minh</h5>
                <p>Quận 1.</p>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src="../../img/slider/hanoi.jpg"
                className="d-block"
                width="100%"
                height="400px"
                alt="..." />
              <div className="carousel-caption d-md-block">
                <h5>Hà Nội</h5>
                <p>Hồ Gươm</p>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src="../../img/slider/cantho.jpg"
                className="d-block"
                width="100%"
                height="400px"
                alt="..." />
              <div className="carousel-caption d-md-block">
                <h5>Cần Thơ</h5>
                <p>Cái Răng</p>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src="../../img/slider/nhatrang.jpg"
                className="d-block"
                width="100%"
                height="400px"
                alt="..." />
              <div className="carousel-caption d-md-block">
                <h5>Khánh Hòa</h5>
                <p>Nha Trang</p>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src="../../img/slider/phuquoc.jpg"
                className="d-block"
                width="100%"
                height="400px"
                alt="..." />
              <div className="carousel-caption d-md-block">
                <h5>Phú Quốc</h5>
                <p>Venice Phú Quốc</p>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src="../../img/slider/danang.jpg"
                className="d-block"
                width="100%"
                height="400px"
                alt="..." />
              <div className="carousel-caption d-md-block">
                <h5>Đà Nẵng</h5>
                <p>Cầu Rồng</p>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src="../../img/slider/dalat.jpg"
                className="d-block"
                width="100%"
                height="400px"
                alt="..." />
              <div className="carousel-caption d-md-block">
                <h5>Lâm Đồng</h5>
                <p>LangBiang - Đà Lạt</p>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img src="../../img/slider/phanthiet.jpg"
                className="d-block"
                width="100%"
                height="400px"
                alt="..." />
              <div className="carousel-caption d-md-block">
                <h5>Phan Thiết</h5>
                <p>Mũi Né</p>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
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
                    return <div className="list-city col-12 col-md-6 pb-3" key={index}>
                      <div className={`list-room item-${index} bg-light d-flex p-3 border border-2 
                      border-success border-opacity-25 rounded wow`}>
                        <div className="thumbnail col-4 pe-3">
                          <img src={location.hinhAnh}
                            className='w-100' alt=""
                            onClick={() => onList(location.id)}
                          />
                        </div>
                        <div className="detail col-8">
                          <h5 onClick={() => onList(location.id)}>
                            {location.tinhThanh} , {location.quocGia}</h5>
                          <p onClick={() => onList(location.id)}>
                            {location.tenViTri}</p>
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
            <div className="main row">
              <div className="service wow item-1 col-12 col-md-6">
                <div className="thumbnail">
                  <img src="/img/home/home.png" className='w-100' alt="" />
                </div>
                <p>Toàn bộ nhà</p>
              </div>
              <div className="service wow item-2 col-12 col-md-6">
                <div className="thumbnail">
                  <img src="/img/home/special.jpg" className='w-100 ' alt="" />
                </div>
                <p>Chỗ ở độc đáo</p>
              </div>
              <div className="service wow item-3 col-12 col-md-6">
                <div className="thumbnail">
                  <img src="/img/home/farm.jpg" className='w-100' alt="" />
                </div>
                <p>Trang trại và thiên nhiên</p>
              </div>
              <div className="service wow item-4 col-12 col-md-6">
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