<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title" />
      </el-form-item>
      <el-form-item label="正文">
        <vue-editor
          v-model="model.body"
          useCustomImageHandler
          @image-added="handleImageAdded"
        ></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  props: {
    id: "",
  },
  components: {
    VueEditor,
  },
  data() {
    return {
      model: {},
      categories: [],
    };
  },
  methods: {
    async save() {
      if (!this.id) {
        let res = await this.$http.post("rest/articles", this.model);
        this.$router.push("/articles");
        this.$message({
          type: "success",
          message: `新建成功 >> ${this.model.name} << `,
        });
      } else {
        let res = await this.$http.put(`rest/articles/${this.id}`, this.model);
        this.$router.push("/articles");
        this.$message({
          type: "success",
          message: `编辑成功 >> ${this.model.name} << `,
        });
      }
    },
    async init() {
      let res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    async initCategories() {
      let res = await this.$http.get("rest/categories");
      this.categories = res.data;
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post('upload',formData).catch((err) => {
      });
      let url = res.data.url;
      Editor.insertEmbed(cursorLocation, "image", url);
      resetUploader();
    },
  },
  created() {
    this.id && this.init();
    this.initCategories();
  },
};
</script>
