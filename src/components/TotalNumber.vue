<template>
  <div>
    <div
      class="total-number-badge fade-in"
      :style="[showBadge ? { opacity: '1' } : { opacity: '0' }]"
    >
      <div>There's {{ filteredNumber }} {{ currentType }} in total.</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['currentType'],
  data() {
    return {
      pets: [],
      showBadge: false
    }
  },
  computed: {
    filteredNumber() {
      const filteredList = []
      for (const pet of this.pets) {
        if (pet.animaltype === this.currentType) {
          filteredList.push(pet)
        }
      }
      return filteredList.length
    }
  },
  watch: {
    currentType() {
      this.getAllPetsNumber()
      setTimeout(() => (this.showBadge = true), 500)
      setTimeout(() => (this.showBadge = false), 3500)
    }
  },
  mounted() {
    this.getAllPetsNumber()
    setTimeout(() => (this.showBadge = true), 500)
    setTimeout(() => (this.showBadge = false), 3500)
  },
  methods: {
    async getAllPetsNumber() {
      const resp = await axios.get(
        `https://data.montgomerycountymd.gov/resource/e54u-qx42.json?animaltype=${this.currentType}`,
        {
          params: {
            $$app_token: 'D8zSK3YQscRF9ZveYwmXagPhK'
          }
        }
      )
      this.pets = resp.data
    }
  }
}
</script>

<style scoped>
.total-number-badge {
  position: fixed;
  top: 20vh;
  left: 50%;
  background-color: yellow;
  height: 150px;
  width: 150px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
