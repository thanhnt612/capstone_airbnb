import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserLogin } from '../../pages/Login/Login';
import { EditProfile } from '../../pages/Profile/Profile';
import { UserRegister } from '../../pages/Register/Register';
import {
    ACCESSTOKEN,
    http,
    settings,
    USER_LOGIN,
    USER_PROFILE
} from "../../utils/config";
import { DispatchType } from '../configStore';
export interface UserProfile {
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

type UserLoginResult = {
    email: string;
    accessToken: string;
}
export type UserState = {
    userLogin?: UserLoginResult | null | undefined,
    userProfile?: UserProfile | null | undefined,
}
const initialState = {
    userLogin: settings.getStorageJson(USER_LOGIN)
        ? settings.getStorageJson(USER_LOGIN)
        : {},
    userProfile: settings.getStorageJson(USER_PROFILE)
        ? settings.getStorageJson(USER_PROFILE)
        : {},
}
const userReduder = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        setUserLoginAction: (state: UserState, action: PayloadAction<UserLoginResult>) => {
            state.userLogin = action.payload;
        },
        setUserProfileAction: (state: UserState, action: PayloadAction<UserProfile>) => {
            state.userProfile = action.payload;
        }
    }
});

export const { setUserLoginAction, setUserProfileAction } = userReduder.actions

export default userReduder.reducer


export const getProfileApi = (id: number) => {
    return async (dispatch: DispatchType) => {
        const result = await http.get('api/users/' + id);
        const action: PayloadAction<UserProfile> = setUserProfileAction(result.data.content);
        dispatch(action);
    }
}
export const registerApi = (register: UserRegister) => {
    return async (dispatch: DispatchType) => {
        const result = await http.post('/api/auth/signup/', register);
        console.log('Đăng ký: ', result.data.content);
        alert("Đăng ký tài khoản thành công");
        window.location.href = "/user/login";
    };
};
export const loginApi = (userLogin: UserLogin) => {
    return async (dispatch: DispatchType) => {
        const result = await http.post('api/auth/signin', userLogin);
        if (result.status === 200) {
            alert("Đăng nhập thành công");
            window.location.href = "/";
        }
        const action: PayloadAction<UserLoginResult> = setUserLoginAction(result.data.content);
        await dispatch(action);
        settings.setStorageJson(USER_LOGIN, result.data.content);
        settings.setStorage(ACCESSTOKEN, result.data.content.token);
        dispatch(getProfileApi(result.data.content.user.id));
    }
}
export const updateProfileApi = (id: number, update: EditProfile) => {
    return async (dispatch: DispatchType) => {
        const result = await http.put('/api/users/' + id, update);
        alert("Đã lưu thông tin, yêu cầu đăng nhập lại");
        window.location.href = "/user/login";
    };
};