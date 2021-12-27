<template>
<div>
  <Header/>
  <img class="topImg" src="@/assets/img/hachipochi_hanami01.jpg">
  <div id="gallery">
    <h2>Gallery</h2>
    <div id='galleryButton'>
      <a
        :href="result.item_info[0].cont_name"
        :key="result.item_info[0].cont_name"
        class="button" v-for="result in results"
      >{{ result.item_info[1].value }}</a>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import Header from '@/components/Header.vue'

export default {
  name: 'top',
  components: {
    Header
  },
  data: function() {
      return {
        results: []
      }
  },
  async mounted() {
    await this.getGenre();
    this.results = this.modifyItemInfo(this.results);
  },
  methods: {
    async getGenre() {
      let url = process.env.VUE_APP_API_ENDPOINT + '/genre';
      await axios.get(url).then(response => {
        this.results = response.data;
      }).catch(error => {
        console.log(error);
      })
    },
    modifyItemInfo(data) {
      for (let i=0; i<data.length; i++){
        data[i].item_info = data[i].item_info.replace("\\", "");
        data[i].item_info = JSON.parse(data[i].item_info);
        data[i].item_info[0].cont_name = "./gallery?cont=" + data[i].item_info[0].cont_name;
      }
      return data;
    }
  }
}
</script>

<style>
body {
  text-align: center;
  background-color: #ccffff;
}

h1,h2{
  color: #6bbf3f;
  font-family: "Note Sans JP";
}

.homeDoor {
  text-align: right;
}

.button {
  padding: 0.5em;
  margin: 10px 3px;
  color: #fff;
  background: #00913D;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  border-radius: 3px;
  text-align: center;
}

.button:before {
  content: "";
  display: inline-block;
  width: 18px;
  height: 18px;
  margin: -3px 5px 0 0;
  background: url('../assets/img/dog_nikukyu.png') no-repeat;
  background-size: contain;
  vertical-align: middle;
}

.button:hover {
  background: #6FBB3F;
}

.topImg {
  max-width: 60%;
  height: auto;
}
</style>