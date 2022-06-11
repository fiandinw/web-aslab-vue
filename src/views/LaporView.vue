<script setup>
  import {
    addDoc,
    collection,
    doc,
    getFirestore,
    onSnapshot,
    query,
    updateDoc,
    where,
  } from "firebase/firestore";
  import { onBeforeMount, onMounted, ref } from "vue";
  import { RouterLink } from "vue-router";
  import axios from "axios";
  import Compressor from "compressorjs";
  import swal from "sweetalert";
  import router from "../router";

  const asistenId = localStorage.getItem("asistenId");

  const currentUnixTime = new Date().getTime();
  const currentReadableDate = new Date(currentUnixTime);
  const currentDateValues = {
    year: currentReadableDate.getFullYear(),
    month: currentReadableDate.getMonth() + 1,
    day: currentReadableDate.getDate(),
  };

  const db = getFirestore();

  const getAsistenData = () => {
    const docref = doc(db, "asisten", asistenId);
    onSnapshot(docref, (doc) => {
      //console.log(doc.data().nim, doc.id)
      formInputs.value.nim = doc.data().nim;
    });
  };

  const isTodayExist = ref(false);

  const formInputs = ref({
    id: "",
    nim: 0,
    catatan: "",
    luaran: "",
    dokumentasi: "",
    createdAt: currentUnixTime,
  });

  const catatanCheck = ref({
    piket:false,
    mengawas:false,
    mengajar:false,
  })

  const selectedImage = ref("");

  const handleFile = (e) => {
    selectedImage.value = e.target.files[0];
  };

  const addLaporan = () => {
    const colref = collection(db, "laporan");
    addDoc(colref, {
      nim: formInputs.value.nim,
      asistenId,
      catatan: formInputs.value.catatan,
      luaran: formInputs.value.luaran,
      dokumentasi: formInputs.value.dokumentasi,
      createdAt: formInputs.value.createdAt,
      updatedAt: formInputs.value.createdAt,
      createYear: currentDateValues.year,
      createMonth: currentDateValues.month,
      createDay: currentDateValues.day,
    }).then(() => {
      swal("Simpan Berhasil", "Laporan Berhasil Dibuat", "success").then(() => {
        router.push("/dashboard");
      });
    });
  };

  const updateLaporan = () => {
    const docref = doc(db, "laporan", formInputs.value.id);
    updateDoc(docref, {
      catatan: formInputs.value.catatan,
      luaran: formInputs.value.luaran,
      dokumentasi: formInputs.value.dokumentasi,
      updatedAt: currentUnixTime,
    }).then(() => {
      swal("Simpan Berhasil", "Laporan Berhasil Diubah", "success").then(() => {
        router.push("/dashboard");
      });
    });
  };

  const laporState = () => {
    if (isTodayExist.value) {
      updateLaporan();
    } else {
      addLaporan();
    }
  };

  const handleSubmit = () => {
    if (selectedImage.value != "") {
      new Compressor(selectedImage.value, {
        quality: 0.8,
        maxWidth: 500,
        success(result) {
          const formData = new FormData();
          formData.append("file", result);
          formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY);

          axios
            .post(
              "https://api.cloudinary.com/v1_1/fiandinw/image/upload",
              formData
            )
            .then((res) => {
              console.log("sukses", res.data.secure_url);
              formInputs.value.dokumentasi = res.data.secure_url;

              laporState();
            })
            .catch((err) => {
              console.log(err);
            });
        },
        error(err) {
          console.log(err.message);
        },
      });
    } else {
      laporState();
    }
  };

  getAsistenData();

  onBeforeMount(() => {
    const colref = collection(db, "laporan");
    const q = query(
      colref,
      where("asistenId", "==", asistenId),
      where("createYear", "==", currentDateValues.year),
      where("createMonth", "==", currentDateValues.month),
      where("createDay", "==", currentDateValues.day)
    );
    onSnapshot(q, (snapshot) => {
      //console.log(snapshot.empty)
      // console.log(snapshot.docs[0].data());
      if (!snapshot.empty) {
        const data = snapshot.docs[0].data();
        isTodayExist.value = true;
        formInputs.value.id = snapshot.docs[0].id;
        formInputs.value.catatan = data.catatan;
        formInputs.value.luaran = data.luaran;
        formInputs.value.dokumentasi = data.dokumentasi;
      }
    });
  });
