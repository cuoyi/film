<template>
  <div id="app">
    <header class="ui-header ui-header-positive ui-border-b">
      <i class="ui-icon-return" onclick="history.back()"></i>
      <h1>{{filmName}}</h1>
    </header>
    <section id="notice">
      <div class="demo-block">
        <section class="ui-notice">
          <div class="ui-avatar-lg">
            <img src="../assets/img/head-img.png">
          </div>
          <section class="ui-container ui-center">
            <hr>
            <span> 兴趣使然的软件开发...</span>
            <hr>
            <div class="ui-label-list">
              <label class="ui-label">FrozenUI</label>
              <label class="ui-label">VeuJS</label>
              <label class="ui-label">Webpack</label>
              <label class="ui-label">Nginx</label>
            </div>
            <div class="ui-label-list">
              <label class="ui-label">Tomcat</label>
              <label class="ui-label">SpringMvc</label>
              <label class="ui-label">Jsoup</label>
            </div>
            <div class="ui-label-list">
              <label class="ui-label">GitHub</label>
            </div>
          </section>
        </section>
      </div>
    </section>
  
    <footer class="ui-footer">
      <p>2017.06 by.pumpkin</p>
    </footer>
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
      filmName: '关于',
    }
  },
  methods: {
  },
  created: function () {
    new Vue({ el: 'title' }).$el.innerText = this.title;
  }
}
</script>

<style>
.ui-avatar-lg {
  width: 120px;
  height: 120px;
}

.ui-footer {
  text-align: center;
  line-height: 56px;
  color: #888888;
}
</style>
