<template>
  <el-table :data="tableData" style="width: 100%;">
    <el-table-column prop="title" label="文章名称" width="280"/>
    <el-table-column label="所属分类" width="230">
        <template slot-scope="scope">
          <el-tag style="margin-right:.6rem" v-for="item in scope.row.categories" :key="item._id " type="success" effect="dark">{{item.name}}</el-tag>
        </template>
      </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        categories:[{_id:'',name:''}]
      }],
    };
  },
  methods: {
    async init() {
      let res = await this.$http.get("rest/articles");
      this.tableData = res.data;
    },
    handleEdit(index, row) {
      this.$router.push(`/articles/edit/${row._id}`);
    },
    handleDelete(index,row){
      this.$confirm(`是否删除 >> ${row.title} << `,'提示',{
        confirmButtonText:'确认',
        cancleButtonText:'取消',
        type:'warning'
      }).then(()=>{
        this.$http.delete(`rest/articles/${row._id}`);
        this.tableData.splice(index,1)
        this.$message({
          type:'success',
          message:`删除 >> ${row.title} << 成功`
        })
      })
    },
    
  },
  created() {
    this.init();
  },
};
</script>
