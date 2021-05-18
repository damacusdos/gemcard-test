<template>
  <div>
    <transition name="fade">
      <div v-if="showBadge" class="total-number-badge">
        <div>There's {{ filteredNumber }} {{ currentType }} in total.</div>
      </div>
    </transition>
  </div>
</template>

<script>
import api from '@/api/request'

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
    }
  },
  mounted() {
    this.getAllPetsNumber()
    setTimeout(() => (this.showBadge = true), 1000)
    setTimeout(() => (this.showBadge = false), 3000)
  },
  methods: {
    async getAllPetsNumber() {
      const resp = await api.getAll(this.currentType)
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
.fade-enter-active {
  transform: scale(1.2);
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-leave-active {
  transform: translateY(-50%);
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
  opacity: 1;
}
</style>
