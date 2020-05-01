<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model='model.parent'>
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id" />
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称">
        <el-input v-model="model.name" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
      parents:[]
    };
  },
  methods: {
    async save() {
      if (!this.id) {
        let res = await this.$http.post("rest/categories", this.model);
        this.$router.push("/categories");
        this.$message({
          type: "success",
          message: `新建成功 >> ${this.model.name} << `,
        });
      } else {
        let res = await this.$http.put(`rest/categories/${this.id}`, this.model);
        this.$router.push("/categories");
        this.$message({
          type: "success",
          message: `编辑成功 >> ${this.model.name} << `,
        });
      }
    },
    async init() {
      let res = await this.$http.get(`rest/categories/${this.id}`);
      this.model = res.data;
    },
    async initParents(){
      let res = await this.$http.get('rest/categories');
      this.parents = res.data
    }
  },
  created() {
    this.id && this.init();
    this.initParents();
  },
};
</script>
