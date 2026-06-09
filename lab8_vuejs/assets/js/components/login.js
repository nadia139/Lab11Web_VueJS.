const Login = {
    template: `
        <div class="login-container">
            <div class="login-box">
                <h2>🔐 Form Login Admin</h2>
                <form @submit.prevent="handleLogin">
                    <div class="form-group">
                        <label>📧 Email</label>
                        <input type="email" v-model="email" placeholder="admin@email.com" required>
                    </div>
                    <div class="form-group">
                        <label>🔒 Password</label>
                        <input type="password" v-model="password" placeholder="Masukkan password" required>
                    </div>
                    <button type="submit" class="btn-login">🚀 Masuk Aplikasi</button>
                </form>
                <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>
            </div>
        </div>
    `,
    data() {
        return {
            email: '',
            password: '',
            errorMessage: ''
        }
    },
    methods: {
        handleLogin() {
            this.errorMessage = '';
            axios.post(apiUrl + '/api/login', {
                username: this.email,
                password: this.password
            })
            .then(response => {
                if (response.data.status === 200) {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userToken', response.data.data.token);
                    localStorage.setItem('username', response.data.data.username);
                    alert('✅ Login berhasil!');
                    this.$router.push('/artikel');
                    window.location.reload();
                }
            })
            .catch(error => {
                if (error.response && error.response.data.messages) {
                    this.errorMessage = error.response.data.messages;
                } else {
                    this.errorMessage = '❌ Login gagal. Periksa email dan password.';
                }
            });
        }
    }
}