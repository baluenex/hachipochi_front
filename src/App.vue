<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    createTitleDesc: function(routeInstance) {
      if(routeInstance.meta.title){
        const setTitle = routeInstance.meta.title;
        const setDesc = routeInstance.meta.desc;
        document.title = setTitle;
        document.querySelector("meta[name='description']").setAttribute('content', setDesc);
      } else {
        document.title = 'はちぽち.net';
        document.querySelector("meta[name='description']").setAttribute('content', '僕たちはちぽちをはじめとする、とても可愛らしい我が家のアニマルグッズを紹介するサイトだわん！わん！');
      }
    }
  },
  mounted : function() {
    const routeInstance = this.$route;
    this.createTitleDesc(routeInstance);
  },
  watch: { 
    '$route' (routeInstance) {
      this.createTitleDesc(routeInstance);
    }
  }
}
</script>