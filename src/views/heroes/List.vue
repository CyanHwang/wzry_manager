<template>
  <el-table :data="tableData" style="width: 100%;">
    <el-table-column prop="name" label="英雄名称" />
    <el-table-column prop="avatar" label="图标" >
      <template slot-scope="scope">
        <img :src="scope.row.avatar" height="50px">
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
      tableData: [],
    };
  },
  methods: {
    async init() {
      let res = await this.$http.get("rest/heroes");
      this.tableData = res.data;
    },
    handleEdit(index, row) {
      this.$router.push(`/heroes/edit/${row._id}`);
    },
    handleDelete(index,row){
      this.$confirm(`是否删除 >> ${row.name} << `,'提示',{
        confirmButtonText:'确认',
        cancleButtonText:'取消',
        type:'warning'
      }).then(()=>{
        this.$http.delete(`rest/heroes/${row._id}`);
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
