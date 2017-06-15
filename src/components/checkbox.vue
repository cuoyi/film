<template>
  <div id="app">
    <input type='checkbox' v-model='checked' @click='checkedAll'>全选
    <template v-for='checkb in checkboxData'>
      <input type='checkbox' v-model="checkb.ischeck" value='checkb.id' @click="checkOne">{{checkb.value}}
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'app',
      checkboxData: [{
        id: '1',
        ischeck: false,
        value: '苹果',
      }, {
        id: '2',
        ischeck: false,
        value: '荔枝'
      }, {
        id: '3',
        ischeck: false,
        value: '香蕉'
      }, {
        id: '4',
        ischeck: false,
        value: '火龙果'
      }],
      checked: false,
      selects: []
    }
  },
  methods: {
    checkOne: function (item) {
      let self = this;
      item.ischeck = !item.ischeck;
      this.checkboxData.some(function (item2) {
        if (!item2.ischeck) {
          self.checked = false;
          return true;
        }
        self.checked = true;
      });
    },
    checkedAll: function () {
      let self = this;
      this.checkboxData.forEach(function (item) {
        if (!self.checked) {
          item.ischeck = false;
        }
        else {
          item.ischeck = true;
        }
      });
    }
  },
}
</script>

<style>

</style>
