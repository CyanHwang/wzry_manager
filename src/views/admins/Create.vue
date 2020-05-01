<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="model.password" type="password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">{{ id ? "确认修改" : "确认创建" }}</el-button>
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
        let res = await this.$http.post("rest/admins", this.model);
        this.$router.push("/admins");
        this.$message({
          type: "success",
          message: `新建成功 >> ${this.model.name} << `,
        });
      } else {
        let res = await this.$http.put(`rest/admins/${this.id}`, this.model);
        this.$router.push("/admins");
        this.$message({
          type: "success",
          message: `编辑成功 >> ${this.model.name} << `,
        });
      }
    },
    async init() {
      let res = await this.$http.get(`rest/admins/${this.id}`);
      this.model = res.data;
    },
    async initParents(){
      let res = await this.$http.get('rest/admins');
      this.parents = res.data
    }
  },
  created() {
    this.id && this.init();
    this.initParents();
  },
};
</script>
