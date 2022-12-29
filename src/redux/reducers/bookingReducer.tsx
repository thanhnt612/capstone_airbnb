import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DispatchType } from '../configStore';
import { ACCESSTOKEN, http, settings, USER_CART } from '../../utils/config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { history } from '../../index';

export interface BookingModel {
    id: number;
    tenViTri: string;
    tinhThanh: string;
    quocGia: string;
    hinhAnh: string;
}
export interface ProfileModel {
    id: number | any;
    maPhong: number;
    ngayDen: Date;
    ngayDi: Date;
    soLuongKhach: number;
    maNguoiDung: number;
}

export interface BookingLocation {
    id: number;
    tenPhong: string;
    khach: number;
    phongNgu: number;
    giuong: number;
    phongTam: number;
    moTa: string;
    giaTien: number;
    mayGiat: boolean;
    banLa: boolean;
    tivi: boolean;
    dieuHoa: boolean;
    wifi: boolean;
    bep: boolean;
    doXe: boolean;
    hoBoi: boolean;
    banUi: boolean;
    maViTri: number;
    hinhAnh: string;
}

export interface BookingDetail {
    id: number | any;
    tenPhong: string;
    khach: number;
    phongNgu: number;
    giuong: number;
    phongTam: number;
    moTa: string;
    giaTien: number | any;
    mayGiat: boolean;
    banLa: boolean;
    tivi: boolean;
    dieuHoa: boolean;
    wifi: boolean;
    bep: boolean;
    doXe: boolean;
    hoBoi: boolean;
    banUi: boolean;
    maViTri: number | any;
    hinhAnh: string;
}


interface BookingState {
    arrBooking: BookingModel[],
    arrBookingId: BookingModel | null,
    arrLocation: BookingLocation[],
    arrDetail: BookingDetail | null,
    arrHistory: ProfileModel[],
    arrDetailHistory: BookingLocation[]
}

const initialState: BookingState = {
    arrBooking: [],
    arrBookingId: null,
    arrLocation: [],
    arrDetail: null,
    arrHistory: settings.getStorageJson(USER_CART)
        ? settings.getStorageJson(USER_CART)
        : {},
    arrDetailHistory: [],
}

const bookingReducer = createSlice({
    name: 'bookingReducer',
    initialState,
    reducers: {
        setArrAction:
            (state: BookingState, action: PayloadAction<BookingModel[]>) => {
                const arrBookingList: BookingModel[] = action.payload;
                state.arrBooking = arrBookingList;
            },
        setArrIdAction:
            (state: BookingState, action: PayloadAction<BookingModel>) => {
                const arrBookingList: BookingModel = action.payload;
                state.arrBookingId = arrBookingList;
            },
        setLocationAction:
            (state: BookingState, action: PayloadAction<BookingLocation[]>) => {
                const arrLocationList: BookingLocation[] = action.payload;
                state.arrLocation = arrLocationList;
            },
        setDetailAction:
            (state: BookingState, action: PayloadAction<BookingDetail>) => {
                state.arrDetail = action.payload;
            },
        setHistoryAction:
            (state: BookingState, action: PayloadAction<ProfileModel[]>) => {
                state.arrHistory = action.payload;
            },
        setDetailHistoryAction:
            (state: BookingState, action: PayloadAction<BookingLocation[]>) => {
                state.arrDetailHistory = action.payload;
            },
        deleteBookingAction:
            (state: BookingState, action: PayloadAction<BookingDetail>) => {
                const id = action.payload;
                state.arrHistory = state.arrHistory.filter((item) => item.id !== id);
                settings.setStorageJson(USER_CART, state.arrHistory);
            },
    }
});

export const {
    setArrAction,
    setArrIdAction,
    setLocationAction,
    setDetailAction,
    setHistoryAction,
    setDetailHistoryAction,
    deleteBookingAction } = bookingReducer.actions
export default bookingReducer.reducer

//--------------------Action Async ---------------------
export const getBookingApi = () => {
    return async (dispatch: DispatchType) => {
        const result: any = await http.get('api/vi-tri');
        let arrBooking: BookingModel[] = result.data.content;
        const action: PayloadAction<BookingModel[]> = setArrAction(arrBooking);
        dispatch(action)
    }
}
export const getBookingIdApi = (id: number) => {
    return async (dispatch: DispatchType) => {
        const result: any = await http.get('api/vi-tri/' + id);
        let arrBookingId: BookingModel = result.data.content;
        const action: PayloadAction<BookingModel> = setArrIdAction(arrBookingId);
        dispatch(action)
    }
}
export const getBookingLocationApi = (maViTri: number) => {
    return async (dispatch: DispatchType) => {
        const result: any = await http.get('/api/phong-thue/lay-phong-theo-vi-tri?maViTri=' + maViTri);
        let arrBookingLocation: BookingLocation[] = result.data.content;
        const action: PayloadAction<BookingLocation[]> = setLocationAction(arrBookingLocation);
        dispatch(action)
    }
}
export const getBookingDetailApi = (id: string) => {
    return async (dispatch: DispatchType) => {
        const result: any = await http.get('/api/phong-thue/' + id);
        let bookingDetail: BookingDetail = result.data.content;
        const action: PayloadAction<BookingDetail> = setDetailAction(bookingDetail);
        dispatch(action);
    }
}
export const postBookingApi =
    (id: number, roomId: number, dateIn: any, dateOut: any, guest: number, profileId: number) => {
        return async (dispatch: DispatchType) => {
            const result = await http.post("/api/dat-phong", {
                id: id,
                maPhong: roomId,
                ngayDen: dateIn,
                ngayDi: dateOut,
                soLuongKhach: guest,
                maNguoiDung: profileId
            });
            if (result.status === 201) {
                toast.success('Đặt phòng thành công !!!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    onClose: () => history.push('/profile')
                });
            }
        };
    };
export const getBookingProfileIdApi = (profileId: number) => {
    return async (dispatch: DispatchType) => {
        const result: any =
            await http.get('/api/dat-phong/lay-theo-nguoi-dung/' + profileId);
        let bookingHistory: ProfileModel[] = result.data.content;
        const action: PayloadAction<ProfileModel[]> =
            setHistoryAction(bookingHistory);
        dispatch(action);
        dispatch(getBookingHistoryApi());
        settings.setStorageJson(USER_CART, result.data.content);
        settings.setStorage(ACCESSTOKEN, result.data.content.token);
    }
}
export const getBookingHistoryApi = () => {
    return async (dispatch: DispatchType) => {
        const result: any = await http.get('/api/phong-thue/');
        let bookingDetail: BookingLocation[] = result.data.content;
        const action: PayloadAction<BookingLocation[]> =
            setDetailHistoryAction(bookingDetail);
        dispatch(action);
    }
}