import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom'
import { DispatchType, RootState } from '../../redux/configStore';
import { getBookingDetailApi, getBookingIdApi, postBookingApi } from '../../redux/reducers/bookingReducer';
import { DateRangePicker, RangeKeyDict } from "react-date-range"
import format from 'date-fns/format'
import { addDays } from 'date-fns'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { history } from '../../index';
type Props = {}

export default function Detail({ }: Props) {
  const { arrDetail } = useSelector((state: RootState) => state.bookingReducer);
  const { arrBookingId } = useSelector((state: RootState) => state.bookingReducer);
  const { userLogin } = useSelector((state: RootState) => state.userReduder);

  const dispatch: DispatchType = useDispatch();

  const params: any = useParams();
  useEffect(() => {
    const action = getBookingDetailApi(params.id);
    dispatch(action);
  }, [params.id])

  useEffect(() => {
    if (arrDetail?.id === 1 || arrDetail?.id === 2 || arrDetail?.id === 3) {
      dispatch(getBookingIdApi(1));
    } else if (arrDetail?.id === 4 || arrDetail?.id === 5 || arrDetail?.id === 6) {
      dispatch(getBookingIdApi(2));
    }
    else if (arrDetail?.id === 7 || arrDetail?.id === 8 || arrDetail?.id === 9) {
      dispatch(getBookingIdApi(3));
    }
    else if (arrDetail?.id === 10 || arrDetail?.id === 11 || arrDetail?.id === 12) {
      dispatch(getBookingIdApi(4));
    }
    else if (arrDetail?.id === 13 || arrDetail?.id === 14 || arrDetail?.id === 15) {
      dispatch(getBookingIdApi(5));
    }
    else if (arrDetail?.id === 16 || arrDetail?.id === 17) {
      dispatch(getBookingIdApi(6));
    }
    else if (arrDetail?.id === 18 || arrDetail?.id === 19) {
      dispatch(getBookingIdApi(7));
    }
    else if (arrDetail?.id === 20 || arrDetail?.id === 21) {
      dispatch(getBookingIdApi(8));
    }
  })
  //Set date range picker
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ])
  // open close
  const [open, setOpen] = useState(false)
  // get the target element to toggle 
  const refOne = useRef<HTMLInputElement>(null)
  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true)
  }, [])

  // hide dropdown on ESC press
  const hideOnEscape = (event: any) => {
    if (event.key === "Escape") {
      setOpen(false)
    }
  }
  const handleChangeDate = (rangesByKey: RangeKeyDict) => {
    const changeDate: any = rangesByKey
    setRange([changeDate.selection]);
  }
  const dateDiff = (date1: any, date2: any) => {
    const dt1 = new Date(date1);
    const dt2 = new Date(date2);
    return Math.floor(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
      (1000 * 60 * 60 * 24)
    );
  }
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      dateIn: { value: any };
      dateOut: { value: any };
      guest: { value: number };
    };
    const dateIn = target.dateIn.value;
    const dateOut = target.dateOut.value;
    const guest = target.guest.value;
    if (Object.keys(userLogin).length === 0) {
      toast.error('Xin h??y ????ng nh???p ????? ???????c ?????t ph??ng!!!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        onClose: () => history.push('/user/login')
      });
    } else {
      const action = postBookingApi(arrDetail?.id, arrDetail?.id, dateIn, dateOut, guest, userLogin.user.id)
      dispatch(action);
    }
  }
  return (
    <div className='detail-page'>
      <div className="container">
        <h3 className='pt-3'>{arrDetail?.tenPhong}</h3>
        <div className="title">
          <div className="info">
            <ul>
              <li>
                <p><i className='fa fa-star'></i>5,0
                  <span
                    className='underline'>(20 ????nh gi??)
                  </span></p>
              </li>
              <li>
                <i className="fa-solid fa-house-user"></i>
                <span>Ch??? nh?? si??u c???p</span>
              </li>
              <li className='underline'>
                {arrBookingId?.tenViTri} , {arrBookingId?.tinhThanh} , {arrBookingId?.quocGia}
              </li>
            </ul>
          </div>
          <div className="share">
            <ul>
              <li className='underline'>
                <i className='fa fa-share'></i>
                <span>Chia s???</span>
              </li>
              <li>
                <i className='fa fa-heart'></i>
                <span>L??u</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="image">
          <img src={arrDetail?.hinhAnh} className='w-100 h-100' alt="" />
        </div>
        <div className="description">
          <div className="row">
            <div className="content col-md-7 col-lg-7 col-xl-8">
              <div className="row">
                <div className="title-left col-md-10 col-xl-11">
                  <h3>To??n b??? c??n h??? cho thu??</h3>
                  <p>{arrDetail?.khach} kh??ch - {arrDetail?.phongNgu} ph??ng ng??? <br />
                    {arrDetail?.giuong} gi?????ng - {arrDetail?.phongTam} ph??ng t???m</p>
                </div>
                <div className="title-right col-md-2 col-xl-1">
                  <img src="http://picsum.photos/50/50" className='w-100 rounded-circle' alt="" />
                </div>
              </div>
              <div className="service col-12 border-top border-bottom py-3">
                <div className="row">
                  <div className="item d-flex pb-2">
                    <div className="col-1">
                      <i className='fa fa-home'></i>
                    </div>
                    <div className="col-11">
                      <h4>To??n b??? nh??</h4>
                      <p>B???n s??? c?? chung c?? cao c???p cho ri??ng m??nh</p>
                    </div>
                  </div>
                  <div className="item d-flex pb-2">
                    <div className="col-1">
                      <i className="fa-solid fa-hand-sparkles"></i>
                    </div>
                    <div className="col-11">
                      <h4>V??? sinh t??ng c?????ng</h4>
                      <p>Ch??? nh?? n??y ???? c???m k???t th???c hi???n quy tr??nh v??? sinh t??ng c?????ng 5 b?????c c???a Airbnb <NavLink to=''>Hi???n th??? th??m</NavLink>
                      </p>
                    </div>
                  </div>
                  <div className="item d-flex pb-2">
                    <div className="col-1">
                      <i className="fa-solid fa-house-user"></i>
                    </div>
                    <div className="col-11">
                      <h4>Ch??? nh?? si??u c???p</h4>
                      <p>
                        {arrDetail?.moTa}
                      </p>
                    </div>
                  </div>
                  <div className="item d-flex pb-2">
                    <div className="col-1">
                      <i className="fa-regular fa-calendar-days"></i>
                    </div>
                    <div className="col-11">
                      <h4>Mi???n ph?? trong 48 gi???</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="authority py-3">
                <img src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg" alt=""
                  width={125} height={26}
                />
                <p className='pt-3'>
                  M???i ?????t ph??ng ?????u ???????c b???o v??? mi???n ph?? trong tr?????ng h???p Ch??? nh?? h???y, th??ng tin nh??/ph??ng cho thu?? kh??ng ch??nh x??c v?? nh???ng v???n ????? kh??c nh?? s??? c??? trong qu?? tr??nh nh???n ph??ng.
                </p>
                <NavLink to=''>
                  T??m hi???u th??m
                </NavLink>
              </div>
              <div className="facility py-3 border-top w-100">
                <h4>N??i n??y c?? nh???ng g?? cho b???n</h4>
                <div className="row">
                  <div className="col-6">
                    {arrDetail?.bep
                      ? (<div className="item d-flex align-items-center">
                        <div className="col-md-2 col-lg-2 col-xl-1">
                          <i className="fa-solid fa-utensils"></i>
                        </div>
                        <div className="col-md-10 col-lg-10 col-xl-11">
                          <span>B???p</span>
                        </div>
                      </div>)
                      : ""}
                    {arrDetail?.banLa
                      ? (<div className="item d-flex align-items-center">
                        <div className="col-md-2 col-lg-2 col-xl-1">
                          <i className="fa-solid fa-house-laptop"></i>
                        </div>
                        <div className="col-md-10 col-lg-10 col-xl-11">
                          <span>B??n l??m vi???c</span>
                        </div>
                      </div>)
                      : ""}
                    {arrDetail?.banUi
                      ? (<div className="item d-flex align-items-center">
                        <div className="col-md-2 col-lg-2 col-xl-1">
                          <i className="fa-solid fa-shirt"></i>
                        </div>
                        <div className="col-md-10 col-lg-10 col-xl-11">
                          <span>B??n ???i</span>
                        </div>
                      </div>)
                      : ""}
                    {arrDetail?.dieuHoa
                      ? (<div className="item d-flex align-items-center">
                        <div className="col-md-2 col-lg-2 col-xl-1">
                          <i className="fa-solid fa-fan"></i>
                        </div>
                        <div className="col-md-10 col-lg-10 col-xl-11">
                          <span>??i???u h??a nhi???t ?????</span>
                        </div>
                      </div>)
                      : ""}
                    {arrDetail?.doXe
                      ? (<div className="item d-flex align-items-center">
                        <div className="col-md-2 col-lg-2 col-xl-1">
                          <i className="fa-solid fa-car"></i>
                        </div>
                        <div className="col-md-10 col-lg-10 col-xl-11">
                          <span>B??i ????? xe</span>
                        </div>
                      </div>)
                      : ""}
                    {arrDetail?.hoBoi
                      ? (<div className="item d-flex align-items-center">
                        <div className="col-md-2 col-lg-2 col-xl-1">
                          <i className="fa-solid fa-person-swimming"></i>
                        </div>
                        <div className="col-md-10 col-lg-10 col-xl-11">
                          <span>H??? b??i</span>
                        </div>
                      </div>)
                      : ""}
                    {arrDetail?.mayGiat
                      ? (<div className="item d-flex align-items-center">
                        <div className="col-md-2 col-lg-2 col-xl-1">
                          <i className="fa-solid fa-socks"></i>
                        </div>
                        <div className="col-md-10 col-lg-10 col-xl-11">
                          <span>M??y gi???t</span>
                        </div>
                      </div>)
                      : ""}
                    {arrDetail?.tivi
                      ? (<div className="item d-flex align-items-center">
                        <div className="col-md-2 col-lg-2 col-xl-1">
                          <i className="fa-solid fa-tv"></i>
                        </div>
                        <div className="col-md-10 col-lg-10 col-xl-11">
                          <span>Ti-vi</span>
                        </div>
                      </div>)
                      : ""}
                    {arrDetail?.wifi
                      ? (<div className="item d-flex align-items-center">
                        <div className="col-md-2 col-lg-2 col-xl-1">
                          <i className="fa-solid fa-wifi"></i>
                        </div>
                        <div className="col-md-10 col-lg-10 col-xl-11">
                          <span>Wifi</span>
                        </div>
                      </div>)
                      : ""}
                  </div>
                </div>
                <div className="show-more pt-3">
                  <button className='btn bg-light'>
                    Hi???n th??? t???t c??? 29 ti???n nghi
                  </button>
                </div>
              </div>
            </div>
            <div className="payment col-md-5 col-lg-5 col-xl-4">
              <form
                onSubmit={handleSubmit}
              >
                <div className="check p-4 bg-light">
                  <div className="cost">
                    <p> <span className='fw-bold'>${arrDetail?.giaTien}</span>/????m</p>
                  </div>
                  <div className="row">
                    <div className="calendar p-2 text-center ">
                      <div className="check row">
                        <div className="check-in col-lg-12 col-xl-6">
                          <p>
                            <i className="fa-regular fa-calendar-days"></i> Nh???n ph??ng</p>
                          <input
                            id='dateIn'
                            name='dateIn'
                            value={format(range[0].startDate, "yyyy-MM-dd")}
                            readOnly
                            className="date-in text-center"
                            onClick={() => setOpen(open => !open)}
                          />
                        </div>
                        <div className="check-out col-lg-12 col-xl-6">
                          <p><i className="fa-regular fa-calendar-days"></i> Tr??? ph??ng</p>
                          <input
                            id='dateOut'
                            name='dateOut'
                            value={format(range[0].endDate, "yyyy-MM-dd")}
                            readOnly
                            className="date-out text-center"
                            onClick={() => setOpen(open => !open)}
                          />
                        </div>
                      </div>
                      <div ref={refOne}>
                        {open &&
                          <DateRangePicker
                            onChange={handleChangeDate}
                            editableDateInputs={true}
                            moveRangeOnFirstSelection={false}
                            ranges={range}
                            months={2}
                            direction="horizontal"
                            className="calendarElement"
                          />
                        }
                      </div>
                    </div>
                    <div className="add-guest w-100 text-center mt-2 p-2">
                      <p>Kh??ch</p>
                      <input className='w-20'
                        type="number"
                        id='guest'
                        name='guest' />
                    </div>
                    <div className='button my-3'>
                      <button className='btn border' type='submit'>
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
                        ?????t ph??ng
                      </button>
                    </div>
                    <div className='notification text-center'>
                      <p>B???n v???n ch??a b??? tr??? ti???n</p>
                    </div>
                    <div className="check-payment border-bottom">
                      <div className="cost-amount d-flex justify-content-between">
                        <div className="cost-date text-decoration-underline">
                          <p>${arrDetail?.giaTien} x {dateDiff
                            (format(range[0].startDate, "yyyy-MM-dd"),
                              format(range[0].endDate, "yyyy-MM-dd"))} ????m
                          </p>
                        </div>
                        <div className="bill">
                          <p>
                            ${arrDetail?.giaTien * dateDiff
                              (format(range[0].startDate, "yyyy-MM-dd"),
                                format(range[0].endDate, "yyyy-MM-dd"))}
                          </p>
                        </div>
                      </div>
                      <div className="service-cost d-flex justify-content-between">
                        <div className="service text-decoration-underline">
                          <p>Ph?? d???ch v???</p>
                        </div>
                        <div className="cost">
                          $31
                        </div>
                      </div>
                    </div>
                    <div className="total d-flex justify-content-between py-3">
                      <div className="detail">
                        <p>T???ng</p>
                      </div>
                      <div className="in-total">
                        {arrDetail?.giaTien *
                          dateDiff
                            (format(range[0].startDate, "yyyy-MM-dd"),
                              format(range[0].endDate, "yyyy-MM-dd")) + 31}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}