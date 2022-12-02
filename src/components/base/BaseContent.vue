<template>
  <div class="base-content">
    <div class="nav">

    </div>
    <RouterView />
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  name: 'BaseContainer',
  components: { RouterLink, RouterView },
  data() {
    return {}
  },
}
</script>