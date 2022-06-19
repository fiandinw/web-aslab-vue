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
  import printJS from "print-js";
  import kopSurat from "../assets/kopSurat.png";
  import moment from "moment";

  const filterSelected = ref({
    asisten: "#",
    createdMonth: "#",
    createdYear: "#",
  });

  const db = getFirestore();

  const asistenAktif = ref([]);
  const getAsistenData = () => {
    const colref = collection(db, "asisten");
    const q = query(colref, where("statusAsisten", "==", true));
    onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        snapshot.docs.forEach((each) => {
          asistenAktif.value.push({ ...each.data(), id: each.id });
        });
      }
    });
  };
  getAsistenData();

  const dataLaporan = ref([]);
  const getLaporanData = () => {
    dataLaporan.value = [];
    const colref = collection(db, "laporan");
    let q = undefined;
    if (filterSelected.value.asisten != "semua") {
      q = query(
        colref,
        where("nim", "==", filterSelected.value.asisten),
        where("createMonth", "==", Number(filterSelected.value.createdMonth)),
        where("createYear", "==", Number(filterSelected.value.createdYear))
      );
    } else {
      q = query(
        colref,
        where("createMonth", "==", Number(filterSelected.value.createdMonth)),
        where("createYear", "==", Number(filterSelected.value.createdYear))
      );
    }
    onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        snapshot.docs.forEach((each) => {
          dataLaporan.value.push({ ...each.data(), id: each.id });
        });
        const arr = dataLaporan.value;
        arr.sort((a, b) => {
          return a.createdAt - b.createdAt;
        });
        dataLaporan.value = arr;
      }
    });
  };

  const handlePrint = () => {
    printJS({
      printable: "printContent",
      type: "html",
      targetStyles: ["*"],
      style: ".unhide {display: block !important}",
    });
  };

  const toIndoDay = (day) => {
    switch (day) {
      case "Monday":
        return "Senin";
        break;
      case "Tuesday":
        return "Selasa";
        break;
      case "Wednesday":
        return "Rabu";
        break;
      case "Thursday":
        return "Kamis";
        break;
      case "Friday":
        return "Jumat";
        break;
      default:
        return "Libur";
        break;
    }
  };

  const emptyData = () => {
    dataLaporan.value = [];
  };
