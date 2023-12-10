import React from 'react';
import '../index.css'
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import UserContext from './components/context/UserContext';
import { Provider } from 'react-redux';
import store from './components/stores/store';

export default function AppLayout() {
    // this should be part of useEffect as it must come from API
    const user = {
        name: 'شادمان',
        email: 'invalid.email@gmail.com'
    };

    return (
        <div className='bg-purple-200 min-h-screen'>
            <Provider store={store}>
                <UserContext.Provider value={{ user }}>
                    <Header />
                    <Outlet />
                    <Footer />
                </UserContext.Provider>
            </Provider>
        </div>
    )
}