import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import { AuthLayout, Login} from './components/index.js'
// import Login from "./pages/Login.jsx"
import Home from "./pages/Home.jsx"
import Signup from "./pages/Signup.jsx"
import AllPosts from "./pages/AllPosts.jsx"
import AddPost from "./pages/AddPost.jsx"
import EditPost from "./pages/EditPost.jsx"
import Post from "./pages/Post.jsx"

import About from "./pages/About.jsx"
import Features from "./pages/Features.jsx"
import Pricing from "./pages/Pricing.jsx"
import Affiliate from "./pages/Affiliate.jsx"
import PressKit from "./pages/PressKit.jsx"
import Help from "./pages/Help.jsx"
import Contact from "./pages/Contact.jsx"
import Support from "./pages/Support.jsx"
import Terms from "./pages/Terms.jsx"
import Privacy from "./pages/Privacy.jsx"
import License from "./pages/License.jsx"
import Profile from "./pages/Profile.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/profile",
            element: (
                <AuthLayout authentication>
                    <Profile />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
        {
            path: "/features",
            element: <Features />
        },
        {
            path: "/pricing",
            element: <Pricing />
        },
        {
            path: "/affiliate",
            element: <Affiliate />
        },
        {
            path: "/press-kit",
            element: <PressKit />
        },
        {
            path: "/help",
            element: <Help />
        },
        {
            path: "/contact",
            element: <Contact />
        },
        {
            path: "/support",
            element: <Support />
        },
        {
            path: "/terms",
            element: <Terms />
        },
        {
            path: "/privacy",
            element: <Privacy />
        },
        {
            path: "/license",
            element: <License />
        },
        {
            path: "/about",
            element: <About />
        },
        
    ],
},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>

  </StrictMode>,
)
