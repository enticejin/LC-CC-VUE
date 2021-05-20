<template>
  <div>
    <ul>
      <li v-for="item in tagData">{{item}}</li>
    </ul>
  </div>
</template>
<script>

  export default {
    name: 'Websocket',
    data() {
      return {
        dataList:[],
        websock: null,
        tagData: {}
      }
    },
    created() {
      this.initWebSocket();
    },
    destroyed() {
      this.websock.close() //离开路由之后断开websocket连接
    },
    methods: {

      initWebSocket(){ //初始化weosocket
        const wsuri = "ws://localhost:1202/ws";
        this.websock = new WebSocket(wsuri);
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onopen = this.websocketonopen;
        this.websock.onerror = this.websocketonerror;
        this.websock.onclose = this.websocketclose;
      },
      websocketonopen(){ //连接建立之后执行send方法发送数据
        //let actions = {"test":"12345"};
        //this.websocketsend(JSON.stringify(actions));
        console.log(this.websock.onmessage);
      },
      websocketonerror(){//连接建立失败重连
        this.initWebSocket();
      },
      websocketonmessage(e){ //数据接收
      let me = this;
      if(JSON.parse(e.data).messageType == undefined){
        console.log('RTLE引擎中还没有计算出标签的坐标！');
      }else{
        const redata = JSON.parse(e.data);
        if(redata.messageType === 'TagLocated'){
          let param = redata.messageBody;
          this.tagData = redata.messageBody;
          console.log('Id->'+param.tagId+' seq-->'+param.seq32+'(x= '+param.x+', y= '+param.y+', z= '+param.z+')'+' 电池电压———'+param.batteryVoltage)
        }
      }
      },
      websocketsend(Data){//数据发送
        this.websock.send(Data);
      },
      websocketclose(e){  //关闭
        console.log('断开连接',e);
      },
    },
  }
</script>
<style>
</style>
