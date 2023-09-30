import { useSelector } from 'react-redux'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import ErrorPage from '../pages/ErrorPage'
import { getconversation, getmyblog, getrandomblog, getuser } from '../api/user.api'
// import { lazy } from 'react'

import Main from '../pages/Dashboard/dashboard'
import ChatPage from '../pages/chatPage'
import PlanPage from '../pages/planPage'
import TutorialPage from '../pages/tutorialPage'
import BlogPage from '../pages/blogPage'
import CompetitionPage from '../pages/competitionPage'
import SettingPage from '../pages/settingPage'
import ChatBox from '../pages/chatPage/chatBox'
import ContactPage from '../pages/chatPage/contactPage'
import FavoritesPage from '../pages/chatPage/favoritesPage'
import BlogsBox from '../pages/blogPage/blogsBox'
import MyBlog from '../pages/blogPage/myBlog'
import EvaluatePage from '../pages/evaluatePage'
// const Main = lazy(() => import('../pages/Dashboard/dashboard'))
// const ChatPage = lazy(() => import('../pages/chatPage'))
// const PlanPage = lazy(() => import('../pages/planPage'))
// const TutorialPage = lazy(() => import('../pages/tutorialPage'))
// const BlogPage = lazy(() => import('../pages/blogPage'))
// const CompetitionPage = lazy(() => import('../pages/competitionPage'))
// const SettingPage = lazy(() => import('../pages/settingPage'))
// const ChatBox = lazy(() => import('../pages/chatPage/chatBox'))
// const ContactPage = lazy(() => import('../pages/chatPage/contactPage'))
// const FavoritesPage = lazy(() => import('../pages/chatPage/favoritesPage'))
// const BlogsBox = lazy(() => import('../pages/blogPage/blogsBox'))
// const MyBlog = lazy(() => import('../pages/blogPage/myBlog'))

export default function MyRouter() {
    const { currentUser } = useSelector((state) => state.user)
    const ProtectedRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to={'/login'} />
        } else {
            return children
        }
    }
    const router = createBrowserRouter([
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/',
            element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "",
                    element: <Navigate to="home" />,
                },
                {
                    path: "home",
                    element: <Main />,
                },
                {
                    path: "chat",
                    element: <ChatPage />,
                    children: [
                        {
                            path: "",
                            element: <Navigate to="conversations" />,
                        },
                        {
                            path: "conversations",
                            element: <ChatBox />,
                            loader: async () => await getconversation()
                        },
                        {
                            path: "contacts",
                            element: <ContactPage />,
                            loader: async () => {
                                const contactsId = currentUser.contactsUsers
                                const getContactByID = async (userID) => await getuser(userID)
                                const requests = contactsId.map(userId => getContactByID(userId));
                                return await Promise.all(requests)
                            }
                        },
                        {
                            path: "favorites",
                            element: <FavoritesPage />,
                            loader: async () => await getconversation()
                        },
                    ]
                },
                {
                    path: "calender",
                    element: <PlanPage />,
                },
                {
                    path: "tutorial",
                    element: <TutorialPage />,
                },
                {
                    path: "blog",
                    element: <BlogPage />,
                    children: [
                        {
                            path: "",
                            element: <Navigate to="community" />,
                        },
                        {
                            path: "community",
                            element: <BlogsBox />,
                            loader: async () => await getrandomblog()
                        },
                        {
                            path: "my",
                            element: <MyBlog />,
                            loader: async () => await getmyblog()
                        },
                    ]
                },
                {
                    path: "competition",
                    element: <CompetitionPage />,
                },
                {
                    path: "profile",
                    element: <SettingPage />,
                },
            ],
        },
        {
            path: '/evaluate',
            element: <ProtectedRoute><EvaluatePage /></ProtectedRoute>
        },
    ])
    return (
        <RouterProvider router={router} />
    )
}
