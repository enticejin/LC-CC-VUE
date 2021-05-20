<template>
  <div>
    <el-form :inline="true" style="line-height: 50px;" class="demo-form-inline">
      <el-form-item style="float: left;">
        <el-input
          text-align="left"
          v-model="search"
          class="search_name"
          size="mini"
          placeholder="输入基站名称查询">
        </el-input>
      </el-form-item>
      <el-form-item style="float: left;">
        <el-button
          type="text"
          @click="onSearch()"
          class="el-icon-search">查询
        </el-button>
      </el-form-item>
      <el-form-item style="float: left;">
        <el-button
          class="el-icon-refresh"
          type="text"
          @click="refreshData()">刷新
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
    size= "small"
    :data="anchorList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        @selection-change="changeCheckBoxValue"
        border
        :default-sort = "{prop: 'id', order: 'descending'}"
        style="width: 100%">
        <el-table-column
              align="center"
              type="selection"
              width="40%">
            </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="id"
          label="ID"
          width="200%">
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="name"
          fixed
          label="名称"
          width="250%">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="right">
              <p><strong>ID</strong>: {{ scope.row.id }}</p>
              <p><strong>名称</strong>: {{ scope.row.name }}</p>
              <p><strong>x坐标</strong>：{{ scope.row.x }}</p>
              <p><strong>y坐标</strong>：{{ scope.row.y }}</p>
              <p><strong>z坐标</strong>：{{ scope.row.z }}</p>
              <div slot="reference" class="name-wrapper">
                <strong>{{ scope.row.name }}</strong>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="x"
          label="x坐标"
          width="200%">
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="y"
          label="y坐标"
          width="200%">
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="z"
          label="z坐标"
          width="80%">
        </el-table-column>
        <el-table-column
        align="center"
        sortable
          prop="mainAnchorId"
          label="主基站ID"
          width="200%">
        </el-table-column>
        <el-table-column
       align="center"
          prop="comments"
          label="备注"
          width="200%">
        </el-table-column>
        <el-table-column
        align="center"
          prop="status"
          label="状态"
          width="45%">
        </el-table-column>
        <el-table-column
       align="center"
          span="left"
          label="操作"
          width="200%">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 编辑 -->
      <el-form :model="anchorForm" :anchor="anchorList" ref="anchorForm" label-width="70px" class="demo-anchorForm" size="medium">
        <el-dialog
          title="基站编辑"
          :append-to-body='true'
          :visible.sync="dialogUpdate"
          width="20%"
          :before-close="handleClose">
          <el-input type="hidden"  v-model="anchorForm.id"/>
          <el-form-item label="基站名称" prop="name">
            <el-input :disabled="true" v-model="anchorForm.name"></el-input>
          </el-form-item>
          <el-form-item label="主基站ID" prop="mainAnchorId">
            <el-input v-model="anchorForm.mainAnchorId"></el-input>
          </el-form-item>
          <el-form-item label="x坐标:" prop="x">
            <el-input v-model="anchorForm.x"></el-input>
          </el-form-item>
          <el-form-item label="y坐标:" prop="y">
            <el-input v-model="anchorForm.y"></el-input>
          </el-form-item>
          <el-form-item label="z坐标:" prop="z">
            <el-input v-model="anchorForm.z"></el-input>
          </el-form-item>
          <el-form-item label="备注:" prop="comments">
            <el-input v-model="anchorForm.comments"></el-input>
          </el-form-item>
          <span slot="footer" class="dialog-footer">
              <el-button @click="cancel()" size="medium">取 消</el-button>
              <el-button @click="updateAnchor()" type="primary" size="medium">确 定</el-button>
            </span>
        </el-dialog>
      </el-form>
      <!-- 分页器 -->
      <div class="block" style="margin-top:15px;">
       <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1,5,10,20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="anchorList.length">
       </el-pagination>
      </div>
      <div align="left">
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          @click="handleDeleteAll(checkBoxData)">批量删除
        </el-button>
      </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default{
    name: 'Anchors',
    data(){
      return{
        anchors: '',
        anchorList: [],
        checkBoxData: [],
        search: '',
        anchorForm: {
          name: '',
          x: '',
          y: '',
          z: '',
          mainAnchorId: '',
          comments: ''
        },
        dialogVisible: false,
        dialogUpdate: false,
        currentPage: 1, // 当前页码
        total: this.getTotal, // 总条数
        pageSize: 10, // 每页的数据条数
      }
    },
    mounted() {
      //进入页面加载基站
      this.getAnchors()
    },
    methods:{
      //刷新
      refreshData () {
        this.search= '',
        this.axios({
          method: 'get',
          url: '/anchors'
        })
        .then(response => {
          this.anchorList = []
          for(var i =0 ;i < response.data.length;i++){
            this.anchorList.push(response.data[i])
          }
        })
        .catch(error => {
          console.log(error);
        })
      },
      //查询基站
      onSearch(){
        let me = this;
        me.axios({
          method: 'get',
          url: '/anchors'
        })
        .then(response => {
          me.anchorList = []
          for(var i =0 ;i < response.data.length;i++){
            if(me.search.trim().length> 0 && response.data[i].name.includes(me.search.trim())){
              me.anchorList.push(response.data[i])
            }else if(me.search.trim().length === 0 || me.search.trim() === null){
              me.anchorList.push(response.data[i])
            }
          }
        })
        .catch(error => {
          console.log(error);
        })
       },
      //获取基站
      getAnchors: function(){
       var me = this;
       me.anchorList = []
        me.axios.get('/anchors', {
          headers: {
            "Accept": "application/json",
            "cache-control": "no-cache",
            'SessionId': $cookies.get('sessionid'),
            'Authorization': $cookies.get('accessToken')
         }
        })
        .then(function (res){
          me.anchorList = res.data
          me.anchors = res.data;
        })
        .catch(function(error){
          console.log(error)
        })
      },
      //关闭
      handleClose (done) {
        done()
        /*
        //添加验证
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
          */
      },
      //操作
      handleEdit(index, row) {
            this.dialogUpdate = true
            this.anchorForm = Object.assign({}, row)
      },
      cancel () {
        this.dialogUpdate = false
        this.dialogVisible = false
        this.emptyAnchorData()
      },
      emptyAnchorData () {
        this.anchorForm = {
          name: '',
          x: '',
          y: '',
          z: '',
          mainAnchorId: '',
          comments: ''
        }
      },
      //确定之后保存
      updateAnchor(){
        let putData = JSON.stringify({
          id: this.anchorForm.id,
          name: this.anchorForm.name,
          x: parseFloat(this.anchorForm.x),
          y: parseFloat(this.anchorForm.y),
          z: parseFloat(this.anchorForm.z),
          mainAnchorId: this.anchorForm.mainAnchorId,
          comments: this.anchorForm.comments
        })

        this.axios({
          method: 'put',
          headers: {'SessionId': $cookies.get('sessionid'),'Authorization': $cookies.get('accessToken'),
                    'Content-Type':'application/json;charset=UTF-8'},
          data: putData+ '\n',
          url: '/anchors'
        })
        .then(response => {
          this.anchorList = response.data
          this.$message({
          type: 'success',
          message: '更新成功',
          }),
          this.getAnchors(),
          this.cancel()
        })
        .catch(error => {
          this.$message({
            type: 'failed',
            message: '更新失败'
          })
        })
      },
      //删除
      handleDelete (index, row){
        this.$confirm('删除操作，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
        .then(() => {
          this.axios({
            method: 'delete',
            url: '/anchors/'+ row.id
          })
          .then(response =>{
            this.anchorList = this.getAnchors(),
            this.$message({
            type: 'success',
            message: '删除成功',
            })
          })
          .catch(error => {
            console.log('error = '+error)
            this.$message({
            type: 'success',
            message: '删除失败',
            })
          })
        })
      },
      //获取到复选框的ID对象
      changeCheckBoxValue(val) {
        let checkBoxData = this.checkBoxData
        $.each(val, function(i, v){
          if(checkBoxData.indexOf(v.id) == -1){
            checkBoxData.push(v.id);
          }
        })
       },
      handleDeleteAll (checkBoxData){
        console.log("是否选中："+event.target.checked);
        console.log("获取到的ID："+  this.checkBoxData );
        //提示
        this.$confirm('删除操作，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
        Promise.all(checkBoxData).then(res => {
          //console.log(res.data);
        })
        .catch(error => {
          console.log(error);
        })
        /*
        this.axios({
          method: 'delete',
          //循环删除
            for(var i =0;i < checkBoxData.length;i++){
              url: '/anchors/'+ checkBoxData[i]
            }
        })
        .then(response =>{
          this.anchorList = this.getAnchors(),
          this.$message({
          type: 'success',
          message: '删除成功',
          })
        })
        .catch(error => {
          console.log('error = '+error)
          this.$message({
          type: 'success',
          message: '删除失败',
          })
        })
        */
      },
      //分页
      handleSizeChange(val) {
         this.currentPage = 1;
         this.pageSize = val;
        },
      handleCurrentChange(val) {
       this.currentPage = val;
      },
      getTotal(){
        this.total = this.anchorList.length;
      },
      getCurrentPage(){
        return this.currentPage;
      },
    }
  }
</script>

<style>
  .search_name{
    width: 200px;
  }
  .pages{
    margin: 0px;
    padding: 0px;
    text-align: right;
  }
</style>
