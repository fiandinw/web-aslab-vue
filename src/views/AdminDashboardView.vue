<script setup>
  import MainButton from "../components/MainButton.vue";
  const adminId = localStorage.getItem("adminId");
</script>
<template>
  Dashboard {{ adminId }}
  <div class="flex flex-col lg:flex-row items-center justify-center gap-4">
    <MainButton
      icon="fa-users"
      display-name="Kelola Akun Asisten"
      link-to="/admin/akun"
    />
    <MainButton
      icon="fa-list-alt"
      display-name="Lihat Rekap Laporan"
      link-to="/admin/rekap"
    />
  </div>
</template>
