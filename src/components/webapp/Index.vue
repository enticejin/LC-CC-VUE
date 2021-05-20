<template>
 <div style="background-color: #EBEBEB;min-height:900px; padding: 0 0px;">
   <el-container style="height:100%;width:100%">
      <el-header style="background:#3c8dbc;padding: 0 0px;">
        <div style="height:60px;width:230px;background-color:#367fa9;float:left;margin-left:20px;">
          <a href="javascript:void(0);" class="logo" style="color:white;"> <!-- mini logo for sidebar mini 50x50 pixels -->
            <span class="logo-mini"><b>R</b>TLS</span> <!-- logo for regular state and mobile devices -->
            <span class="logo-lg"><b>联创科技</b>[RTLS]</span>
          </a>
        </div>
        <div style="float:right;width:350px;height:60px;margin-right:0px;color:white;font-size:12px;">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link" style="color:white">
              你好:{{sessionid}}<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item><router-link :to="{path: '/'}">退出登录</router-link></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
         </div>
      </el-header>
      </el-container>
   <div style="margin-top:5px">
     <el-row :gutter="10">
       <el-col :xs="4" :sm="4" :md="4" :lg="4">
         <div>
           <el-menu default-active="1" class="el-menu-vertical-demo" style="min-height:900px" @select="handleSelect">
             <el-row :gutter="10" class="tac">
               <el-col>
                   <el-submenu index="1-1">
                     <template slot="title">
                       <i class="el-icon-setting"></i>
                       <span>基础配置</span>
                     </template>
                     <el-menu-item-group>
                       <el-menu-item index="1-1"><i class="el-icon-location-outline"></i>基站列表</el-menu-item>
                       <el-menu-item index="1-2"><i class="el-icon-time"></i>时钟列表</el-menu-item>
                       <el-menu-item index="1-3"><i class="el-icon-news"></i>区域列表</el-menu-item>
                       <el-menu-item index="1-4"><i class="el-icon-menu"></i>分页设置</el-menu-item>
                     </el-menu-item-group>
                   </el-submenu>
               </el-col>
             </el-row>
                <el-divider content-position="left"></el-divider>
            <el-menu-item index="1"><i class="el-icon-location-outline" ></i>基站列表</el-menu-item>
               <el-divider content-position="left"></el-divider>
            <el-menu-item index="2"><i class="el-icon-time"></i>时钟列表</el-menu-item>
               <el-divider content-position="left"></el-divider>
            <el-menu-item index="3"><i class="el-icon-news"></i>区域列表</el-menu-item>
               <el-divider content-position="left"></el-divider>
            <el-menu-item index="4"><i class="el-icon-menu"></i>分页设置</el-menu-item>
             <el-divider content-position="left"></el-divider>
            <el-menu-item index="5"><i class="el-icon-news">WS</i></el-menu-item>
             <el-divider content-position="left"></el-divider>
            <el-menu-item index="6"><i class="el-icon-location">OP</i></el-menu-item>
             <el-divider content-position="left"></el-divider>
             <el-menu-item index="7"><i class="el-icon-tickets">布局</i></el-menu-item>
              <el-divider content-position="left"></el-divider>
           </el-menu>
         </div>
       </el-col>
       <el-col :xs="20" :sm="20" :md="20" :lg="20">
          <div style="margin-top:10px">
           <router-view></router-view>
         </div>
       </el-col>
     </el-row>
   </div>
 </div>
</template>

<script>
  export default {
    name: 'Index',
    data(){
      return{
        searchCriteria: '',
        breadcrumbItems: ['基站列表'],
        sessionid: '123456'
      }
    },
    created(){
      this.getSessionId();
      this.getAuth();
    },
    methods: {
      handleOpen(key, keyPath) {
      },
      handleClose(key, keyPath) {
      },
      handleIconClick(ev) {
      },
      getSessionId(){
        return this.sessionid = $cookies.get('sessionid');
      },
      getAuth(){
        return this.accessToken = $cookies.get('accessToken');
      },
      handleSelect(key, keyPath){
        switch(key){
          case '1':
            this.$router.push('/Anchors');
            this.breadcrumbItems  = ['基站列表']
            break;
          case '2':
            this.$router.push('/ClockSources')
            this.breadcrumbItems  = ['时钟源列表']
            break;
          case '3':
            this.$router.push('/Areas')
            this.breadcrumbItems  = ['区域列表']
            break;
          case '4':
            this.$router.push('/Pages')
            this.breadcrumbItems  = ['分页']
            break;
          case '5':
            this.$router.push('/Websocket')
            this.breadcrumbItems  = ['Websocket']
            break;
          case '6':
            this.$router.push('/Position')
            this.breadcrumbItems  = ['Position']
            break;
          case '7':
            this.$router.push('/Layout')
            this.breadcrumbItems  = ['Layout']
            break;
          case '1-1':
           this.$router.push('/Anchors')
           this.breadcrumbItems  = ['基站列表']
           break;
          case '1-2':
           this.$router.push('/ClockSources')
           this.breadcrumbItems  = ['时钟源列表']
           break;
          case '1-3':
             this.$router.push('/Areas')
             this.breadcrumbItems  = ['区域列表']
             break;
          case '1-4':
             this.$router.push('/Pages')
             this.breadcrumbItems  = ['Pages']
             break;
        }
      },
    }
  }
</script>

<style>
 .el-container {
    margin-bottom: 40px;
  }
</style>
