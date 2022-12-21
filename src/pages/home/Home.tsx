import React from 'react'


type Props = {}

export default function Home({ }: Props) {

  return (
    <div className='home-page'>
      <div className="carousel">
        <div className="introduce container">
          <h3>Hãy bắt đầu những cuộc phiêu lưu</h3>
          <h4>Cuộc đời là những chuyến đi.</h4>
          <button className='btn'>
            Trải nghiệm ngay
          </button>
        </div>
      </div>
      <div className='content'>
        <div className="container">
          <div className="list mb-5">
            <div className="tittle">
              <h3>Khám phá những điểm đến gần đây</h3>
            </div>
            <div className="menu pt-5">
              <div className="city">
                <div className="row">
                  <div className="col-3">
                    <div className="item d-flex">
                      <div className="thumbnail col-3 pe-3">
                        <img src="http://picsum.photos/200/200"
                          className='w-100' alt="" />
                      </div>
                      <div className="detail col-9">
                        <h5>Thành phố Hồ Chí Minh</h5>
                        <p>15 phút lái xe</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="item d-flex">
                      <div className="thumbnail col-3 pe-3">
                        <img src="http://picsum.photos/200/200"
                          className='w-100' alt="" />
                      </div>
                      <div className="detail col-9">
                        <h5>Thành phố Hồ Chí Minh</h5>
                        <p>15 phút lái xe</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="item d-flex">
                      <div className="thumbnail col-3 pe-3">
                        <img src="http://picsum.photos/200/200"
                          className='w-100' alt="" />
                      </div>
                      <div className="detail col-9">
                        <h5>Thành phố Hồ Chí Minh</h5>
                        <p>15 phút lái xe</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="item d-flex">
                      <div className="thumbnail col-3 pe-3">
                        <img src="http://picsum.photos/200/200"
                          className='w-100' alt="" />
                      </div>
                      <div className="detail col-9">
                        <h5>Thành phố Hồ Chí Minh</h5>
                        <p>15 phút lái xe</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="convenient">
            <div className="tittle">
              <h3>Ở bất cứ đâu</h3>
            </div>
            <div className="row">
              <div className="item col-3">
                <div className="thumbnail">
                  <img src="/img/home/home.png" className='w-100' alt="" />
                </div>
                <p>Toàn bộ nhà</p>
              </div>
              <div className="item col-3">
                <div className="thumbnail">
                  <img src="/img/home/special.jpg" className='w-100 ' alt="" />
                </div>
                <p>Chỗ ở độc đáo</p>
              </div>
              <div className="item col-3">
                <div className="thumbnail">
                  <img src="/img/home/farm.jpg" className='w-100' alt="" />
                </div>
                <p>Trang trại và thiên nhiên</p>
              </div>
              <div className="item col-3">
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