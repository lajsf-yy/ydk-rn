export interface PageList<T> {
    /** 数据总条数，前端接口可忽略改字段 */
    count?: number
    /** 数据集合 */
    entities?: T[]
    /** 当前页码 */
    pageNo?: number
    /** 每页条数 */
    pageSize?: number
  }
  