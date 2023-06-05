import { Navigate, RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import { useSelector } from 'react-redux'
import Login from './pages/Login'

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
      element: <ProtectedRoute><Dashboard /></ProtectedRoute>
    }
  ])
  return (
    <RouterProvider router={router} />
  );
}

export default App;
