<template>
 <div>
   <el-form :inline="true" style="line-height: 50px;" class="demo-form-inline">
     <el-form-item style="float: left;">
       <el-input
         v-model="search"
         class="search_name"
         size="mini"
         placeholder="输入区域名称查询">
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
      :data="areaList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      @selection-change="changeCheckBoxValue"
      border
      style="width: 100%">
       <el-table-column
             type="selection"
             width="55">
           </el-table-column>
       <el-table-column
         fixed
         prop="id"
         label="ID"
         width="192">
       </el-table-column>
       <el-table-column
         fixed
         prop="name"
         label="名称"
         width="150">
         <template slot-scope="scope">
           <el-popover trigger="hover" placement="right">
             <p><strong>ID</strong>: {{ scope.row.id }}</p>
             <p><strong>名称</strong>: {{ scope.row.name }}</p>
             <p><strong>时钟源ID（名称）</strong>：{{ scope.row.clockSourceId }}</p>
             <div slot="reference" class="name-wrapper">
               <strong>{{ scope.row.name }}</strong>
             </div>
           </el-popover>
         </template>
       </el-table-column>
       <el-table-column
         fixed
         prop="clockSourceId"
         label="时钟源ID（名称）"
         width="250">
       </el-table-column>
       <el-table-column
         fixed
         prop="comments"
         label="备注"
         width="200">
       </el-table-column>
       <el-table-column
         fixed="left"
         label="操作"
         width="200">
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
     <el-form :model="clockSourceForm" :anchor="areaList" ref="clockSourceForm" label-width="70px" class="demo-clockSourceForm" size="medium">
       <el-dialog
         title="时钟源编辑"
         :append-to-body='true'
         :visible.sync="dialogUpdate"
         width="20%"
         :before-close="handleClose">
         <el-input type="hidden" v-model="clockSourceForm.id"/>
         <el-form-item label="时钟名称" prop="name">
           <el-input :disabled="true" v-model="clockSourceForm.name"></el-input>
         </el-form-item>
         <el-form-item label="x坐标:" prop="x">
           <el-input v-model="clockSourceForm.x"></el-input>
         </el-form-item>
         <el-form-item label="y坐标:" prop="y">
           <el-input v-model="clockSourceForm.y"></el-input>
         </el-form-item>
         <el-form-item label="z坐标:" prop="z">
           <el-input v-model="clockSourceForm.z"></el-input>
         </el-form-item>
         <el-form-item label="备注:" prop="comments">
           <el-input v-model="clockSourceForm.comments"></el-input>
         </el-form-item>
         <span slot="footer" class="dialog-footer">
             <el-button @click="cancel()" size="medium">取 消</el-button>
             <el-button @click="updateAnchor()" type="primary" size="medium">确 定</el-button>
           </span>
       </el-dialog>
     </el-form>
     <!-- 分页器 -->
     <div class="block" style="margin-top:15px;">
      <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1,5,10,20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="areaList.length">
      </el-pagination>
     </div>
 </div>
</template>

<script>
  export default{
    name: 'Areas',
    data(){
      return{
        clockSources: '',
        areaList: [],
        search: '',
        clockSourceForm: {
          name: '',
          x: '',
          y: '',
          z: '',
          comments: ''
        },
        dialogVisible: false,
        dialogUpdate: false,
        currentPage: 1, // 当前页码
        total: this.getTotal, // 总条数
        pageSize: 10, // 每页的数据条数
      }
    },
    mounted(){
      this.getAreas()
    },
    methods: {
      //获取到复选框的ID对象
      changeCheckBoxValue(val) {
        let checkBoxData = this.checkBoxData
        $.each(val, function(i, v){
          if(checkBoxData.indexOf(v.id) == -1){
            checkBoxData.push(v.id);
          }
        })
       },
      //获取数据
      getAreas: function(){
        var me = this;
        me.areaList = []
        me.axios.get('/areas', {
          headers: {'SessionId': $cookies.get('sessionid'),'Authorization': $cookies.get('accessToken')}
        })
        .then(response => {
          me.areaList = response.data;
          me.clockSources = response.data;
        })
        .catch(error => {
          console.log(error);
        })
      },
      //刷新
      refreshData () {
        this.search= '',
        this.axios({
          method: 'get',
          url: '/areas'
        })
        .then(response => {
          this.areaList = []
          for(var i =0 ;i < response.data.length;i++){
            this.areaList.push(response.data[i])
          }
        })
        .catch(error => {
          console.log(error);
        })
      },
      //查询
      onSearch(){
        let me = this;
        this.axios({
          method: 'get',
          url: '/areas'
        })
        .then(response => {
          this.areaList = []
          for(var i =0 ;i < response.data.length;i++){
            if(me.search.trim().length> 0 && response.data[i].name.includes(me.search.trim())){
              this.areaList.push(response.data[i])
            }else if(me.search.trim().length === 0 || me.search.trim() === null){
              this.areaList.push(response.data[i])
            }
          }
        })
        .catch(error => {
          console.log(error);
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
             this.clockSourceForm = Object.assign({}, row)
       },
       cancel () {
         this.dialogUpdate = false
         this.dialogVisible = false
         this.emptyAnchorData()
       },
       emptyAnchorData () {
         this.clockSourceForm = {
           name: '',
           x: '',
           y: '',
           z: '',
           comments: ''
         }
       },
       //确定之后保存
       updateAnchor(){
         let putData = this.qs.stringify({
           id: this.clockSourceForm.id,
           name: this.clockSourceForm.name,
           x: this.clockSourceForm.x,
           y: this.clockSourceForm.y,
           z: this.clockSourceForm.z,
           comments: this.clockSourceForm.comments
         })
         this.axios({
           method: 'put',
           headers: {'SessionId': $cookies.get('sessionid'),'Authorization': $cookies.get('accessToken')},
           data: putData,
           url: '/areas'

         })
         .then(response => {
           this.areaList = response.data
           console.log(this.areaList)
           this.$message({
           type: 'success',
           message: '更新成功'
           })
         })
         .catch(error => {
           this.$message({
             type: 'success',
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
           let postData  = this.qs.stringify({
             id: row.id
           })
           this.axios({
             method: 'DELETE',
             url: '/areas',
             data: postData
           })
           .then(response =>{
             this.tableData = response.data
           })
         })
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
         this.total = this.clockSourceList.length;
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
