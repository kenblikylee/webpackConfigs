<template>
  <div class="page">
    <header>{{ title }}</header>
    <article>
      <button @click="onClick">click here to know more about me!!!</button>
    </article>
    <footer>footer</footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'welcome to my personal website!!!'
    }
  },
  methods: {
    onClick() {
      console.log('my name is ken!!!')
    }
  }
}
</script>

<style>
.page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
header {
  height: 60px;
}
article {
  flex: 1;
}
footer {
  height: 60px;
}
</style>
