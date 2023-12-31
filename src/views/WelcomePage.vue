<template>
  <div class="w-full h-screen bg-bg-primary">
    <div class="flex mt-10 items-center px-4 justify-between">
      <NavBar :date="dat"></NavBar>
      <div
        class="flex items-center h-[40px] mb-6 font-bold text-xl px-4 py-3 w-[280px] border-black border-2 gap-4 rounded-full"
        @click="currentPosition"
      >
        <VIcon name="Location"></VIcon>
        <p>Take your position</p>
      </div>
    </div>
    <div class="mt-6 mb-6 flex justify-center">
          <div class="flex flex-col">
            <label class=" font-semibold text-[16px] mb-3 ">Enter a country or city </label>
            <input
              v-model="location"
              @keypress="onSubmit"
              type="text"
              class=" h-[60px] w-[817px]  font-semibold text-[16px] rounded-[8px] border-solid border-black border-[2px] px-2"
              placeholder="Search location..."
            />
          </div>
        </div>
    <div class=" ">
      <div class="flex justify-center gap-4 flex-col">
      
        <div class="flex justify-center px-10" v-if="location && meteo">
          <PreView
            :country="meteo.name"
            :wind="meteo.wind.speed" 
            :weather="meteo.weather[0].description"
            :humidity="meteo.main.humidity"
            :visiblity="visibility"
            :pressure="meteo.main.pressure"
            :temp="meteo.main.temp"
          ></PreView>
        </div>
        <div
          class="flex justify-between px-10 font-bold text-xl"
          v-if="location && meteo"
        >
          <span> temperature max = {{ meteo.main.temp_max }} °C</span>
          <span> temperature min = {{ meteo.main.temp_min }} °C</span>
        </div>
        <div class="marquee-rtl" v-if="location && meteo">
          <div class="tracking-widest font-bold text-xl">
            {{ meteo.weather[0].description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import NavBar from "@/components/NavBar.vue";
import PreView from "@/components/PreView.vue";
import VIcon from "@/components/VIcon.vue";

interface Meteo {
  name: string;
  timezone: number;
  visibilitybility: string;
  wind: { speed: number };
  main: {
    humidity: string;
    temp_max: number;
    temp_min: number;
    pressure: string;
    temp: string;
  };
  weather: [{ description: string }];
}

const location = ref<string>("");
const localisation = ref(false);
const dat = ref("");
const loading = ref(false);
const longitude = ref("");
const latitude = ref("");
const url_base = ref("https://api.openweathermap.org/data/2.5/");
const api_key = ref("0635803a8093df53cc85447f0b5d5214");
const meteo = ref<Meteo | null>(null);
const lax = ref("");
const long = ref("");

const currentDate = (timezone: any) => {
  let date = new Date();
  let locatime = date.getTime();
  let localOffset = date.getTimezoneOffset() * 60000;
  let utc = locatime + localOffset;
  let current = utc + 1000 * timezone;
  date = new Date(current);

  const months = [
    "January",
    "FEBRUARY",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "THURSDAY",
    "Friday",
    "SATURDAY",
    "Sunday",
  ];

  let day = days[date.getDay()];
  let dates = date.getDate();
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  const instant = `${day} ${dates} ${month} ${year}, ${hour}:${minute}:${second}`;
  dat.value = instant;
  lax.value = instant;
  long.value = instant;
};
const visibility = ref()

const onSuccessFetch = (data: Meteo) => {
  meteo.value = data;
  visibility.value = data.visibility / 1000 
  loading.value = false;
  location.value = meteo.value.name;
  localisation.value = false;
  currentDate(meteo.value.timezone);
};

const onSubmit = (e: any) => {
  if (e.key == "Enter" || localisation.value) {
    loading.value = true;
    if (e.key == "Enter") {
      if (location.value == "") {
        alert("Pays ou ville requis");
        loading.value = false;
        return;
      }
    }

    const url = ref("");
    if (localisation.value) {
      url.value = `${url_base.value}weather?lat=${latitude.value}&lon=${longitude.value}&appid=${api_key.value}&units=metric&lang=fr`;
    } else {
      url.value = `${url_base.value}weather?q=${location.value}&appid=${api_key.value}&units=metric&lang=fr`;
    }

    fetch(url.value)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Recherche introuvable");
          loading.value = false;
          return;
        }
      })
      .then(onSuccessFetch);
  }
};

const currentPosition = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Votre navigateur ne supporte pas la géolocalisation");
    return;
  }
};

const onSuccess = (position: any) => {
  loading.value = true;
  latitude.value = position.coords.latitude;
  longitude.value = position.coords.longitude;
  console.log("po", position);
  localisation.value = true;
  onSubmit(localisation.value);
};
const onError = (error: any) => {
  if (error.code == 1) {
    alert("Veuillez activez votre localisation et Réessayer !");
    return;
  } else if (error.code == 2) {
    alert("Localisation invalide ou pas d'accès internet !");
    return;
  } else {
    alert("Nous avons rencontrez un problème !");
    return;
  }
};

onMounted(() => {
  currentPosition();
});
</script>

<style scoped>
/* ---------------------------- */
/* Défilement de droite à gauche */
.marquee-rtl {
  overflow: hidden; /* important */
  width: 50%;
  max-width: 30em; /* A ADAPTER */
}
.marquee-rtl > div {
  display: inline-block; /* important */
  white-space: nowrap; /* important */
  animation: defilement-rtl 5s infinite linear; /* défilement */
  cursor: pointer;
  padding: 10px 2em 10px 100%;
}
.marquee-rtl:hover > div {
  animation-play-state: paused; /* met en pause le défilement */
}

@keyframes defilement-rtl {
  0% {
    -webkit-transform: translate(0);
    transform: translate(0);
  }
  100% {
    -webkit-transform: translate(-100%);
    transform: translate(-100%);
  }
}

/* ---------------------------- */
/* déco */
h2,
p {
  text-align: center;
}

.marquee-rtl {
  margin: 2em auto;
  border: 10px solid #f0f0ff;
  box-shadow:
    0 0.25em 0.5em #ccc,
    inset 0 0 1em 0.25em #ccc;
}
.marquee-rtl > div {
  font-size: 1.5em;
}
</style>
