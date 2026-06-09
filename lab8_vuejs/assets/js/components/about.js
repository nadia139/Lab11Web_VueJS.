// Komponen Halaman About dengan Fitur Edit Profil & Upload Foto
const About = {
    template: `
        <div class="about-container">
            <h2>👤 Tentang Saya</h2>
            
            <!-- Tombol Edit Profil -->
            <div style="text-align: right; margin-bottom: 15px;">
                <button @click="openEditModal" class="btn-edit-profile">✏️ Edit Profil</button>
            </div>

            <!-- Tampilan Profil -->
            <div class="profile-card">
                <div class="avatar" @click="openEditModal" style="cursor: pointer;">
                    <div class="avatar-placeholder">
                        <img v-if="profile.avatar" :src="profile.avatar" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
                        <span v-else>{{ profile.avatarEmoji }}</span>
                    </div>
                    <p style="font-size: 12px; margin-top: 8px; color: #8d9de0;">Klik untuk ganti avatar</p>
                </div>
                <div class="profile-info">
                    <p><strong>📛 Nama Lengkap:</strong> {{ profile.nama }}</p>
                    <p><strong>🆔 NIM:</strong> {{ profile.nim }}</p>
                    <p><strong>🏫 Kelas:</strong> {{ profile.kelas }}</p>
                    <p><strong>🎓 Program Studi:</strong> {{ profile.prodi }}</p>
                    <p><strong>🏛️ Universitas:</strong> {{ profile.universitas }}</p>
                    <p><strong>📧 Email:</strong> {{ profile.email }}</p>
                    <p><strong>⚡ Hobi:</strong> {{ profile.hobi }}</p>
                </div>
            </div>
            <p class="quote">💬 "{{ profile.motto }}"</p>

            <!-- Modal Edit Profil -->
            <div class="modal" v-if="showEditModal">
                <div class="modal-content" style="width: 450px; max-height: 80vh; overflow-y: auto;">
                    <span class="close" @click="closeEditModal">&times;</span>
                    <h3>✏️ Edit Profil</h3>
                    
                    <div style="text-align: center; margin-bottom: 15px;">
                        <div class="avatar-preview" @click="triggerFileInput" style="cursor: pointer;">
                            <img v-if="editForm.avatarPreview" :src="editForm.avatarPreview" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 3px solid #a5b4e8;">
                            <div v-else class="avatar-placeholder" style="width: 100px; height: 100px; margin: 0 auto; font-size: 40px;">
                                {{ editForm.avatarEmoji }}
                            </div>
                        </div>
                        <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*" style="display: none;">
                        <p style="font-size: 12px; margin-top: 5px; color: #8d9de0;">📷 Klik foto untuk ganti</p>
                    </div>
                    
                    <div>
                        <label>📛 Nama Lengkap</label>
                        <input type="text" v-model="editForm.nama" placeholder="Nama Lengkap">
                    </div>
                    <div>
                        <label>🆔 NIM</label>
                        <input type="text" v-model="editForm.nim" placeholder="NIM">
                    </div>
                    <div>
                        <label>🏫 Kelas</label>
                        <input type="text" v-model="editForm.kelas" placeholder="Kelas">
                    </div>
                    <div>
                        <label>🎓 Program Studi</label>
                        <input type="text" v-model="editForm.prodi" placeholder="Program Studi">
                    </div>
                    <div>
                        <label>🏛️ Universitas</label>
                        <input type="text" v-model="editForm.universitas" placeholder="Universitas">
                    </div>
                    <div>
                        <label>📧 Email</label>
                        <input type="email" v-model="editForm.email" placeholder="Email">
                    </div>
                    <div>
                        <label>⚡ Hobi</label>
                        <input type="text" v-model="editForm.hobi" placeholder="Hobi">
                    </div>
                    <div>
                        <label>💬 Motto</label>
                        <textarea v-model="editForm.motto" rows="3" placeholder="Motto hidup"></textarea>
                    </div>
                    
                    <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;">
                        <button @click="closeEditModal" class="btn-cancel">Batal</button>
                        <button @click="saveProfile" class="btn-save">💾 Simpan</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            profile: {
                nama: '',
                nim: '',
                kelas: '',
                prodi: 'Teknik Informatika',
                universitas: 'Universitas Pelita Bangsa',
                email: '',
                hobi: '',
                motto: 'Terus belajar dan berbagi ilmu untuk masa depan yang lebih baik',
                avatarEmoji: '👨‍💻',
                avatar: null
            },
            showEditModal: false,
            editForm: {
                nama: '',
                nim: '',
                kelas: '',
                prodi: '',
                universitas: '',
                email: '',
                hobi: '',
                motto: '',
                avatarEmoji: '👨‍💻',
                avatarPreview: null,
                avatarFile: null
            }
        }
    },
    mounted() {
        this.loadProfile()
    },
    methods: {
        loadProfile() {
            const savedProfile = localStorage.getItem('user_profile')
            if (savedProfile) {
                const parsed = JSON.parse(savedProfile)
                this.profile = parsed
                if (parsed.avatar) {
                    this.profile.avatar = parsed.avatar
                }
            } else {
                this.profile = {
                    nama: 'Masukkan Nama Anda',
                    nim: 'Masukkan NIM',
                    kelas: 'Masukkan Kelas',
                    prodi: 'Teknik Informatika',
                    universitas: 'Universitas Pelita Bangsa',
                    email: 'email@example.com',
                    hobi: 'Coding, membaca, olahraga',
                    motto: 'Terus belajar dan berbagi ilmu untuk masa depan yang lebih baik',
                    avatarEmoji: '👨‍💻',
                    avatar: null
                }
            }
        },

        saveProfileToLocal() {
            localStorage.setItem('user_profile', JSON.stringify(this.profile))
        },

        openEditModal() {
            this.editForm = {
                nama: this.profile.nama,
                nim: this.profile.nim,
                kelas: this.profile.kelas,
                prodi: this.profile.prodi,
                universitas: this.profile.universitas,
                email: this.profile.email,
                hobi: this.profile.hobi,
                motto: this.profile.motto,
                avatarEmoji: this.profile.avatarEmoji,
                avatarPreview: this.profile.avatar,
                avatarFile: null
            }
            this.showEditModal = true
        },

        closeEditModal() {
            this.showEditModal = false
        },

        triggerFileInput() {
            this.$refs.fileInput.click()
        },

        handleFileUpload(event) {
            const file = event.target.files[0]
            if (file) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.editForm.avatarPreview = e.target.result
                    this.editForm.avatarFile = e.target.result
                }
                reader.readAsDataURL(file)
            }
        },

        saveProfile() {
            this.profile = {
                nama: this.editForm.nama,
                nim: this.editForm.nim,
                kelas: this.editForm.kelas,
                prodi: this.editForm.prodi,
                universitas: this.editForm.universitas,
                email: this.editForm.email,
                hobi: this.editForm.hobi,
                motto: this.editForm.motto,
                avatarEmoji: this.editForm.avatarEmoji,
                avatar: this.editForm.avatarPreview
            }
            this.saveProfileToLocal()
            this.closeEditModal()
            alert('✅ Profil berhasil disimpan!')
        }
    }
}