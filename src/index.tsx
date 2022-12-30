import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/scss/style.scss';
import {
  unstable_HistoryRouter as HistoryRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Provider } from 'react-redux'
import { store } from './redux/configStore';
import HomeTemplate from './templates/HomeTemplate';
import Home from './pages/home/Home';
import Detail from './pages/Detail/Detail';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile'
import Admin from './pages/Admin/Admin'
import List from './pages/List/List';
import Home_Mobile from './pages/home/Home_Mobile';
import Detail_Mobile from './pages/Detail/Detail_Mobile';
import Profile_Mobile from './pages/Profile/Profile_Mobile';
import List_Mobile from './pages/List/List_Mobile';
import ResponsiveItem from './Components/ResponsiveItem/ResponsiveItem';
import UserTemplate from './templates/UserTemplate';

import { createBrowserHistory } from "history";
export const history: any = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path='' element={<HomeTemplate />}>
          <Route index element={<ResponsiveItem component={Home} mobileComponent={Home_Mobile} />}></Route>
          <Route path='home' element={<ResponsiveItem component={Home} mobileComponent={Home_Mobile} />}></Route>
          <Route path='detail' element={
            <ResponsiveItem
              component={Detail}
              mobileComponent={Detail_Mobile}
            />
          }>
            <Route path=':id' element={<Detail />}></Route>
          </Route>
          <Route path='list' element={
            <ResponsiveItem
              component={List}
              mobileComponent={List_Mobile}
            />
          }></Route>
          <Route path='profile' element={
            <ResponsiveItem
              component={Profile}
              mobileComponent={Profile_Mobile}
            />
          }></Route>
          <Route path='*' element={<Navigate to="" />}></Route>
        </Route>
        <Route path='admin' element={<Admin />}></Route>
        <Route path='user' element={<UserTemplate />}>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path='*' element={<Navigate to="" />}></Route>
        </Route>
      </Routes>
    </HistoryRouter>
  </Provider>
);


