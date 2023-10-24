import { useSelector } from 'react-redux'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import ErrorPage from '../pages/ErrorPage'
import { getalltutorial, getconversation, getmyblog, getonetutorial, getrandomblog, getspecificblog, getuser } from '../api/user.api'
// import { lazy } from 'react'

import Main from '../pages/Dashboard/dashboard'
import ChatPage from '../pages/chatPage'
import PlanPage from '../pages/planPage'
import TutorialPage from '../pages/tutorialPage'
import BlogPage from '../pages/blogPage'
import CompetitionPage from '../pages/competitionPage'
import SettingPage from '../pages/settingPage'
import ConversationPage from '../pages/chatPage/pages/conversationPage'
import ContactPage from '../pages/chatPage/pages/contactPage'
import FavoritesPage from '../pages/chatPage/pages/favoritesPage'
import BlogsBox from '../pages/blogPage/blogsBox'
import MyBlog from '../pages/blogPage/myBlog'
import EvaluatePage from '../pages/evaluatePage'
import SpecificTutorialPage from '../pages/tutorialPage/pages/oneTutorialPage'
import SpecificBlog from '../pages/blogPage/page/specificBlog'
import FinishExercise from '../components/finishExercise'
import { message } from 'antd'
import ContactDetail from '../pages/chatPage/pages/contactPage/contactDetail'
import ConversationDetail from '../pages/chatPage/pages/conversationPage/conversationDetail'
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
                            element: <ConversationPage />,
                            loader: async () => await getconversation(),
                            children: [
                                {
                                    path: "specific/:conversationID",
                                    element: <ConversationDetail />,
                                    // loader: async ({ params }) => await getuser(params.conversationID)
                                },
                            ]
                        },
                        {
                            path: "contacts",
                            element: <ContactPage />,
                            loader: async () => {
                                const contactsId = currentUser.contactsUsers
                                const getContactByID = async (userID) => await getuser(userID)
                                const requests = contactsId.map(userId => getContactByID(userId));
                                return await Promise.all(requests)
                            },
                            children: [
                                {
                                    path: "detail/:contactID",
                                    element: <ContactDetail />,
                                    loader: async ({ params }) => await getuser(params.contactID)
                                },
                            ]
                        },
                        {
                            path: "favorites",
                            element: <FavoritesPage />,
                            // loader: async () => await getconversation()
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
                    loader: async () => await getalltutorial()
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
        {
            path: '/specifictutorial/:id',
            element: <SpecificTutorialPage />,
            loader: async ({ params }) => await getonetutorial(params.id)
        },
        {
            path: '/specificblog/:id',
            element: <ProtectedRoute><SpecificBlog /></ProtectedRoute>,
            loader: async ({ params }) => await getspecificblog(params.id)
        },
        {
            path: '/finish/:tutorialID/:watchtime',
            element: <FinishExercise />,
            loader: async ({ params }) => await getonetutorial(params.tutorialID)
        },
    ])
    return (
        <RouterProvider router={router} />
    )
}
