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
import api from '@/api/request'

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
      const response = await api.getSome(this.currentType, this.anchor, 0)
      this.pets = response.data
    },
    async loadMore() {
      const resp = await api.getSome(
        this.currentType,
        this.anchor,
        this.loadMoreTag
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
