# finance-admin

### setup

`npm i`


### run

`npm run dev`



### build

`npm run build`


### 目录结构
```js
src
 └── modules
     ├── B
     │   ├── mixins // 可选
     │   ├── components // 可选
     │   ├── constant // 可选
     │   ├── services // 必要
     │   ├── store // 必要
     │   ├── views // 必要
     │   └── routes // 必要
     └── A
         └── modules
             ├── A-2
             └── A-1
                 └── modules
                     └── A-1-1
```

### 推荐工作流
![](https://i.loli.net/2020/08/17/zB6nYD9JCAiG7j4.png)
#### store.js
```js
{
  actions: {
    async deleteById(_, payload) {
      const res = await fetchApi.delete()
      if (res.success) {
        return '删除成功'
      }
    }
  }
}
```
#### index.vue
```js
async function delateBtn(id) {
  const msg = await deleteById(id)
  this.$message.success(msg)
}
```
