// Komponen Manajemen Artikel (CRUD dengan API)
const Artikel = {
    template: `
        <div>
            <h2>Manajemen Data Artikel</h2>
            <button id="btn-tambah" @click="tambah">+ Tambah Data</button>

            <!-- Modal Form Tambah/Ubah -->
            <div class="modal" v-if="showForm">
                <div class="modal-content">
                    <span class="close" @click="closeModal">&times;</span>
                    <form @submit.prevent="saveData">
                        <h3>{{ formTitle }}</h3>
                        <div>
                            <input type="text" v-model="formData.judul" placeholder="Judul Artikel" required>
                        </div>
                        <div>
                            <textarea v-model="formData.isi" rows="6" placeholder="Isi Artikel"></textarea>
                        </div>
                        <div>
                            <select v-model="formData.status">
                                <option v-for="option in statusOptions" :value="option.value">
                                    {{ option.text }}
                                </option>
                            </select>
                        </div>
                        <button type="submit" id="btnSimpan">Simpan</button>
                        <button type="button" @click="closeModal">Batal</button>
                    </form>
                </div>
            </div>

            <!-- Tabel Data -->
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Judul</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="artikel.length === 0">
                        <td colspan="4" style="text-align: center;">Tidak ada data</td>
                    </tr>
                    <tr v-for="(row, index) in artikel" :key="row.id">
                        <td class="center-text">{{ row.id }}</td>
                        <td>{{ row.judul }}</td>
                        <td>{{ statusText(row.status) }}</td>
                        <td class="center-text">
                            <a href="#" @click.prevent="edit(row)">Edit</a>
                            <a href="#" @click.prevent="hapus(index, row.id)">Hapus</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
    data() {
        return {
            artikel: [],
            showForm: false,
            formTitle: 'Tambah Data',
            formData: {
                id: null,
                judul: '',
                isi: '',
                status: 0
            },
            statusOptions: [
                { value: 1, text: 'Publish' },
                { value: 0, text: 'Draft' }
            ]
        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
        // Load data dari API
        loadData() {
            axios.get(apiUrl + '/post')
                .then(response => {
                    this.artikel = response.data.artikel
                })
                .catch(error => {
                    console.log('Error load data:', error)
                    alert('Gagal memuat data. Pastikan server API berjalan di:\n' + apiUrl)
                })
        },

        statusText(status) {
            if (status === undefined || status === null) return 'Draft'
            return status == 1 ? 'Publish' : 'Draft'
        },

        tambah() {
            this.showForm = true
            this.formTitle = 'Tambah Data'
            this.formData = {
                id: null,
                judul: '',
                isi: '',
                status: 0
            }
        },

        edit(data) {
            this.showForm = true
            this.formTitle = 'Ubah Data'
            this.formData = {
                id: data.id,
                judul: data.judul,
                isi: data.isi,
                status: data.status
            }
        },

        hapus(index, id) {
            if (confirm('Yakin ingin menghapus data ini?')) {
                axios.delete(apiUrl + '/post/' + id)
                    .then(response => {
                        this.artikel.splice(index, 1)
                        alert('Data berhasil dihapus')
                    })
                    .catch(error => {
                        console.log('Error hapus data:', error)
                        alert('Gagal menghapus data')
                    })
            }
        },

        saveData() {
            if (this.formData.id) {
                // Update data
                axios.put(apiUrl + '/post/' + this.formData.id, this.formData)
                    .then(response => {
                        this.loadData()
                        this.closeModal()
                        alert('Data berhasil diupdate')
                    })
                    .catch(error => {
                        console.log('Error update data:', error)
                        alert('Gagal mengupdate data')
                    })
            } else {
                // Tambah data baru
                axios.post(apiUrl + '/post', this.formData)
                    .then(response => {
                        this.loadData()
                        this.closeModal()
                        alert('Data berhasil ditambahkan')
                    })
                    .catch(error => {
                        console.log('Error tambah data:', error)
                        alert('Gagal menambahkan data')
                    })
            }
        },

        closeModal() {
            this.showForm = false
            this.formData = {
                id: null,
                judul: '',
                isi: '',
                status: 0
            }
        }
    }
}