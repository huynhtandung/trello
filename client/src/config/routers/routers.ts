export const ROUTERS = [
  {
    path: '/login',
    component: 'login',
    exact: true,
    isAuth: false
  },
  {
    path: '/register',
    component: 'register',
    exact: true,
    isAuth: false
  },
  {
    path: '/:currentUser/home',
    component: 'home',
    exact: true,
    isAuth: true
  },
  {
    path: '/board/:id',
    component: 'board',
    exact: true,
    isAuth: true
  },
]
