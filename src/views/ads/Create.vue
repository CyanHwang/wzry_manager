<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}广告</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-card>
      <el-form-item label="广告名称">
        <el-input v-model="model.name" />
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="model.items.push({})"
          >添加图片&链接</el-button
        >
        <el-row style="display:flex;flex-wrap:wrap;">
          <el-col :md="12" v-for="(item, i) in model.items" :key="i">
            <el-form-item>
              <el-input style="margin:1rem 0" v-model="item.url" placeholder="链接地址" />
            </el-form-item>
            <el-form-item>
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="(res) => $set(item, 'image', res.url)"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button @click="model.items.splice(i,1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      </el-card>
      <el-form-item>
        <el-button style="margin-top:2rem" type="primary" native-type="submit">保存</el-button>
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
      model: {
        items: [],
      },
      parents: [],
    };
  },
  methods: {
    async save() {
      if (!this.id) {
        let res = await this.$http.post("rest/ads", this.model);
        this.$router.push("/ads");
        this.$message({
          type: "success",
          message: `新建成功 >> ${this.model.name} << `,
        });
      } else {
        let res = await this.$http.put(`rest/ads/${this.id}`, this.model);
        this.$router.push("/ads");
        this.$message({
          type: "success",
          message: `编辑成功 >> ${this.model.name} << `,
        });
      }
    },
    async init() {
      let res = await this.$http.get(`rest/ads/${this.id}`);
      this.model = res.data;
    },
    async initParents() {
      let res = await this.$http.get("rest/ads");
      this.parents = res.data;
    },
  },
  created() {
    this.id && this.init();
    this.initParents();
  },
};
</script>

<style>
.el-input {
  width: 50%;
  min-width: 260px;
  max-width: 500px;
}
.el-textarea {
  width: 60%;
  min-width: 330px;
  max-width: 600px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 330px;
  height: 200px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 330px;
  height: 200px;
  display: block;
}
</style>
