<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs value="skills" type="border-card">
        <el-tab-pane name="information" label="基本信息">
          <el-form-item label="英雄头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + 'upload'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="英雄名称">
            <el-input v-model="model.name" />
          </el-form-item>
          <el-form-item label="英雄称号">
            <el-input v-model="model.title" />
          </el-form-item>
          <el-form-item label="英雄类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              style="margin-top:0.6rem"
              :max="9"
              show-score
              v-model="model.scores.difficulty"
            />
          </el-form-item>
          <el-form-item label="技能">
            <el-rate
              style="margin-top:0.6rem"
              :max="9"
              show-score
              v-model="model.scores.skills"
            />
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate
              style="margin-top:0.6rem"
              :max="9"
              show-score
              v-model="model.scores.attack"
            />
          </el-form-item>
          <el-form-item label="生存">
            <el-rate
              style="margin-top:0.6rem"
              :max="9"
              show-score
              v-model="model.scores.survive"
            />
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能管理" name="skills">
          <el-button size="small" @click="model.skills.push({})"
            ><i class="el-icon-plus" />添加技能</el-button
          >
          <el-row style="display:flex;flex-wrap:wrap;">
            <el-col
              :md="12"
              style="margin:1rem 0;"
              v-for="(item, i) in model.skills"
              :key="i"
            >
              <el-form-item>
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + 'upload'"
                  :show-file-list="false"
                  :on-success="(res) => $set(item, 'icon', res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-input v-model="item.name" />
              </el-form-item>
              <el-form-item>
                <el-input type="textarea" v-model="item.description" />
              </el-form-item>
              <el-form-item>
                <el-input type="textarea" v-model="item.tip" />
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="model.skills.splice(i, 1)"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="玩法">
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option
                v-for="item in items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option
                v-for="item in items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTip" />
          </el-form-item>
          <el-form-item label="对战技巧">
            <el-input type="textarea" v-model="model.battleTip" />
          </el-form-item>
          <el-form-item label="团战技巧">
            <el-input type="textarea" v-model="model.teamTip" />
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top:1rem">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: '',
  },
  data() {
    return {
      model: {
        scores: { difficulty: 0 },
        skills: [],
      },
      categories: [],
      items: [],
    };
  },
  methods: {
    async save() {
      if (!this.id) {
        let res = await this.$http.post("rest/heroes", this.model);
        this.$router.push("/heroes");
        this.$message({
          type: "success",
          message: `新建成功 >> ${this.model.name} << `,
        });
      } else {
        let res = await this.$http.put(`rest/heroes/${this.id}`, this.model);
        this.$router.push("/heroes");
        this.$message({
          type: "success",
          message: `编辑成功 >> ${this.model.name} << `,
        });
      }
    },
    async init() {
      let res = await this.$http.get(`rest/heroes/${this.id}`);
      // this.model = Object.assign({},this.model,res.data);  //data填充model,不会导致覆盖
      this.model = res.data;
    },
    async initCategories() {
      let res = await this.$http.get("rest/categories");
      this.categories = res.data;
    },
    async initItems() {
      let res = await this.$http.get("rest/items");
      this.items = res.data;
    },

    handleAvatarSuccess(res) {
      this.$set(this.model, "avatar", res.url);
    },
  },
  created() {
    this.initCategories();
    this.initItems();
    this.id && this.init();
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
