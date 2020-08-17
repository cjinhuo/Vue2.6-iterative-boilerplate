<script type="text/jsx">
/**
 * readme
 * columns 格式
 * [
 *    {
 *      type: '', 可选：orderNum表示列表序号
 *      label: '名词',
 *      prop: 'tableName',
 *      formatter: 自定义输出格式
 *      render(row) { // 是否定制
 *      }
 *    }
 * ]
 *
 * isSortable:是否可拖拽排序，可通过ref来取当前table的data，默认false
 * requestData:请求当前表格数据的函数
 * havePagination:是否有分页，默认true
 * paginationConfig分页的配置项
 */
// 用于节流
let throttle
let timer

import { isEmpty } from '@/utils'

export default {
  name: 'TableList',
  props: {
    columns: {
      type: Array,
      default: () => []
    },

    params: {
      type: Object,
      default: () => {}
    },

    havePagination: {
      type: Boolean,
      default: true
    },

    // eslint-disable-next-line vue/require-prop-types
    requestData: {},
    isRequestData: {
      type: Boolean,
      default: true
    },
    tableData: {
      type: Array,
      default: () => []
    },
    paginationConfig: {
      type: Object,
      default: () => ({
        pageSize: 20,
        totalCount: 0,
        pageNo: 1,
        pageSizes: [10, 20],
        layout: 'sizes, prev, pager, next'
      })
    },

    isCreatedRequest: {
      type: Boolean,
      default: true
    },

    isEmptyNotFetch: {
      type: Boolean,
      default: false
    }
  },

  data() {
    const { pageSize, totalCount, pageNo } = this.paginationConfig
    return {
      pagination: {
        pageSize,
        totalCount,
        pageNo
      },
      data: [],
      loading: false
    }
  },

  watch: {
    paginationConfig: {
      handler(value) {
        const { pageSize, totalCount, pageNo } = value
        this.pagination.pageSize = pageSize
        this.pagination.totalCount = totalCount
        this.pagination.pageNo = pageNo
      },
      deep: true
    },
    params: {
      handler(value) {
        this.pagination.pageNo = 1
        this.getData()
      },
      deep: true
    },
    tableData: {
      handler(value) {
        if (!this.isRequestData) {
          this.data = value
        }
      },
      immediate: true
    }
  },
  created() {
    if (this.isCreatedRequest && this.isRequestData) {
      this.getData()
    }
  },
  mounted() {
    // if (!this.isRequestData) {
    //   this.setSort()
    // }
  },
  methods: {
    async getData() {
      // 节流
      if (throttle) return
      throttle = true
      timer = setTimeout(() => {
        throttle = false
        clearTimeout(timer)
      }, 200)

      if (this.isEmptyNotFetch) {
        console.log('---isEmptyNotFetch--')
        const paramsIsNotEmpty = this.params && Object.keys(this.params).some(key => !!this.params[key])
        if (!paramsIsNotEmpty) return
      }

      const { pageNo, pageSize } = this.pagination
      this.loading = true
      const res = await this.requestData({
        pageNo,
        pageSize,
        ...this.params
      })
      this.loading = false
      if (res) {
        const { list, totalCount, pageNo, pageSize } = res
        this.data = list
        this.pagination.pageSize = pageSize
        this.pagination.totalCount = totalCount
        this.pagination.pageNo = pageNo
        console.log(this.pagination)
      }
    },
    setSort() {
      const el = this.$refs.tableRef.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost',
        setData: function(dataTransfer) {
          dataTransfer.setData('Text', '')
        },
        onEnd: evt => {
          console.log(evt)
          const targetRow = this.data.splice(evt.oldIndex, 1)[0]
          this.data.splice(evt.newIndex, 0, targetRow)
        }
      })
    },

    onSizeChange(pageSize) {
      console.log('pageSize', pageSize)
      this.pagination.pageSize = pageSize
      this.pagination.pageNo = 1
      this.getData()
      // this.$emit('changePage', this.pagination);
    },

    onCurrentChange(pageNo) {
      console.log('pageNo', pageNo)
      this.pagination.pageNo = pageNo
      this.getData()
      // this.$emit('changePage', this.pagination);
    },

    renderTable() {
      const tableColumns = this.columns.map((column, index) => {
        const { formatter, prop, type } = column
        if (!formatter) {
          column['formatter'] = function(row) {
            if (isEmpty(row[prop])) {
              return '-'
            }
            return row[prop]
          }
        }
        if (type === 'orderNum') {
          column['formatter'] = function(row, _, test, $index) {
            return $index + 1
          }
          column.fixed = true
          column.label = '序号'
        }
        const attributes = {
          attrs: { ...column }
        }
        return <el-table-column key={index} {...attributes} />
      })

      const tableAttrs = {
        attrs: this.$attrs,
        on: this.$listeners
      }

      return (
        <el-table dark-header	 ref='tableRef' border data={this.data} v-loading={this.loading} {...tableAttrs}>
          {tableColumns}
        </el-table>
      )
    },

    renderTablePagination() {
      if (!this.havePagination) return null
      const { pageSize, totalCount, pageNo, layout = 'total, prev, pager, next, jumper', pageSizes = [10, 20] } = this.pagination
      return (
        <el-pagination
          background
          hide-on-single-page
          on-current-change={this.onCurrentChange}
          on-size-change={this.onSizeChange}
          pageSizes={pageSizes}
          pageSize={pageSize}
          total={totalCount}
          currentPage={pageNo}
          layout={layout}
        />
      )
    }
  },

  render() {
    return (
      <div class='table--list'>
        <div class='table--list__inner'>{this.renderTable()}</div>
        <div class='table--list__pagination'>{this.renderTablePagination()}</div>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.table--list {
  &__pagination {
    margin-top: 12px;
    text-align: right;
  }
}
</style>
