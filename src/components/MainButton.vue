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
    description: {
      type: String,
      default: "",
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
  <!-- <button
    @click="goTo"
    type="button"
    data-mdb-ripple="true"
    data-mdb-ripple-color="light"
    class="w-48 inline-flex flex-col items-center gap-4 px-6 py-8 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
  >
    <i :class="iconClass" aria-hidden="true"></i>
    <div class="">{{ displayName }}</div>
  </button> -->

  <div
    @click="goTo"
    class="flex justify-center hover:-translate-y-4 transition-all duration-300"
  >
    <div class="rounded-lg shadow-lg bg-white max-w-sm">
      <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
        <img
          class="rounded-t-lg"
          src="https://mdbootstrap.com/img/new/standard/nature/182.jpg"
          alt=""
        />
      </a>
      <div class="p-6">
        <h5 class="text-gray-900 text-xl font-medium mb-2">
          {{ displayName }}
        </h5>
        <p class="text-gray-700 text-base mb-4">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>
