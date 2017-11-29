<template>
  <div id="app">
    <header class="ui-header ui-header-positive ui-border-b">
      <h1 @click="toAbout">{{title}}</h1>
    </header>
    <section class="ui-container">
      <section id="tab">
        <div class="ui-tab">
          <ul class="ui-tab-nav ui-border-b">
            <li v-for="(title,index) in titles" :key="index">{{title}}</li>
          </ul>
          <ul class="ui-tab-content" style="width:100%">
            <li>
              <section id="list" v-show="contentIsShow">
                <ul class="ui-list ui-list-text ui-list-link ui-border-tb">
                  <li class="ui-border-t" v-for="(item,index) in items" :key="index" @click="toLink(item.detailUrl)">
                    <h4 class="ui-nowrap" v-html="item.title"></h4>
                  </li>
                </ul>
              </section>
              <section id="notice" v-show="!contentIsShow">
                <div class="demo-item">
                  <div class="demo-block">
                    <section class="ui-notice">
                      <i></i>
                      <p>获取资源出错，请稍后重试！</p>
                    </section>
                  </div>
                </div>
              </section>
            </li>
          </ul>
        </div>
      </section>
    </section>
    <footer class="ui-footer ui-footer-btn" v-show="contentIsShow">
      <ul class="ui-tiled ui-border-t">
        <li  @click="selectVal = previous">
          <div>
            <i class="ui-icon-prev" :class="{ 'isenable': isenable }"></i>
          </div>
        </li>
        <li class="ui-border-r">
          <div class="ui-select">
            <select v-html="options" @change="selectEvent">
            </select>
          </div>
        </li>
        <li @click="selectVal = next">
          <div>
            <i class="ui-icon-next isenable"></i>
          </div>
        </li>
      </ul>
    </footer>

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
import { zepto } from "../assets/lib/zepto.min";
import { frozen } from "../assets/js/frozen";
import Vue from "vue";
import axios from "axios";

export default {
  name: "app",
  data() {
    return {
      title: "菜鸟电影",
      isShow: false,
      contentIsShow: false,
      apiURL: "http://filmapi.flynoob.com/api/filmlist",
      type: [
        "?str=/html/gndy/dyzz/index.html",
        "?str=/html/bikan/",
        "?str=/html/tv/hytv/",
        "?str=/html/tv/oumeitv/",
        "?str=/html/zongyi2013/"
      ],
      titles: ["热门推荐", "必看热片", "华语电视", "欧美电视", "综艺动漫"],
      items: [],
      selectVal: "?str=/html/gndy/dyzz/index.html",
      options: "",
      previous: "",
      next: "",
      tabVal: 0,
      isenable: true
    };
  },
  methods: {
    getFilmData: function() {
      let self = this;
      self.isShow = true;
      axios
        .get(this.apiURL + self.selectVal)
        .then(function(response) {
          console.log(response);
          if (self.selectVal.indexOf("_") != -1) {
            self.previous = response.data.pagePrevious;
            self.next = response.data.pageNext;
            self.options = response.data.selectHtml;
            self.items = response.data.films;

            if(response.data.pageNext==undefined){
                console.log(response.data.pageNext);
                        self.isenable = false;
            }
            else{
                        self.isenable = true;
            }
          } else {
            self.previous = self.type[self.tabVal];
            self.next = response.data.pageNext;
            self.options = response.data.selectHtml;
            self.items = response.data.films;
            self.isenable = false;
          }
          let len = self.options.split("页");
          self.isShow = false;
          self.contentIsShow = true;
        })
        .catch(function(error) {
          console.log(error);
          self.isShow = false;
          self.contentIsShow = false;
        });
    },
    selectEvent: function(el) {
      this.selectVal = el.target.value;
    },
    toLink: function(value) {
      console.log(value);
      location.href = value;
    },
    toAbout: function() {
      location.href = "/about";
    }
  },
  created: function() {
    new Vue({ el: "title" }).$el.innerText = this.title;
    this.isShow = true;
    this.getFilmData("");
  },
  mounted: function() {
    const self = this;
    this.$nextTick(function() {
      var tab = new fz.Scroll(".ui-tab", {
        role: "tab"
        // autoplay: false,
        // interval: 3000
      });
      /* 滑动开始前 */
      tab.on("beforeScrollStart", function(fromIndex, toIndex) {
        self.tabVal = toIndex;
        self.selectVal = self.type[toIndex];
      });
    });
  },
  watch: {
    selectVal: "getFilmData"
  }
};
</script>

<style>
.ui-tab-nav {
  position: fixed;
  top: 45px;
  z-index: 2;
}

ul.ui-tab-content {
  margin-top: 45px;
  margin-bottom: 56px;
}

li.ui-border-t {
  min-height: 0.4rem;
}

.isenable {
  color: #18b4ed;
}

.ui-nowrap > font {
  color: black;
}

.ui-notice {
  top: 0;
  z-index: -1;
  height: 400px;
  width: 100%;
  height: 100%;
  z-index: 99;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  position: absolute;
  text-align: center;
}

#notice {
  height: 500px;
}
</style>
