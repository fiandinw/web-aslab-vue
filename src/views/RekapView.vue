<script setup>
  import {
    collection,
    getFirestore,
    onSnapshot,
    query,
    where,
  } from "firebase/firestore";
  import { ref } from "vue";
  import { RouterLink } from "vue-router";
  const asistenId = localStorage.getItem("asistenId");
  const rekapData = ref([]);
  const db = getFirestore();
  const colref = collection(db, "laporan");
  const q = query(colref, where("asistenId", "==", asistenId));
  onSnapshot(q, (snapshot) => {
    //console.log(snapshot.empty)
    // console.log(snapshot.docs[0].data());
    if (!snapshot.empty) {
      snapshot.forEach((each) => {
        rekapData.value.push(each.data());
        const arr = rekapData.value
        arr.sort((a, b) => {return a.createdAt - b.createdAt})
        rekapData.value = arr
      });
    }
  });
</script>

<template>
  <div class="flex flex-col px-4 pt-4 lg:px-14">
    <RouterLink
      to="/dashboard"
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
                  Tanggal Laporan
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Catatan
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Luaran
                </th>
                <th
                  scope="col"
                  class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Dokumentasi
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, key) in rekapData" class="border-b">
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                >
                  {{ key + 1 }}
                </td>
                <td
                  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                >
                  {{ item.createDay }}/{{ item.createMonth }}/{{
                    item.createYear
                  }}
                </td>
                <td
                  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                >
                  {{ item.catatan }}
                </td>
                <td
                  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                >
                  {{ item.luaran }}
                </td>
                <td
                  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                >
                  <a :href="item.dokumentasi" target="_blank">
                    <img
                      class="w-[50px] h-[50px] object-cover"
                      :src="item.dokumentasi"
                      alt="dokumentasi"
                    />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
