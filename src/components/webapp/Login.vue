<template>
  <div>
    <div class="jl_loginindexbgimg">
    		<div class="jl_login-box">
    			<div class="jl_loginmain">
    				<div style="margin-top: 254px;margin-left:33px;float:left;">
    					<form  method="post" id="loginForm">
    						<!-- 用户名 -->
    						<div class="jl_userNameInput">
    							<input id="loginUserName" name="userName" v-model="userName" type="text" value="" placeholder="用户名" autocomplete/>
    						</div>
    						<!-- 密码 -->
    						<div class="jl_userPwdInput">
    							<input id="loginPassword" name="passWord" v-model="passWord" type="password" value="" placeholder="密码" class="jl_pwdinput"  autocomplete/>
    						</div>
    						<!-- 验证码 显示-->
    						<div class="jl_verificationCodeshow">

    						</div>
    						<!-- 验证码 输入-->
    						<div class="jl_verificationCode">
    							<input id="loginValidCode" name="validCode" type="text" placeholder="验证码" class="jl_verificationCodeinput" style="line-height:23px" autocomplete/>
    						</div>
    						<!-- 登录按钮 -->
    						<div class="jl_btnloginContener" @click="login()">
    							<!-- <input id="loginValidCode" name="validCode" type="button" /> -->
    						</div>
    					</form>
    				</div>
    			</div>
    		</div>
    	</div>
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="20%"
  :before-close="handleClose">
  <span>用户名或密码错误，请检查！</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
          userName: 'rtleapi',
          passWord: 'rtleapi',
          dialogVisible: false
      }
    },
    methods:{
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      login: function(){
        var me = this;
        if(this.userName === 'rtleapi' && this.passWord === 'rtleapi'){
            this.axios({
              method: 'post',
              url: '/',
              data:{
                userName: 'rtleapi',
                passWord: 'rtleapi'
              }
            })
            .then(function(response){
              console.log("sessionid="+ response.headers.sessionid);
              if(response.status === 200){
                $cookies.set('sessionid', response.headers.sessionid);
                let baseData = 'rtleapi:rtleapi'
                $cookies.set('accessToken', "Basic " + me.$base64.encode(baseData));
                $cookies.set('userName',me.userName);
                $cookies.set('passWord',me.passWord);
                console.log('保存的accessToken = '+ $cookies.get('accessToken'));
                me.router.push('/index')
              }
            })
        }else{
          this.dialogVisible = true;
        }
      }
    }
  }
</script>

<style>
  /*登陆页背景颜色 */
  .jl_loginindexbg
  {
  	background: #5a9acc;
  	margin-top: 0px;
  	margin-left: 0px;
  }
  /*登陆页背景图 */
  .jl_loginindexbgimg
  {
  	background: url('../../assets/images/back-1.jpg');
  	margin: auto;
  	position: absolute;
  	top: 0;
      left: 0;
      bottom: 0;
      right: 0;
  }
  /* 登陆框 */
  .jl_loginmain
  {
  	background: url('../../assets/images/login-bg2-1.png');
  	 width: 694px;
       height: 319px;
  	margin: auto;
  	position: absolute;
  	top: 0;
      left: 0;
      bottom: 25%;
      right: 0;
  }
  /* 用户名 */
  .jl_userNameInput
  {
  	width: 122px;
  	height: 35px;
  	float: left;
  	margin-top: 6px;
  	margin-left: 61px
  }
  *:focus { outline: none; }
  input[type="text"]:focus{line-height: normal; line-height: 2.4em\9;}
  input[type="password"]:focus{line-height: normal; line-height: 2.4em\9;}
  .jl_userNameInput input
  {
  	border:0px;
  	width: 122px;
  	-webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      height:32px
  }

  /* 密码 */
  .jl_userPwdInput
  {
  	width: 117px;
  	height: 35px;
  	float: left;
  	margin-top: 6px;
  	margin-left: 37px;

  }
  .jl_pwdinput
  {
  	border:0px;
  	width: 116px;
  	height:32px;
  	-webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      margin-left: 3px;
  }
  /* 验证码 */
  .jl_verificationCodeshow
  {
  	width: 75px;
  	height: 26px;
  	float: left;
  	margin-top: 11px;
  	margin-left: 6px;
  	background:url('../../assets/images/vcode.png');
  }
  .jl_verificationCode
  {
  	width: 78px;
  	height: 25px;
  	float: left;
  	margin-top: 11px;
  	margin-left: 5px;
  	background: #eee;
  }
  .jl_verificationCodeinput
  {
  	border:0px;
  	width: 72px;
  	height:23px;
  	-webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      margin-left: 3px;
  }
  /* 登录按钮 */
  .jl_btnloginContener
  {
  	width: 109px;
  	height: 35px;
  	float: left;
  	margin-top: 6px;
  	margin-left: 5px;
  	background:url('../../assets/images/btn_login.png');
  	cursor: pointer;
  }
  .jl_login-box
  {
  	width:100%;
  	background: red;
  }
</style>
