<template>
  <div class="w-full h-screen bg-bg-primary">
    <NavBar :date="dat"></NavBar>
    <div class=" ">
      <div class="flex justify-center gap-4 flex-col">
        <div class="mt-10 px-5">
          <div
            class="flex items-center mb-6 font-bold text-xl border px-4 py-3 w-[280px] border-black border-4 gap-4 rounded-full"
            @click="currentPosition"
          >
            <VIcon name="Location"></VIcon>
            <p>Take your position</p>
          </div>

          <input
            v-model="location"
            @keypress="onSubmit"
            type="text"
            class="form-control search__input"
            placeholder="Search location..."
            style="
              width: 20%;
              height: 40px;
              border: 4px;
              border-radius: 8px;
              font-size: 16px;
              font-weight: 600;
              border: black;
            "
          />
        </div>
        <div class="flex justify-center px-10" v-if="location">
          <PreView
            :country="meteo.name"
            :wind="meteo.wind.speed"
            :weather="meteo.weather[0].description"
            :humidity="meteo.main.humidity"
            :visiblity="meteo.visibility"
            :pressure="meteo.main.pressure"
            :temp="meteo.main.temp"
          ></PreView>
        </div>
        <div class="flex justify-between px-10 font-bold text-xl" v-if="location">
          <span> temperature max = {{ meteo.main.temp_max }} </span>
          <span> temperature min = {{ meteo.main.temp_min }} </span>
        </div>
        <div class="marquee-rtl" v-if="location">
          <div class="tracking-widest font-bold text-xl">
            {{meteo.weather[0].description}}
          </div>
         </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import NavBar from '@/components/NavBar.vue'
import PreView from '@/components/PreView.vue'
import VIcon from '@/components/VIcon.vue'


const location = ref()
const localisation = ref(false)
const dat = ref('')
const loading = ref(false)
const longitude = ref('')
const latitude = ref('')
const url_base = ref('https://api.openweathermap.org/data/2.5/')
const api_key = ref('0635803a8093df53cc85447f0b5d5214')
const meteo = ref([])
const lax = ref('')
const long = ref('')

const currentDate = (timezone: any) => {
  let date = new Date()
  let locatime = date.getTime()
  let localOffset = date.getTimezoneOffset() * 60000
  let utc = locatime + localOffset
  let current = utc + 1000 * timezone
  date = new Date(current)

  const months = [
    'January',
    'FEBRUARY',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const days = ['Monday', 'Tuesday', 'Wednesday', 'THURSDAY', 'Friday', 'SATURDAY', 'Sunday']

  let day = days[date.getDay()]
  let dates = date.getDate()
  let month = months[date.getMonth()]
  let year = date.getFullYear()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()

  const instant = `${day} ${dates} ${month} ${year}, ${hour}:${minute}:${second}`
  dat.value = instant
  lax.value = instant
  long.value = instant
}
 
const onSuccessFetch = (data: any) => {
  loading.value = false
  meteo.value = data
  location.value = meteo.value.name
  localisation.value = false
  currentDate(data.timezone)
}

const onSubmit = (e: any) => {
  if (e.key == 'Enter' || localisation.value) {
    loading.value = true
    if (e.key == 'Enter') {
      if (location.value == '') {
        alert('Pays ou ville requis')
        loading.value = false
        return
      }
    }

    const url = ref('')
    if (localisation.value) {
      url.value = `${url_base.value}weather?lat=${latitude.value}&lon=${longitude.value}&appid=${api_key.value}&units=metric&lang=fr`
    } else {
      url.value = `${url_base.value}weather?q=${location.value}&appid=${api_key.value}&units=metric&lang=fr`
    }

    fetch(url.value)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          alert('Recherche introuvable')
          loading.value = false
          return
        }
      })
      .then(onSuccessFetch)
   
  }
}

const currentPosition = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError)
  } else {
    alert('Votre navigateur ne supporte pas la géolocalisation')
    return
  }
}

const onSuccess = (position: any) => {
  loading.value = true
  latitude.value = position.coords.latitude
  longitude.value = position.coords.longitude
  console.log('po', position)
  localisation.value = true
  onSubmit(localisation.value)
}
const onError = (error: any) => {
  if (error.code == 1) {
    alert('Veuillez activez votre localisation et Réessayer !')
    return
  } else if (error.code == 2) {
    alert("Localisation invalide ou pas d'accès internet !")
    return
  } else {
    alert('Nous avons rencontrez un problème !')
    return
  }
}

onMounted(() => {
  currentPosition()
})
</script>

<style scoped>
 

/* ---------------------------- */
/* Défilement de droite à gauche */
.marquee-rtl {
  overflow: hidden; /* important */
  width:50%; max-width: 30em; /* A ADAPTER */
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
h2, p { text-align:center; }

.marquee-rtl {
  margin: 2em auto;
  border: 10px solid #F0F0FF;
  box-shadow: 0 .25em .5em #CCC,inset 0 0 1em .25em #CCC;
}
.marquee-rtl > div {
  font-size: 1.5em;
}

</style>
