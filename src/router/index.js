import { createRouter, createWebHistory } from 'vue-router'

// Views
import { HomeView, AboutView, ContactView , I3LaunchpadView, OngoingEventsView} from '@/views'

// Authentication pages
import LoginPage from '@/components/LoginPage.vue'
import RegisterPage from '@/components/RegisterPage.vue'
import ForgotPass from '@/components/ForgotPass.vue'

// Admin & events
import Admin from '@/components/pages/Admin.vue'
import CreateEditEvent from '@/components/CreateEditEvent.vue'
import Events from '@/components/Events.vue'
import Dashboard from '@/components/Dashboard.vue'

const routes = [
  // Public routes
  { path: '/', name: 'home', component: HomeView,},
  { path: '/about', name: 'about', component: AboutView,},
  { path: '/contact', name: 'contact', component: ContactView,},
  { path: '/I3Launchpad', name: 'I3Launchpad', component: I3LaunchpadView, },
  { path: '/OngoingEvents', name: 'ongoingEvents', component: OngoingEventsView, },
  { path: '/login', name: 'login', component: LoginPage,},
  { path: '/register', name: 'register', component: RegisterPage, },
  { path: '/forgot-password', name: 'forgot-password', component: ForgotPass, },

  // Protected admin section
  { path: '/admin', name: 'admin', component: Admin,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'events',
        name: 'events',
        component: Events,
      },
      {
        path: 'create-event',
        name: 'create-event',
        component: CreateEditEvent,
      },
    ],
  },

  // future feature: event tickets
  // { path: '/event-tickets', name: 'event-ticket', component: EventTicket }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Global navigation guard example
// router.beforeEach((to, from, next) => {
//   const isPublic = ['home', 'about', 'contact', 'login', 'register', 'forgot-password'].includes(to.name)
//   const loggedIn = Boolean(localStorage.getItem('user'))
//
//   if (!isPublic && !loggedIn) {
//     // redirect to login with return URL
//     next({ name: 'login', query: { redirect: to.fullPath } })
//   } else {
//     next()
//   }
// })

export default router
