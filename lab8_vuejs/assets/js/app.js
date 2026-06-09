const { createApp } = Vue
const { createRouter, createWebHashHistory } = VueRouter

const apiUrl = 'http://localhost/lab11_ci/ci4/public'

// =========================================================================
// AXIOS INTERCEPTORS - Penyuntik Token Otomatis
// =========================================================================

// Request interceptor: suntikkan token ke setiap request keluar
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('userToken')
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response interceptor: tangkap error 401 secara global
axios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            alert('⛔ Sesi Anda telah berakhir atau Token tidak sah. Silakan login kembali.')
            localStorage.clear()
            window.location.href = '#/login'
            window.location.reload()
        }
        return Promise.reject(error)
    }
)

// =========================================================================
// ROUTES
// =========================================================================

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/artikel', component: Artikel, meta: { requiresAuth: true } },
    { path: '/about', component: About, meta: { requiresAuth: true } }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// NAVIGATION GUARD (Client-Side Security)
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true'
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        alert('⛔ Akses Ditolak! Anda harus login terlebih dahulu.')
        next('/login')
    } else {
        next()
    }
})

// =========================================================================
// ROOT APP
// =========================================================================

const app = createApp({
    data() {
        return {
            isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
            username: localStorage.getItem('username') || ''
        }
    },
    mounted() {
        this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
        this.username = localStorage.getItem('username') || ''
    },
    methods: {
        logout() {
            if (confirm('Apakah Anda yakin ingin keluar?')) {
                localStorage.removeItem('isLoggedIn')
                localStorage.removeItem('userToken')
                localStorage.removeItem('username')
                this.isLoggedIn = false
                this.username = ''
                this.$router.push('/')
                window.location.reload()
            }
        }
    }
})

app.use(router)
app.mount('#app')