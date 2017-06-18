<template>
  <div id="app">
    <header class="ui-header ui-header-positive ui-border-b">
      <i class="ui-icon-return" onclick="history.back()"></i>
      <h1>{{filmName}}</h1>
    </header>
    <div class="demo-item">
      <div class="demo-block">
        <img class="posters" :src="filmImg" />
      </div>
      <div class="demo-block">
        <section class="ui-panel ui-panel-pure ui-border-t">
          <h3>迅雷下载链接：</h3>
          <ul class="ui-list ui-list-pure ui-border-tb">
            <li class="ui-border-t" v-for="(filmDown,index) in filmDowns">
              <textarea @click="selectText('url'+index)" :id="'url'+index" type="text" readonly="readonly">{{filmDown.downUrl}}</textarea>
            </li>
          </ul>
        </section>
      </div>
    </div>
  
    <!--加载层-->
    <div class="demo-block">
      <div class="ui-loading-block show" v-show="isShow">
        <div class="ui-loading-cnt">
          <i class="ui-loading-bright"></i>
          <p>正在加载中...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { zepto } from '../assets/lib/zepto.min'
import { frozen } from '../assets/js/frozen'
import Vue from 'vue'
import axios from 'axios'

export default {
  name: 'app',
  data() {
    return {
      title: '菜鸟电影',
      isShow: false,
      filmName: '',
      filmImg: '',
      filmDowns: [],
      apiURL: 'http://filmapi.flynoob.com/filmapi/api/Detail',
    }
  },
  methods: {
    getDetail: function () {
      let self = this;
      axios.get(this.apiURL + "?" + location.href.split('?')[1]).then(function (response) {
        console.log(response.data);
        self.filmName = response.data[0];
        self.filmImg = response.data[3];
        self.filmDowns = response.data[2];
        self.isShow = false;
      }).catch(function (error) {
        console.log(error);
      });
    },
    selectText: function (id) {
      // document.getElementById(id).focus();
      // document.getElementById(id).select();
      var content = document.getElementById(id);
      content.focus();
      content.selectionStart = 0;
      content.selectionEnd = content.value.length;
    }
  },
  created: function () {
    new Vue({ el: 'title' }).$el.innerText = this.title;
    this.isShow = true;
    this.getDetail();
  }
}
</script>

<style>
.demo-item {
  margin-top: 45px;
}

.demo-block {
  background-color: white;
  text-align: center;
}

.posters {
  margin: 20px;
  width: 80%;
  height: 4rem;
}

textarea {
  width: 100%;
  height: 100%;
  border: 0px;
  background: 0px 0px;
  -webkit-appearance: none;
  outline: 0px;
  resize: none;
  word-wrap: normal;
}
</style>
