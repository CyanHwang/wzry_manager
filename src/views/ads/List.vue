<template>
  <el-table :data="tableData" style="width: 100%;">
    <el-table-column prop="name" label="分类名称" width="180"/>
    <el-table-column label="预览" width="250">
      <template slot-scope="scope">
        <img :src="scope.row.items[0]?scope.row.items[0].image:''" height="80px">
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
      const res = await this.$http.get("rest/ads");
      this.tableData = res.data;
    },
    handleEdit(index, row) {
      this.$router.push(`/ads/edit/${row._id}`);
    },
    handleDelete(index,row){
      this.$confirm(`是否删除 >> ${row.name} << `,'提示',{
        confirmButtonText:'确认',
        cancleButtonText:'取消',
        type:'warning'
      }).then(()=>{
        this.$http.delete(`rest/ads/${row._id}`);
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
