<template>
  <el-container style="height: 100vh;">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-active="$route.path" unique-opened router>
        <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">欢迎页</span>
      </el-menu-item>
        <el-submenu index="1">
          <template slot="title"
            ><i class="el-icon-document"></i>内容管理</template
          >
          <el-menu-item-group title="物品">
            <el-menu-item index="/items/create">新建物品</el-menu-item>
            <el-menu-item index="/items">物品列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="英雄">
            <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
            <el-menu-item index="/heroes">英雄列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="文章">
            <el-menu-item index="/articles/create">新建文章</el-menu-item>
            <el-menu-item index="/articles">文章列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"
            ><i class="el-icon-message"></i>运营管理</template
          >
          <el-menu-item-group title="广告">
            <el-menu-item index="/ads/create">新建广告</el-menu-item>
            <el-menu-item index="/ads">广告列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"
            ><i class="el-icon-setting"></i>系统管理</template
          >
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/categories/create">新建分类</el-menu-item>
            <el-menu-item index="/categories">分类列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="管理员">
            <el-menu-item index="/admins/create">创建管理员</el-menu-item>
            <el-menu-item index="/admins">管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>
      <el-main>
        <router-view :key="$route.path" />
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.el-table th > .cell {
  text-align: center;
}

.el-table .cell {
  text-align: center;
}
</style>

<script>
export default {};
</script>
