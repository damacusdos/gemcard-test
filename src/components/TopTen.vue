<template>
  <div>
    <div>Top 10 Pets</div>
    <div class="pet-list">
      <div v-for="(pet, index) in pets" :key="index" class="pet-item">
        <div :style="`background-image: url(${pet.url.url})`" class="pet-image"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      pets: null
    }
  },
  mounted() {
    this.getPetList()
  },
  methods: {
    async getPetList() {
      const response = await axios.get(
        'https://data.montgomerycountymd.gov/resource/e54u-qx42.json?$limit=10&$offset=0',
        {
          params: {
            $$app_token: 'D8zSK3YQscRF9ZveYwmXagPhK'
          }
        }
      )
      this.pets = response.data
    }
  }
}
</script>

<style scoped>
.pet-list {
  display: flex;
  flex-direction: row;
  overflow: auto;
}
.pet-item {
  height: 250px;
}
.pet-image {
  height: 100%;
  width: 250px;
  background-size: cover;
  margin: 10px;
}
</style>
