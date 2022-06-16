<script setup>
  import MainButton from "../components/MainButton.vue";
  import undrawCheck from "../assets/undraw_done_checking_re_6vyx.svg";
  const asistenId = localStorage.getItem("asistenId");
</script>
<template>
  <div
    class="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-4 pt-8"
  >
    <MainButton
      icon="fa-clipboard"
      display-name="Laporan Harian"
      link-to="/lapor"
      description="Halaman untuk melaporkan kegiatan harian asisten"
    />
    <MainButton
      icon="fa-list-alt"
      display-name="Lihat Rekap Laporan"
      link-to="/rekap"
      description="Rekap seluruh laporan kegiatan harian"
    />
  </div>
  <div class="flex justify-center mt-12 p-4">
    <img class="hidden lg:block w-[30rem]" :src="undrawCheck" alt="undraw" />
  </div>
</template>
