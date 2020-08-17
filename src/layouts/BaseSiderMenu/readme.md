## 侧边栏组件

### 配置项

#### `hideInMenu: true`

取出组件的route对象，然后过滤`hideInMenu: true`，最后渲染出menu。
凡是在页面对应的meta中加了`hideInMenu: true`就删掉当前的对象，侧边栏就不会显示。

### sa-menu-item 中的index
在el-menu-item中有个index表示唯一标识符，我用path来赋值，每个页面的path是唯一的，并且是根据index来将active的焦点移到正确的位置上。

![](./readme-01.png)
