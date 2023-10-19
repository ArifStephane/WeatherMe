<template>
  <div class="w-[817px] h-[425px] py-[35px] px-[28px] gtr">
    <div class="flex gap-2 items-center">
      <span class="gt">{{country}}</span>
      <VIcon name="location"></VIcon>
    </div>
    <div class="flex items-center gap-5 justify-center mt-[66px]">
      <VIcon name="temperature"></VIcon>
      <p class="ty"> {{ temp }} °C</p>
    </div>
    <p class="ko">  {{ weather }}</p>
    <div class="flex mt-[110px] justify-between text-white">
      <div class="text-center">
        <p>Humidity</p>
        <p>{{ humidity }} %</p>
      </div>
      <div class="text-center">
        <p>Visiblity</p>
        <p>{{ visiblity }} km</p>
      </div>
      <div class="text-center">
        <p>Air Pressure</p>
        <p>{{ pressure }} hpa</p>
      </div>
      <div class="text-center">
        <p>Wind</p>
        <p>{{ wind }} mph</p>
      </div>
      <!-- <div class="text-center">
        <p>jhfjhdds</p>
        <p>gdhsj</p>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  country?: string,
  wind?: number,
  humidity?: string,
  visiblity?: string,
  pressure?: string
  temp?: string,
  weather?: string
 
}>();

</script>

<style scoped>
.gtr {
  border-radius: 32px;
  background: linear-gradient(113deg, #ad36cb 32.23%, #333 67.37%);
  box-shadow:
    0px 4px 4px 0px rgba(0, 0, 0, 0.25),
    0px 4px 4px 0px rgba(255, 250, 250, 0.25),
    0px 4px 4px 0px rgba(253, 245, 245, 0.25);
}
.ty {
  color: #f2f1f1;
  font-family: Poppins;
  font-size: 70px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
}
.gt {
  color: #fff;
  font-family: Poppins;
  font-size: 30px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
}
.ko {
  color: #fff;
  font-family: Poppins;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-decoration-line: underline;
}
</style>