</script>
<template>
  <div class="flex flex-col px-4 pt-4 lg:px-14">
    <div class="flex flex-row flex-wrap items-center gap-4">
      <RouterLink
        to="/admin/dashboard"
        type="button"
        class="px-6 py-2.5 w-fit bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        <i class="fa fa-arrow-circle-left fa-lg" aria-hidden="true"></i
        >&nbsp;Kembali
      </RouterLink>

      <select
        @change="emptyData"
        class="form-select appearance-none block w-56 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        aria-label="Default select example"
        v-model="filterSelected.asisten"
      >
        <option value="#" disabled>Pilih Asisten</option>
        <option value="semua">Semua Asisten Aktif</option>
        <option
          v-for="(item, key) in asistenAktif"
          :value="item.nim"
          :key="key"
        >
          {{ item.nama }}
        </option>
      </select>

      <select
        @change="emptyData"
        class="form-select appearance-none block w-56 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        aria-label="Default select example"
        v-model="filterSelected.createdMonth"
      >
        <option value="#" disabled>Pilih Bulan</option>
        <option value="1">Januari</option>
        <option value="2">Februari</option>
        <option value="3">Maret</option>
        <option value="4">April</option>
        <option value="5">Mei</option>
        <option value="6">Juni</option>
        <option value="7">Juli</option>
        <option value="8">Agustus</option>
        <option value="9">September</option>
        <option value="10">Oktober</option>
        <option value="11">November</option>
        <option value="12">Desember</option>
      </select>

      <select
        @change="emptyData"
        class="form-select appearance-none block w-56 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        aria-label="Default select example"
        v-model="filterSelected.createdYear"
      >
        <option value="#" disabled>Pilih Tahun</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
        <option value="2026">2026</option>
        <option value="2027">2027</option>
        <option value="2028">2028</option>
        <option value="2029">2029</option>
        <option value="2030">2030</option>
      </select>

      <button
        @click="getLaporanData"
        type="button"
        class="px-6 py-2.5 w-fit bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        <i class="fa fa-search fa-lg" aria-hidden="true"></i>&nbsp;Cari Rekap
        Data
      </button>
      <button
        v-if="dataLaporan[0]"
        @click="handlePrint"
        type="button"
        class="px-6 py-2.5 w-fit bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        <i class="fa fa-print fa-lg" aria-hidden="true"></i>&nbsp;Cetak Data
      </button>
    </div>
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div id="printContent">
          <div class="hidden unhide">
            <img class="" :src="kopSurat" alt="KopSurat" />
          </div>
          <div class="tableandinfo">
            <div class="mt-8 hidden unhide">
              <div
                v-if="
                  filterSelected.asisten != '#' &&
                  filterSelected.asisten != 'semua'
                "
              >
                Nama Asisten:
                {{
                  filterSelected.asisten != "#" &&
                  asistenAktif.find((el) => el.nim == filterSelected.asisten)
                    .nama
                }}
              </div>
              <div
                v-if="
                  filterSelected.createdMonth != '#' &&
                  filterSelected.createdYear != '#'
                "
              >
                Tanggal Laporan: {{ filterSelected.createdMonth }}/{{
                  filterSelected.createdYear
                }}
              </div>
            </div>
            <table class="min-w-full mt-8">
              <thead class="border-y">
                <tr>
                  <th
                    scope="col"
                    class="text-sm font-bold text-gray-900 px-2 py-4 text-left border-x-2"
                  >
                    #
                  </th>
                  <th
                    v-if="filterSelected.asisten == 'semua'"
                    scope="col"
                    class="text-sm font-bold text-gray-900 px-2 py-4 text-left border-x-2"
                  >
                    Nama Asisten (NIM)
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-bold text-gray-900 px-2 py-4 text-left border-x-2"
                  >
                    Tanggal Laporan
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-bold text-gray-900 px-2 py-4 text-left border-x-2"
                  >
                    Catatan
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-bold text-gray-900 px-2 py-4 text-left border-x-2"
                  >
                    Luaran
                  </th>
                  <th
                    scope="col"
                    class="text-sm font-bold text-gray-900 px-2 py-4 text-left border-x-2"
                  >
                    Dokumentasi
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, key) in dataLaporan"
                  :key="key"
                  class="border-b"
                >
                  <td
                    class="px-2 py-2 border-x-2 whitespace-nowrap text-sm font-medium text-gray-900"
                  >
                    {{ key + 1 }}
                  </td>
                  <td
                    v-if="filterSelected.asisten == 'semua'"
                    class="text-sm text-gray-900 font-light px-2 py-2 border-x-2"
                  >
                    {{ asistenAktif.find((el) => el.nim == item.nim).nama }} ({{
                      item.nim
                    }})
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-2 py-2 border-x-2 whitespace-nowrap"
                  >
                    {{
                      toIndoDay(
                        moment.unix(item.createdAt / 1000).format("dddd")
                      )
                    }}, {{ item.createDay }}/{{ item.createMonth }}/{{
                      item.createYear
                    }}
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-2 py-2 border-x-2"
                  >
                    {{ item.catatan }}
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-2 py-2 border-x-2"
                  >
                    {{ item.luaran }}
                  </td>
                  <td
                    class="text-sm text-gray-900 font-light px-2 py-2 border-x-2 whitespace-nowrap"
                  >
                    <a :href="item.dokumentasi" target="_blank">
                      <img
                        class="h-[50px] object-cover"
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
  </div>
</template>
