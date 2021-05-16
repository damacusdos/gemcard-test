<template>
  <div id="app">
    <div>
      <div ref="selectType" class="current-type">{{ currentType }}</div>
      <div class="switch-button" :class="{'stickyNav' : scrollToNav}" @click="selectType($event)">
        <div v-for="(type, index) in types" :key="index" class="button">
          <div>{{ type }}</div>
        </div>
      </div>
    </div>
    <TopTen />
    <TotalNumber :currentType="currentType" />
    <AllPet :currentType="currentType" />
  </div>
</template>

<script>
import TopTen from './components/TopTen.vue'
import TotalNumber from '@/components/TotalNumber.vue'
import AllPet from '@/components/AllPet.vue'

export default {
  name: 'App',
  components: {
    TopTen,
    TotalNumber,
    AllPet
  },
  data() {
    return {
      currentType: 'DOG',
      types: ['DOG', 'CAT', 'OTHER', 'BIRD'],
      scrollToNav: false
    }
  },
  mounted() {
    window.addEventListener('scroll', () => {
      const height = this.$refs.selectType.offsetHeight
      const {scrollTop} = document.documentElement
      if (scrollTop > height) {
        this.scrollToNav = true
      } else {
        this.scrollToNav = false
      }
    })
  },
  methods: {
    selectType(e) {
      this.currentType = e.target.innerText
      console.log(this.currentType)
    },
    scrollDown() {
      console.dir(this.$refs.selectType)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.current-type {
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.switch-button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.stickyNav {
  position: fixed;
  top: 0;
}
.button {
  width: 200px;
  background-color: #fff;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}
.button:hover {
  cursor: pointer;
}
</style>
