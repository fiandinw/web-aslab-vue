<script setup>
  import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    getFirestore,
    updateDoc,
  } from "firebase/firestore";
  import swal from "sweetalert";
  import { ref } from "vue";
  import { RouterLink } from "vue-router";
  import router from "../router";

  const currentUnixTime = new Date().getTime();

  const asistenData = ref([]);
  const modalState = ref("buat");

  const db = getFirestore();
  const colref = collection(db, "asisten");

  const formInputs = ref({
    id: "",
    nim: "",
    nama: "",
    email: "",
    password: "",
    statusAsisten: true,
  });

  const getAsistenData = () => {
    getDocs(colref).then((snapshot) => {
      if (!snapshot.empty) {
        snapshot.docs.forEach((each) => {
          asistenData.value.push({ id: each.id, ...each.data() });
        });
        const arr = asistenData.value
        arr.sort((a, b) => {return a.createdAt - b.createdAt})
        asistenData.value = arr
      }
    });
  };
  getAsistenData();

  const buatAkun = () => {
    addDoc(colref, {
      nim: formInputs.value.nim,
      nama: formInputs.value.nama,
      email: formInputs.value.email,
      password: formInputs.value.password,
      statusAsisten: formInputs.value.statusAsisten,
      createdAt: currentUnixTime
    }).then(() => {
      swal(
        "Berhasil Dibuat",
        "Akun Asisten Baru Berhasil Dibuat",
        "success"
      ).then(() => {
        window.location.reload();
      });
    });
  };

  const handleSubmit = (e) => {
    if (modalState.value == "buat") {
      buatAkun();
    } else {
      ubahAkun();
    }
  };

  const handleCreate = () => {
    modalState.value = "buat";
    formInputs.value = {
      nim: "",
      nama: "",
      email: "",
      password: "",
      statusAsisten: true,
    };
  };

  const handleDelete = (e) => {
    swal({
      title: "Anda Yakin?",
      text: "Akun Asisten Akan Dihapus",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((state) => {
      if (state) {
        const docref = doc(db, "asisten", e.target.id);
        deleteDoc(docref).then(() => {
          asistenData.value = [];
          getAsistenData();
          swal("Berhasil Dihapus", "Akun Asisten Berhasil Dihapus", "success");
        });
      }
    });
  };
  const handleUpdate = (e) => {
    modalState.value = "ubah";
    formInputs.value.email = asistenData.value[e.target.id].email;
    formInputs.value.nama = asistenData.value[e.target.id].nama;
    formInputs.value.nim = asistenData.value[e.target.id].nim;
    formInputs.value.password = asistenData.value[e.target.id].password;
    formInputs.value.statusAsisten =
      asistenData.value[e.target.id].statusAsisten;
    formInputs.value.id = asistenData.value[e.target.id].id;
  };

  const ubahAkun = () => {
    const docref = doc(db, "asisten", formInputs.value.id);
    updateDoc(docref, {
      nim: formInputs.value.nim,
      nama: formInputs.value.nama,
      email: formInputs.value.email,
      password: formInputs.value.password,
      statusAsisten: formInputs.value.statusAsisten,
    }).then(() => {
      swal("Berhasil Diubah", "Akun Asisten Berhasil Diubah", "success").then(
        () => {
          window.location.reload();
        }
      );
    });
  };
</script>

<template>
  <div
    class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
    id="exampleModalCenteredScrollable"
    tabindex="-1"
    aria-labelledby="exampleModalCenteredScrollable"
    aria-modal="true"
    role="dialog"
  >
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollable relative w-auto pointer-events-none"
    >
      <div
        class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
      >
        <div
          class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md"
        >
          <h5
            class="text-xl font-medium leading-normal text-gray-800 capitalize"
            id="exampleModalCenteredScrollableLabel"
          >
            {{ modalState }} Akun Asisten
          </h5>
          <button
            type="button"
            class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body relative p-4">
          <form @submit.prevent="handleSubmit">
            <div class="form-group mb-6">
              <label
                for="nim"
                class="form-label inline-block mb-2 text-gray-700"
                >NIM</label
              >
              <input
                v-model="formInputs.nim"
                type="number"
                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="nim"
                placeholder="NIM"
              />
            </div>
            <div class="form-group mb-6">
              <label
                for="nama"
                class="form-label inline-block mb-2 text-gray-700"
                >Nama</label
              >
              <input
                v-model="formInputs.nama"
                type="text"
                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="nama"
                placeholder="Nama"
              />
            </div>
            <div class="form-group mb-6">
              <label
                for="email"
                class="form-label inline-block mb-2 text-gray-700"
                >E-Mail</label
              >
              <input
                v-model="formInputs.email"
                type="text"
                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="email"
                placeholder="E-Mail"
              />
            </div>
            <div class="form-group mb-6">
              <label
                for="password"
                class="form-label inline-block mb-2 text-gray-700"
                >Password</label
              >
              <input
                v-model="formInputs.password"
                type="text"
                class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="password"
                placeholder="Password"
              />
            </div>
            <div class="form-check form-switch mb-6">
              <input
                class="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                v-model="formInputs.statusAsisten"
              />
              <label
                class="form-check-label inline-block text-gray-800"
                for="flexSwitchCheckDefault"
                >Status Asisten</label
              >
            </div>
            <button
              type="submit"
              class="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Submit
            </button>
          </form>
        </div>
        <!-- <div
          class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md"
        >
          <button
            type="button"
            class="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
          >
            Save changes
          </button>
        </div> -->
      </div>
    </div>
  </div>
  <div class="flex flex-col px-4 pt-4 lg:px-14">
    <RouterLink
      to="/admin/dashboard"
      type="button"
      class="px-6 py-2.5 w-fit bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
    >
      <i class="fa fa-arrow-circle-left fa-lg" aria-hidden="true"></i
      >&nbsp;Kembali
    </RouterLink>
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="border-b">
              <tr>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  #
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Nama
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  NIM
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Status
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Kelola
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, key) in asistenData" class="border-b">
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  {{ key + 1 }}
                </td>
                <td
                  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                >
                  {{ item.nama }}
                </td>
                <td
                  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                >
                  {{ item.nim }}
                </td>
                <td
                  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                >
                  <button
                    v-if="item.statusAsisten"
                    type="button"
                    class="inline-block px-6 py-2 border-2 border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                  >
                    Aktif
                  </button>
                  <button
                    v-if="!item.statusAsisten"
                    type="button"
                    class="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                  >
                    Non-aktif
                  </button>
                </td>
                <td
                  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                >
                  <button
                    @click="handleUpdate"
                    :id="key"
                    type="button"
                    class="inline-block px-6 py-2.5 bg-yellow-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalCenteredScrollable"
                  >
                    Ubah
                  </button>
                  <button
                    @click="handleDelete"
                    :id="item.id"
                    type="button"
                    class="ml-4 inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <button
      @click="handleCreate"
      type="button"
      class="w-fit inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      data-bs-toggle="modal"
      data-bs-target="#exampleModalCenteredScrollable"
    >
      <i class="fa fa-plus-circle fa-lg" aria-hidden="true"></i>&nbsp;Tambah
      Akun Asisten
    </button>
  </div>
</template>
