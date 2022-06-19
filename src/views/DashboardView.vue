<script setup>
  import MainButton from "../components/MainButton.vue";
  import undrawCheck from "../assets/undraw_done_checking_re_6vyx.svg";
  import checklistImg from "../assets/checklist.png";
  import calendarImg from "../assets/calendar.png";
  import { doc, getFirestore, onSnapshot } from "@firebase/firestore";
  import { ref } from "vue";

  const asistenId = localStorage.getItem("asistenId");

  const db = getFirestore();

  let namaAsisten = ref("");

  const getAsistenData = () => {
    const docref = doc(db, "asisten", asistenId);
    onSnapshot(docref, (doc) => {
      //console.log(doc.data().nim, doc.id)
      namaAsisten.value = doc.data().nama;
    });
  };
  getAsistenData();
</script>
<template>
  <div class="flex flex-col items-center justify-center pt-8">
    <span class="font-medium text-4xl text-gray-600">Selamat Datang</span>
    <span>{{ namaAsisten }}</span>
  </div>
  <div
    class="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-4 pt-8"
  >
    <MainButton
      :icon="checklistImg"
      display-name="Laporan Harian"
      link-to="/lapor"
      description="Halaman untuk melaporkan kegiatan harian asisten"
    />
    <MainButton
      :icon="calendarImg"
      display-name="Lihat Rekap Laporan"
      link-to="/rekap"
      description="Lihat seluruh laporan kegiatan harian yang sudah anda input ke sistem"
    />
  </div>
  <!-- <div class="flex justify-center mt-12 p-4">
    <img class="hidden lg:block w-[30rem]" :src="undrawCheck" alt="undraw" />
  </div> -->
</template>
