<script setup>
  import MainButton from "../components/MainButton.vue";
  import calendarImg from "../assets/calendar.png";
  import avatarsImg from "../assets/avatars.png";
  const adminId = localStorage.getItem("adminId");
</script>
<template>
  <div class="flex flex-col items-center justify-center pt-8">
    <span class="font-medium text-4xl text-gray-600">Selamat Datang Admin</span>
  </div>
  <div class="flex flex-col lg:flex-row items-center justify-center gap-4 pt-8">
    <MainButton
      :icon="avatarsImg"
      display-name="Kelola Akun Asisten"
      link-to="/admin/kelola"
      description="Buat, Ubah, dan Hapus akun asisten"
    />
    <MainButton
      :icon="calendarImg"
      display-name="Lihat Rekap Laporan"
      link-to="/admin/rekap"
      description="Lihat semua rekap asisten dan print"
    />
  </div>
</template>
