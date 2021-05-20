<template>
 <div>
  <el-table
      <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%" :default-sort = "{prop: 'id', order: 'descending'}">
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        label="商品 ID"
        prop="id">
      </el-table-column>
      <el-table-column
        sortable
        label="商品名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="描述"
        prop="desc">
      </el-table-column>
    </el-table>
  <!-- 分页器 -->
  <div class="block" style="margin-top:15px;">
   <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1,5,10,20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
   </el-pagination>
  </div>
 </div>

</template>

 <script>
export default {
  name: 'pages',
 data() {
  return {
   tableData: [{
             id: '12987122',
             name: '好滋好味鸡蛋仔',
             category: '江浙小吃、小吃零食',
             desc: '荷兰优质淡奶，奶香浓而不腻',
             address: '上海市普陀区真北路',
             shop: '王小虎夫妻店',
             shopId: '10334'
           }, {
             id: '12987123',
             name: '好滋好味鸡蛋仔',
             category: '江浙小吃、小吃零食',
             desc: '荷兰优质淡奶，奶香浓而不腻',
             address: '上海市普陀区真北路',
             shop: '王小虎夫妻店',
             shopId: '10334'
           }, {
             id: '12987125',
             name: '好滋好味鸡蛋仔',
             category: '江浙小吃、小吃零食',
             desc: '荷兰优质淡奶，奶香浓而不腻',
             address: '上海市普陀区真北路',
             shop: '王小虎夫妻店',
             shopId: '10333'
           }, {
             id: '12987126',
             name: '好滋好味鸡蛋仔',
             category: '江浙小吃、小吃零食',
             desc: '荷兰优质淡奶，奶香浓而不腻',
             address: '上海市普陀区真北路',
             shop: '王小虎夫妻店',
             shopId: '10333'
           }],
   tableData_1: [{
     id: '12987122',
     name: '好滋好味鸡蛋仔',
     category: '江浙小吃、小吃零食',
     desc: '荷兰优质淡奶，奶香浓而不腻',
     address: '上海市普陀区真北路',
     shop: '王小虎夫妻店',
     shopId: '10334'
   },
   {
     id: '12987136',
     name: '好滋好味鸡蛋仔',
     category: '江浙小吃、小吃零食',
     desc: '荷兰优质淡奶，奶香浓而不腻',
     address: '上海市普陀区真北路',
     shop: '王小虎夫妻店',
     shopId: '10334'
   },{
     id: '12987135',
     name: '好滋好味鸡蛋仔',
     category: '江浙小吃、小吃零食',
     desc: '荷兰优质淡奶，奶香浓而不腻',
     address: '上海市普陀区真北路',
     shop: '王小虎夫妻店',
     shopId: '10334'
   }],
   currentPage: 1, // 当前页码
   total: 20, // 总条数
   pageSize: 5 // 每页的数据条数
  };
 },
 created() {
   this.getTable();
 },
 methods: {
  handleSizeChange(val) {
   this.currentPage = 1;
   this.pageSize = val;
  },
  handleCurrentChange(val) {
   this.currentPage = val;
  },
  getTable(){
    let tableData = this.tableData;
    let tableData_1 = this.tableData_1;
    let tableData_2 = []
    let currData = {}
    for(var i =0; i< tableData.length ;i++){
      for(var j =0; j< tableData_1.length ;j++){
        if(tableData[i].id === tableData_1[j].id){
          currData = tableData_1[j];
          tableData_2.push(currData);
        }
      }
    }
    this.tableData = tableData_2
  }
 }
};
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
