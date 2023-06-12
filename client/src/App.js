import { Navigate, RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import { useSelector } from 'react-redux'
import Login from './pages/Login'
import Main from './pages/Dashboard/dashboard'
import ChatPage from './pages/chatPage'
import PlanPage from './pages/planPage'
import TutorialPage from './pages/tutorialPage'
import BlogPage from './pages/blogPage'
import CompetitionPage from './pages/competitionPage'
import SettingPage from './pages/settingPage'

function App() {
  const { currentUser } = useSelector((state) => state.user)
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to={'/'} />
    } else {
      return children
    }
  }
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/dashboard',
      element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
      children: [
        {
          path: "home/:theme/:name",
          element: <Main />,
        },
        {
          path: "chat/:theme",
          element: <ChatPage />,
        },
        {
          path: "calender/:theme",
          element: <PlanPage />,
        },
        {
          path: "tutorial/:theme",
          element: <TutorialPage />,
        },
        {
          path: "blog/:theme",
          element: <BlogPage />,
        },
        {
          path: "competition/:theme",
          element: <CompetitionPage />,
        },
        {
          path: "profile/:theme",
          element: <SettingPage />,
        },
      ],
    }
  ])
  return (
    <RouterProvider router={router} />
  );
}

export default App;
