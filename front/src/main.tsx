import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Login } from './pages/Login'
import { Profile } from './pages/Profile'
import { Dashboard } from './pages/Profile/Dashboard'
import { Settings } from './pages/Profile/Settings'
import { Posts } from './pages/Profile/Posts'
import { Search } from './pages/Profile/Search'
import { Account } from './pages/Account'
import { Requests } from './pages/Requests'
import { Followers } from './pages/Followers'
import { Following } from './pages/Following'

const routes = createBrowserRouter([
  {
    path:'',
    element:<Signup/>
  },
  {
    path:'login',
    element:<Login/>
  },
  {
    path:'profile',
    element: <Profile/>,
    children: [
      {
        path: '',
        element: <Dashboard/>
      },
      {
        path: 'settings',
        element: <Settings/>
      },
      {
        path: 'posts',
        element: <Posts/>
      },
      {
        path: 'search',
        element: <Search/>
      },
      {
        path: ':id',
        element: <Account/>
      },
      {
        path: 'requests',
        element: <Requests/>
      },
      {
        path: 'followers',
        element: <Followers/>
      },
      {
        path: 'following',
        element: <Following/>
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider  router={routes}>
    </RouterProvider>
  </StrictMode>,
)
