import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    http,
    settings,
    USER_DETAIL
} from "../../utils/config";
import { DispatchType } from '../configStore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EditProfile } from '../../pages/Profile/Profile';


export interface UserDetail {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    birthday: string;
    avatar: string;
    gender: boolean;
    role: string;
}
export type UserState = {
    userProfile: UserDetail[] | null | undefined,
    userDetail: UserDetail | null | undefined
}
const initialState = {
    userProfile: [],
    userDetail: settings.getStorageJson(USER_DETAIL)
        ? settings.getStorageJson(USER_DETAIL)
        : {},
}
const userManager = createSlice({
    name: 'userManager',
    initialState,
    reducers: {
        setUserProfileAction: (state: UserState, action: PayloadAction<UserDetail[]>) => {
            state.userProfile = action.payload;
        },
        setDetailProfileAction: (state: UserState, action: PayloadAction<UserDetail>) => {
            state.userDetail = action.payload;
        },
    },
}
);

export const {
    setUserProfileAction,
    setDetailProfileAction
} = userManager.actions

export default userManager.reducer


export const getUserApi = () => {
    return async (dispatch: DispatchType) => {
        const result = await http.get('/api/users');
        const action: PayloadAction<UserDetail[]> = setUserProfileAction(result.data.content);
        dispatch(action);
    }
}
export const delUserApi = (id: number) => {
    return async (dispatch: DispatchType) => {
        const result = await http.delete('api/users?id=' + id);
        console.log(result);
        if (result.status === 200) {
            toast.success('Đã xóa thành viên ' + id, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                onClose: () => window.location.href = "/admin"
            });
        }
    }
}
export const getIdUserApi = (id: number) => {
    return async (dispatch: DispatchType) => {
        const result = await http.get('/api/users/' + id);
        const action: PayloadAction<UserDetail> = setDetailProfileAction(result.data.content);
        dispatch(action);
        settings.setStorageJson(USER_DETAIL, result.data.content);
    }
}
export const updateUser = (id: number, update: EditProfile) => {
    return async (dispatch: DispatchType) => {
        const result = await http.put('/api/users/' + id, update);
        if (result.status === 200) {
            toast.success('Cập nhật thành công, hãy giờ trong giây lát !!!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                onClose: () => window.location.href = "/admin"
            });
        }
    };
};
