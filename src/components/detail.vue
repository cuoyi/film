<template>
  <div id="app">
    <header class="ui-header ui-header-positive ui-border-b">
      <i class="ui-icon-return" onclick="history.back()"></i>
      <h1>{{filmName}}</h1>
    </header>
    <div class="demo-item">
      <div class="demo-block">
        <img class="posters" :src="filmImg">
      </div>
      <div class="demo-block">
        <section class="ui-panel ui-panel-pure ui-border-t">
          <h3>迅雷下载链接：</h3>
          <ul v-for="(filmDown,index) in filmDowns" :key="index" class="ui-list ui-list-function ui-border-tb">
            <li class="ui-border-t">
              <textarea class="ui-list-info" readonly :id="'url_'+index" v-text="filmDown.downUrl"></textarea>
              <button class="ui-btn" data-clipboard-action="copy" :data-clipboard-target="'#url_'+index">
                点击复制
              </button>
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
import Clipboard from 'clipboard'

export default {
  name: 'app',
  data() {
    return {
      title: '菜鸟电影',
      isShow: false,
      filmName: '',
      filmImg: '',
      filmDowns: [],
      apiURL: 'http://filmapi.flynoob.com/api/Detail',
    }
  },
  methods: {
    getDetail: function () {
      let self = this;
      axios.get(this.apiURL + "?" + location.href.split('?')[1]).then(function (response) {
        console.log(response.data);
        self.filmName = response.data[0];
        self.filmDowns = response.data[1];
        self.filmImg = response.data[2];
        self.isShow = false;
      }).catch(function (error) {
        console.log(error);
      });
    }
  },
  created: function () {
    new Vue({ el: 'title' }).$el.innerText = this.title;
    this.isShow = true;
    this.getDetail();
  },
  mounted: function () {
    let clipboard = new Clipboard('.ui-btn');

    clipboard.on('success', function (e) {
      console.log(e);
      let el;
      el = $.tips({
        content: '复制成功',
        stayTime: 2000,
        type: "success"
      })
      el.on("tips:hide", function () {
        console.log("tips hide");
      })
    });

    clipboard.on('error', function (e) {
      console.log(e);
      let el;
      el = $.tips({
        content: '复制失败',
        stayTime: 2000,
        type: "success"
      })
      el.on("tips:hide", function () {
        console.log("tips hide");
      })
    });
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
  text-align: left;
  word-break: break-all;
}

.ui-list-info {
  text-align: left;
  padding-right: 12px !important;
  margin-right: 98px;
  word-break: break-all;
}
</style>
