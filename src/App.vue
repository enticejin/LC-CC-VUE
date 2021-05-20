<template>
  <div id="app">
    <router-view/>
      <el-footer style="background:#fff;border-top: 1px solid #d2d6de;line-height:50px">
        <div style="float:right">
      	  <b>Version</b> 2.0.1
        </div>
        <strong style="float:left;font-size:14px">Copyright © 2017-2020 LC-TECHNOLOGY.版权所有.</strong>
      </el-footer>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
@import url('./assets/css/index.css');
html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: 'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',SimSun,sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    }
    #app {
    height: 100%;

    }
  a {
    color: #409EFF;
    text-decoration: none;
  }
</style>
