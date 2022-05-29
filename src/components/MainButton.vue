<script setup>
  import { ref } from "vue";
  import { RouterLink } from "vue-router";
  import router from "../router";

  const props = defineProps({
    displayName: {
      type: String,
      default: "Button Display Name",
    },
    icon: {
      type: String,
      default: "fa-fork-awesome",
    },
    linkTo: {
      type: String,
      default: "/",
    },
  });

  const iconClass = ref(`fa ${props.icon} fa-5x block`);

  const goTo = () => {
    setTimeout(() => {
      router.push(props.linkTo);
    }, 150);
  };
</script>

<template>
  <button
    @click="goTo"
    type="button"
    data-mdb-ripple="true"
    data-mdb-ripple-color="light"
    class="w-48 inline-flex flex-col items-center gap-4 px-6 py-8 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
  >
    <i :class="iconClass" aria-hidden="true"></i>
    <div class="">{{ displayName }}</div>
  </button>
</template>
