<script setup>
import MainButton from '../components/MainButton.vue';
  const asistenId = localStorage.getItem("asistenId");
</script>
<template>
  <div class="flex flex-col lg:flex-row items-center justify-center gap-4 pt-8">
    <MainButton icon="fa-clipboard" display-name="Laporan Harian" link-to="/lapor"/>
    <MainButton icon="fa-list-alt" display-name="Lihat Rekap Laporan" link-to="/rekap"/>
  </div>
</template>
