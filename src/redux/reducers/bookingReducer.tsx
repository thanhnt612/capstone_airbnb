import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DispatchType } from '../configStore';
import { http } from '../../utils/config';

export interface BookingModel {
    id: number;
    tenViTri: string;
    tinhThanh: string;
    quocGia: string;
    hinhAnh: string;
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
    arrLocation: BookingLocation[],
    arrDetail: BookingDetail | null,
    arrHistory: BookingLocation[],
    arrarrDetailHistory: BookingLocation[]

}

const initialState: BookingState = {
    arrBooking: [],
    arrLocation: [],
    arrDetail: null,
    arrHistory: [],
    arrarrDetailHistory: []
}

const bookingReducer = createSlice({
    name: 'bookingReducer',
    initialState,
    reducers: {
        setArrAction: (state: BookingState, action: PayloadAction<BookingModel[]>) => {
            const arrBookingList: BookingModel[] = action.payload;
            state.arrBooking = arrBookingList;
        },
        setLocationAction: (state: BookingState, action: PayloadAction<BookingLocation[]>) => {
            const arrLocationList: BookingLocation[] = action.payload;
            state.arrLocation = arrLocationList;
        },
        setDetailAction: (state: BookingState, action: PayloadAction<BookingDetail>) => {
            state.arrDetail = action.payload;
        },
        setHistoryAction: (state: BookingState, action: PayloadAction<BookingLocation[]>) => {
            state.arrHistory = action.payload;
        },
        setDetailHistoryAction: (state: BookingState, action: PayloadAction<BookingLocation[]>) => {
            state.arrarrDetailHistory = action.payload;
        }
    }
});

export const { setArrAction, setLocationAction, setDetailAction, setHistoryAction, setDetailHistoryAction } = bookingReducer.actions
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
            console.log("Lịch sử đặt phòng: ", result);
        };
    };
export const getBookingProfileIdApi = (profileId: number) => {
    return async (dispatch: DispatchType) => {
        const result: any = await http.get('/api/dat-phong/lay-theo-nguoi-dung/' + profileId);
        // console.log(result.data.content)
        let bookingHistory: BookingLocation[] = result.data.content;
        const action: PayloadAction<BookingLocation[]> = setHistoryAction(bookingHistory);
        dispatch(action);
        // dispatch(getBookingHistoryApi(result.data.content))
        // result.data.content.map((item: any) => {
        //     console.log(item.maPhong);
        // })
    }
}
// export const getBookingHistoryApi = (id: any) => {
//     return async (dispatch: DispatchType) => {
//         const result: any = await http.get('/api/phong-thue/' + id);
//         let bookingDetail: BookingLocation[] = result.data.content;
//         const action: PayloadAction<BookingLocation[]> = setDetailHistoryAction(bookingDetail);
//         dispatch(action);
//     }
// }