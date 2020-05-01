<template>
  <el-table :data="tableData" style="width: 100%;">
    <el-table-column prop="name" label="分类名称" width="120"/>
    <el-table-column prop="parent.name" label="上级分类" width="200"/>
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
      tableData: [],
    };
  },
  methods: {
    async init() {
      let res = await this.$http.get("rest/categories");
      console.log(res.data)
      this.tableData = res.data;
    },
    handleEdit(index, row) {
      this.$router.push(`/categories/edit/${row._id}`);
    },
    handleDelete(index,row){
      this.$confirm(`是否删除 >> ${row.name} << `,'提示',{
        confirmButtonText:'确认',
        cancleButtonText:'取消',
        type:'warning'
      }).then(()=>{
        this.$http.delete(`rest/categories/${row._id}`);
        this.tableData.splice(index,1)
        this.$message({
          type:'success',
          message:`删除 >> ${row.name} << 成功`
        })
      })
    }
  },
  created() {
    this.init();
  },
};
</script>
