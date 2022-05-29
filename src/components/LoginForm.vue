<script setup>
  import { ref } from "vue";
  import { RouterLink } from "vue-router";

  const props = defineProps({
    userRole: {
      type: String,
      default: "asisten",
    },
  });

  const roleTemplate = ref({
    userRoleCounterpart: "admin",
    roleIdentifier: "username",
    roleCounterpartUrl: "/admin",
  });

  if (props.userRole === "admin") {
    roleTemplate.value = {
      userRoleCounterpart: "asisten",
      roleIdentifier: "nim",
      roleCounterpartUrl: "/",
    };
  }
</script>

<template>
  <section class="h-full gradient-form bg-gray-200 md:h-screen">
    <div class="container py-12 px-6 h-full mx-auto">
      <div
        class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800"
      >
        <div class="xl:w-10/12">
          <div class="block bg-white shadow-lg rounded-lg pt-8 lg:pt-0">
            <div class="lg:flex lg:flex-wrap g-0">
              <div class="lg:w-6/12 px-4 md:px-0">
                <div class="md:p-12 md:mx-6">
                  <div class="text-center">
                    <img
                      class="mx-auto w-12"
                      src="@/assets/logoUpi.webp"
                      alt="logo"
                    />
                    <h4 class="text-xl font-semibold mt-4 pb-1">
                      Asisten Laboratorium Pendidikan Multimedia
                    </h4>
                    <h5 class="mb-12">UPI Cibiru</h5>
                  </div>
                  <form>
                    <p class="mb-4 capitalize">Masuk Akun {{ userRole }}</p>
                    <div class="mb-4">
                      <input
                        type="text"
                        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        :id="roleTemplate.roleIdentifier"
                        :placeholder="roleTemplate.roleIdentifier.charAt(0).toUpperCase() + roleTemplate.roleIdentifier.slice(1)"
                      />
                    </div>
                    <div class="mb-4">
                      <input
                        type="password"
                        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="password"
                        placeholder="Password"
                      />
                    </div>
                    <div class="text-center pt-1 mb-12 pb-1">
                      <button
                        class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                        type="button"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                      >
                        Masuk
                      </button>
                      <p class="inline">Akun Bermasalah?&nbsp;</p>
                      <a
                        class="text-blue-500"
                        href="https://api.whatsapp.com/send?phone=6282216901343&text=Halo,%20Admin%20AsLab%20PMM%20UPI%20Cibiru,%20saya%20memiliki%20masalah%20terkait%20akun%20asisten"
                        target="_blank"
                        >Hubungi Admin</a
                      >
                    </div>
                    <div class="flex items-center justify-between pb-6">
                      <RouterLink
                        :to="roleTemplate.roleCounterpartUrl"
                        class="mb-0 mr-2 text-blue-500 capitalize"
                        >Masuk Sebagai {{ roleTemplate.userRoleCounterpart }}</RouterLink
                      >
                      <div></div>
                    </div>
                  </form>
                </div>
              </div>
              <div
                class="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none bg-[url('@/assets/fotoLab.webp')] bg-cover"
              >
                <div
                  class="text-white px-4 py-6 md:p-12 md:mx-6 bg-gray-600 bg-opacity-60 rounded-lg"
                >
                  <h4 class="text-xl font-semibold mb-6">
                    We are more than just a company
                  </h4>
                  <p class="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
