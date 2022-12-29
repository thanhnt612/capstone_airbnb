import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState } from '../../redux/configStore';

type Props = {}

export default function List({ }: Props) {
    const { arrLocation } = useSelector((state: RootState) => state.bookingReducer)
    return (
        <div className='list-page'>
            <div className="container">
                <div className="row">
                    <div className="content col-md-12 col-lg-6 mb-3">
                        <div className="tittle pt-3" >
                            <p>Hơn {arrLocation.length - 1} chỗ ở đã chọn</p>
                            <h3>Chỗ ở tại khu vực bản đồ đã chọn</h3>
                        </div>
                        {arrLocation.map((location) => {
                            return <div className="list-choose d-flex bg-light
                            border border-2 border-success border-opacity-25 rounded">
                                <div className="thumbnail col-4 me-3">
                                    <img src={location.hinhAnh}
                                        className='w-100 h-100' alt="" />
                                </div>
                                <div className="detail col-8 p-2">
                                    <div className="info">
                                        <h5>{location.tenPhong}</h5>
                                        <p>
                                            2 khách - phòng studio - {location.giuong} giường -  {location.phongTam} phòng tắm <br />
                                            {<span>{location.wifi}</span> ? <span>Wifi</span> : ""} - {<span>{location.bep}</span> ? <span>Bếp</span> : ""} - {<span>{location.dieuHoa}</span> ? <span>Điều hòa</span> : ""} - {<span>{location.mayGiat}</span> ? <span>Máy giặt</span> : ""}
                                        </p>
                                    </div>
                                    <div className="view-more">
                                        <div className="button">
                                            <NavLink to={`/detail/${location.id}`} className="btn">
                                                <span>
                                                    Xem chi tiết
                                                </span>
                                            </NavLink>
                                        </div>
                                        <div className='price'>
                                            <NavLink to={`/detail/${location.id}`} className='btn'>
                                                <span className='fw-bold'>${location.giaTien}</span> / Day
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                    {arrLocation.map((location) => {
                        if (location.id === 1) {
                            return <div className="map col-md-12 col-lg-6 d-flex">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31355.76526343408!2d106.68085295431784!3d10.775218717620032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f38f9ed887b%3A0x14aded5703768989!2zUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1671008121475!5m2!1svi!2s"
                                    width="900" style={{ minHeight: '88vh', border: 0 }} loading="lazy"></iframe>
                            </div>;
                        } else if (location.id === 4) {
                            return <div className="map col-md-12 col-lg-6 d-flex">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62860.6227411118!2d105.72255088656237!3d10.034269632947554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0629f6de3edb7%3A0x527f09dbfb20b659!2zQ-G6p24gVGjGoSwgTmluaCBLaeG7gXUsIEPhuqduIFRoxqEsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1671008012929!5m2!1svi!2s"
                                    width="900" style={{ minHeight: '88vh', border: 0 }} loading="lazy"></iframe>
                            </div>;
                        } else if (location.id === 7) {
                            return <div className="map col-md-12 col-lg-6 d-flex">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11026.919806709202!2d109.19877948837541!3d12.274995804767029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317067ee1f10258f%3A0xa2ae94ae4dab603b!2zSMOybiBDaOG7k25nLCBWxKluaCBQaMaw4bubYywgTmhhIFRyYW5nLCBLaMOhbmggSMOyYSA2NTAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1671008288100!5m2!1svi!2s"
                                    width="900" style={{ minHeight: '88vh', border: 0 }} loading="lazy"></iframe>
                            </div>;
                        }
                        else if (location.id === 10) {
                            return <div className="map col-md-12 col-lg-6 d-flex">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29793.98038438121!2d105.8194541087431!3d21.02277876319995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a9!2zSMOgIE7hu5lpLCBIb8OgbiBLaeG6v20sIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1671008510348!5m2!1svi!2s"
                                    width="900" style={{ minHeight: '88vh', border: 0 }} loading="lazy"></iframe>
                            </div>;
                        }
                        else if (location.id === 13) {
                            return <div className="map col-md-12 col-lg-6 d-flex">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5552.781849559079!2d103.95640894283498!3d10.228503003697393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a78b008f107863%3A0x495788ff275ba994!2sFisherman%20Homestay!5e0!3m2!1svi!2s!4v1671008729243!5m2!1svi!2s"
                                    width="900" style={{ minHeight: '88vh', border: 0 }} loading="lazy"></iframe>
                            </div>;
                        }
                        else if (location.id === 16) {
                            return <div className="map col-md-12 col-lg-6 d-flex">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61349.621264892834!2d108.17168659427666!3d16.047248394397815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219c792252a13%3A0xfc14e3a044436487!2zxJDDoCBO4bq1bmcsIEjhuqNpIENow6J1LCDEkMOgIE7hurVuZywgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1671009325621!5m2!1svi!2s"
                                    width="900" style={{ minHeight: '88vh', border: 0 }} loading="lazy"></iframe>
                            </div>;
                        }
                        else if (location.id === 18) {
                            return <div className="map col-md-12 col-lg-6 d-flex">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11040.618770464878!2d108.4546757965787!3d11.943439475759906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317112fef20988b1%3A0xad5f228b672bf930!2zVHAuIMSQw6AgTOG6oXQsIEzDom0gxJDhu5NuZywgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1671008909188!5m2!1svi!2s"
                                    width="900" style={{ minHeight: '88vh', border: 0 }} loading="lazy"></iframe>
                            </div>;
                        }
                        else if (location.id === 20) {
                            return <div className="map col-md-12 col-lg-6 d-flex">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44316.3961970676!2d108.29054964900895!3d10.959366653159249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31768e4c7f7c96b5%3A0x1a406b72c1020724!2zTcWpaSBOw6ksIFRwLiBQaGFuIFRoaeG6v3QsIELDrG5oIFRodeG6rW4sIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1671009016699!5m2!1svi!2s"
                                    width="900" style={{ minHeight: '88vh', border: 0 }} loading="lazy"></iframe>
                            </div>;
                        }
                    })}
                </div>
            </div>
        </div >
    )
}
