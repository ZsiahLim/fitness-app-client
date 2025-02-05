import { shallowEqual, useSelector } from 'react-redux'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import ErrorPage from '../pages/ErrorPage'
import { getalltutorial, getconversation, getmyblog, getonetutorial, getrandomblog, getspecificblog, getuser } from '../api/user.api'

import Main from '../pages/Dashboard/dashboard'
import ChatPage from '../pages/chatPage'
import PlanPage from '../pages/planPage'
import TutorialPage from '../pages/tutorialPage'
import BlogPage from '../pages/blogPage'
import StatisticsPage from '../pages/StatisticPage'
import SettingPage from '../pages/settingPage'
import ConversationPage from '../pages/chatPage/pages/conversationPage'
import ContactPage from '../pages/chatPage/pages/contactPage'
import BlogsBox from '../pages/blogPage/blogsBox'
import MyBlog from '../pages/blogPage/myBlog'
import EvaluatePage from '../pages/evaluatePage'
import SpecificTutorialPage from '../pages/tutorialPage/pages/oneTutorialPage'
import SpecificBlog from '../pages/blogPage/page/specificBlog'
import FinishExercise from '../pages/finishExercise'
import ContactDetail from '../pages/chatPage/pages/contactPage/contactDetail'
import ConversationDetail from '../pages/chatPage/pages/conversationPage/conversationDetail'
import SubscribeUserPage from '../pages/chatPage/pages/SubscribeUserPage'
import { getrecommandtutorials, getspecifictypetutorials } from '../api/tutorial.api'
import useCheckUserStatus from '../hooks/useCheckUserStatus'
import { message } from 'antd'


export default function MyRouter() {
    const { currentUser } = useSelector((state) => state.user, shallowEqual)
    const ProtectedRoute = ({ children }) => {
        const { isBlocked } = useCheckUserStatus()
        if (isBlocked) {
            message.info("您因为违反平台规则被封禁，无法再访问平台", 10)
        }
        if (!currentUser) {
            return <Navigate to={'/login'} />
        } else {
            if (isBlocked) {
                return <Navigate to={'/login'} />
            } else {
                return children
            }
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
                                    path: "detail/:userID",
                                    element: <ContactDetail />,
                                    loader: async ({ params }) => await getuser(params.contactID)
                                },
                            ]
                        },
                        {
                            path: "subscribe",
                            element: <SubscribeUserPage />,
                            // loader: async () => await getconversation()
                            children: [
                                {
                                    path: "user/:userID",
                                    element: <ContactDetail />,
                                    loader: async ({ params }) => await getuser(params.contactID)
                                },
                            ]
                        },
                    ]
                },
                {
                    path: "calender",
                    element: <PlanPage />,
                },
                {
                    path: "tutorial/:type?",
                    element: <TutorialPage />,
                    loader: async ({ params }) => {
                        if (params.type) {
                            if (params.type === "recommand") {
                                return await getrecommandtutorials()
                            }
                            return await getspecifictypetutorials({ type: params.type })
                        } else {
                            return await getalltutorial()
                        }
                    },
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
                    path: "statistics",
                    element: <StatisticsPage />,
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
            path: '/finish',
            element: <FinishExercise />,
        },
    ])
    return (
        <RouterProvider router={router} />
    )
}
