<template>
<div>
  <Header/>
  <div id='siteName'>
    <h1><a style="color:#6bbf3f;text-decoration:none;">はちぽちの部屋</a></h1>
  </div>
  <div class="img" id="img">
    <div class='item_card' v-for="result in results" :key="result.item_info.img_title">
      {{ result.item_info.img_title }}<br>
      <a :href="'https://s3-ap-northeast-1.amazonaws.com/hachipochi-img/' +result.item_id" target="_blank">
        <img class="img_picture" :src="'https://s3-ap-northeast-1.amazonaws.com/hachipochi-img-thumbnail/thumb_' + result.item_id">
      </a>
    </div>
  </div>
</div>
</template>

<script>
import Header from '@/components/Header.vue'
import axios from 'axios'

export default {
  name: "gallery",
  components: {
    Header
  },
  data: function() {
    return {
      results: []
    }
  },
  async mounted() {
    await this.getImgData();
    await this.modifyItemInfo(this.results);
    this.sortItemInfo(this.results);
  },
  methods: {
    async getImgData() {
      const cont_type = new URLSearchParams(window.location.search);
      const url = process.env.VUE_APP_API_ENDPOINT + '/img?cont_name=' +  cont_type.get('cont')
      await axios.get(url).then(response => {
        this.results = response.data;
      }).catch(error => {
        console.log(error);
      });
    },
    modifyItemInfo(data) {
      for (let i=0; i<data.length; i++) {
        data[i].item_info = data[i].item_info.replace("\\", "");
        data[i].item_info = JSON.parse(data[i].item_info);
      }
      return data;
    },
    sortItemInfo(data) {
      data.sort(function(val1, val2){
        val1 = val1.register_time;
        val2 = val2.register_time;
        if (val1<val2) {
          return 1;
        }else{
          return -1;
        }
      });
    }
  }
}
</script>

<style>
.img_picture {
  max-width: 60%;
  height: auto;
}
</style>