import { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client'
import AppLayout from './src/AppLayout'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from './src/components/Error';
import Body from './src/components/Body';
import RestaurantMenu from './src/components/RestaurantMenu';
import Shimmer from './src/components/Shimmer';

const Profile = lazy(() => import('./src/components/Profile'));
const About = lazy(() => import('./src/components/About'));
const Cart = lazy(() => import('./src/components/Cart'));

const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Body />
            },
            {
                path: '/about',
                element: <Suspense fallback={<Shimmer />}><About /></Suspense>,
                children: [
                    {
                        path: 'profile',
                        element: <Profile />
                    }
                ]
            },
            {
                path: '/profile',
                element: <Suspense fallback={<Shimmer />}><Profile /></Suspense>
            },
            {
                path: '/restaurant/:id',
                element: <RestaurantMenu />
            },
            {
                path: '/cart',
                element: <Suspense fallback={<Shimmer />}><Cart /></Suspense>
            }
        ]
    },
])

async function runApp() {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<RouterProvider router={appRouter} />);
}

runApp();