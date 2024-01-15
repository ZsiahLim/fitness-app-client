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
import RightSideIcon from '../pages/chatPage/Components/RightSideIcon'
import SpecificUserPage from '../pages/specificUserPage'


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
                                    path: "",
                                    element: <RightSideIcon />
                                },
                                {
                                    path: "specific/:conversationID",
                                    element: <ConversationDetail />,
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
                                    path: "",
                                    element: <RightSideIcon />
                                },
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
                                    path: "",
                                    element: <RightSideIcon />
                                },
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
            errorElement: <ErrorPage errorMsg={"Cannot Find This Tutorial"} />,
            element: <SpecificTutorialPage />,
            loader: async ({ params }) => {
                try {
                    await getonetutorial(params.id).then(res => {
                        if (res && res.status !== false) {
                            return res
                        } else {
                            return new Error()
                        }
                    })
                } catch (error) {
                    return new Error("Error")
                }
            }
        },
        {
            path: '/specificblog/:id',
            errorElement: <ErrorPage errorMsg={"Cannot Find This Blog"} />,
            element: <ProtectedRoute><SpecificBlog /></ProtectedRoute>,
            loader: async ({ params }) => {
                try {
                    await getspecificblog(params.id).then(res => {
                        if (res && res.status !== false) {
                            return res
                        } else {
                            return new Error()
                        }
                    })
                } catch (error) {
                    return new Error("Error")
                }
            }
        },
        {
            path: '/finish',
            errorElement: <ErrorPage errorMsg={"Error"} />,
            element: <FinishExercise />,
        },
        {
            path: "/specificuser/:userID",
            element: <SpecificUserPage />,
            errorElement: <ErrorPage errorMsg={"Cannot Find This User"} />,
            loader: async ({ params }) => {
                try {
                    await getuser(params.contactID).then(res => {
                        if (res && res.status !== false) {
                            return res
                        } else {
                            return new Error()
                        }
                    })
                } catch (error) {
                    return new Error("Error")
                }
            }
        },
    ])
    return (
        <RouterProvider router={router} />
    )
}
