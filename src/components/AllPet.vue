<template>
  <div>
    <div>All Pets</div>
    <div class="pet-list">
      <div v-for="(pet, index) in filteredPets" :key="index" class="pet-item">
        <div :style="`background-image : url(${pet.url.url})`" class="pet-item-image" />
        <div class="pet-item-des">
          <div class="pet-item-detail">Gender: {{ pet.sex }}</div>
          <div class="pet-item-detail">Color: {{ pet.color }}</div>
        </div>
      </div>
      <div ref="listElm" class="more-content" />
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
      anchor: 0,
      loadMoreTag: 10
    }
  },
  computed: {
    filteredPets() {
      let filteredPetsList = []
      for(const pet of this.pets) {
        if (pet.animaltype === this.currentType) {
          filteredPetsList.push(pet)
        }
      }
      return filteredPetsList.slice(0, this.loadMoreTag)
    }
  },
  watch: {
    currentType() {
      this.loadMoreTag = 10
    }
  },
  mounted() {
    this.getPetList()
    window.addEventListener('scroll', () => {
      const { scrollHeight, scrollTop, clientHeight } = document.documentElement
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setTimeout(this.loadMore, 1500)
      }
    })
  },
  methods: {
    async getPetList() {
      const response = await axios.get(
        `https://data.montgomerycountymd.gov/resource/e54u-qx42.json`,
        {
          params: {
            $$app_token: 'D8zSK3YQscRF9ZveYwmXagPhK'
          }
        }
      )
      this.pets = response.data
      console.log(this.pets)
    },
    loadMore() {
      this.loadMoreTag += 10
    }
  }
}
</script>

<style scoped>
.pet-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.pet-item {
  width: 300px;
  height: 300px;
}
.pet-item-image {
  width: auto;
  height: 80%;
  background-size: cover;
  margin: 10px;
}
.pet-item-des {
  display: flex;
  flex-direction: row;
}
.pet-item-detail {
  width: 50%;
}
</style>
