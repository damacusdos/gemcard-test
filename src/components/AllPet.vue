<template>
  <div>
    <div>All Pets</div>
    <div ref="listContent" class="pet-list">
      <div v-for="(pet, index) in pets" :key="index" class="pet-item">
        <div
          :style="`background-image : url(${pet.url.url})`"
          class="pet-item-image"
        />
        <div class="pet-item-des">
          <div class="pet-item-detail">Gender: {{ pet.sex }}</div>
          <div class="pet-item-detail">Color: {{ pet.color }}</div>
        </div>
      </div>
      <div ref="listElm" class="more-content"></div>
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
      morePets: [],
      anchor: 10,
      loadMoreTag: 10
    }
  },
  watch: {
    currentType() {
      console.log(this.currentType)
      this.loadMoreTag = 10
      this.pets = []
      this.getPetList()
    }
  },
  mounted() {
    this.getPetList()
    window.addEventListener('scroll', this.scrollToLoad)
  },
  methods: {
    async getPetList() {
      const response = await axios.get(
        `https://data.montgomerycountymd.gov/resource/e54u-qx42.json?animaltype=${this.currentType}&$limit=${this.anchor}`,
        {
          params: {
            $$app_token: 'D8zSK3YQscRF9ZveYwmXagPhK'
          }
        }
      )
      this.pets = response.data
    },
    async loadMore() {
      const resp = await axios.get(
        `https://data.montgomerycountymd.gov/resource/e54u-qx42.json?animaltype=${this.currentType}&$limit=${this.anchor}&$offset=${this.loadMoreTag}`,
        {
          params: {
            $$app_token: 'D8zSK3YQscRF9ZveYwmXagPhK'
          }
        }
      )
      console.log('from loadmore', resp.data)
      this.pets.push(...resp.data)
      this.loadMoreTag += 10
    },
    scrollToLoad() {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      if (scrollTop + clientHeight > scrollHeight - 10) {
        this.loadMore()
      }
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