</script>
<template>
  <div class="flex flex-col lg:flex-row items-center justify-center gap-4">
    <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
      <form @submit.prevent="handleSubmit">
        <div class="flex justify-start mb-3">
          <div>
            <h5
              class="font-medium leading-tight text-xl mt-0 mb-2 text-blue-600"
            >
              Laporan Tanggal {{ currentDateValues.day }}-{{
                currentDateValues.month
              }}-{{ currentDateValues.year }}
            </h5>
            <!-- <div class="inline-block mb-2 text-gray-700">Catatan Harian</div>
            <div class="form-check">
              <input
                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                value="Piket Laboratorium"
                id="catatan1"
                v-model="catatanCheck.piket"
              />
              <label
                class="form-check-label inline-block text-gray-800"
                for="catatan1"
              >
                Piket Laboratorium
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                value="Mengawas Kegiatan Perkuliahan"
                id="catatan2"
                v-model="catatanCheck.mengawas"
              />
              <label
                class="form-check-label inline-block text-gray-800"
                for="catatan2"
              >
                Mengawas Kegiatan Perkuliahan
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="checkbox"
                value="Asisten Mengajar Kuliah"
                id="catatan3"
                v-model="catatanCheck.mengajar"
              />
              <label
                class="form-check-label inline-block text-gray-800"
                for="catatan3"
              >
                Asisten Mengajar Kuliah
              </label>
            </div> -->
          </div>
        </div>

        <div class="flex justify-center">
          <div class="mb-3 w-full">
            <label
              for="catatanTambahan"
              class="form-label inline-block mb-2 text-gray-700"
              >Catatan Laporan</label
            >
            <textarea
              v-model="formInputs.catatan"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="catatanTambahan"
              rows="3"
              placeholder="Tulis Catatan Laporan (mengawas ujian, piket, asisten mengajar, dll)"
              required
            ></textarea>
          </div>
        </div>

        <div class="flex justify-center">
          <div class="mb-3 w-full">
            <label
              for="luaranKegiatan"
              class="form-label inline-block mb-2 text-gray-700"
              >Luaran Kegiatan</label
            >
            <textarea
              v-model="formInputs.luaran"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="luaranKegiatan"
              rows="3"
              placeholder="Tulis Luaran Kegiatan (maintenance lab, instalasi aplikasi, nilai mahasiswa mata kuliah, dll)"
              required
            ></textarea>
          </div>
        </div>

        <div class="flex justify-center">
          <div class="mb-3 w-96">
            <label
              for="dokumentasiKegiatan"
              class="form-label inline-block mb-2 text-gray-700"
              >Dokumentasi Kegiatan</label
            >
            <div v-if="isTodayExist" class="w-full p-4 border-2">
              <img
                class="w-[100px] mx-auto"
                :src="formInputs.dokumentasi"
                alt="dokumentasi"
              />
            </div>
            <input
              @change="handleFile"
              class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              type="file"
              id="dokumentasiKegiatan"
              accept=".jpg,.png,.gif,.jpeg"
              :required="!isTodayExist"
            />
          </div>
        </div>
        <div class="flex flex-row justify-between">
          <button
            type="submit"
            class="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            <i class="fa fa-floppy-o fa-lg" aria-hidden="true"></i>&nbsp;Simpan
          </button>
          <RouterLink
            to="/dashboard"
            type="button"
            class="px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            <i class="fa fa-arrow-circle-left fa-lg" aria-hidden="true"></i
            >&nbsp;Batal
          </RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>
