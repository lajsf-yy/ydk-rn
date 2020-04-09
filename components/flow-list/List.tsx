import React from 'react';
import {
  FlatList,
  FlatListProps,
  RefreshControl,
  Animated,
  ViewProperties,
  ViewStyle,
  ListRenderItem,
  ListRenderItemInfo,
  ScrollView,
  View,
  ViewProps,
  AsyncStorage,
  ActivityIndicator,
  Text,
} from 'react-native';

import {shallowEqual} from '../../utils/comparison';
import {PageList} from 'interfaces/FlowList';
import EndTip from './EndTip';
import {transformSize} from '../../utils/transform';
import Indictor from '../../components/indicator';

export interface FlowProps<ItemT>
  extends Omit<FlatListProps<ItemT>, 'renderItem'> {
  disabledPage?: boolean;
  cacheKey?: string;
  disabledRefresh?: boolean;
  refreshScrollTop?: boolean;
  withStub?: boolean;
  headerHeight?: number;
  pageSize?: number;
  noMoreForLessPageSize?: boolean;
  api: (params: any) => Promise<PageList<ItemT>>;
  apiData: object;
  onRefresh?: () => void;
  useAnimated?: boolean;
  refreshControlOptions?: object;
  LoadingComponent?: () => React.ReactNode | React.ComponentType<any>;
  endTipStyle?: ViewStyle;
  onFetchedData?: (data: ItemT[], res: PageList<ItemT>) => void | ItemT[];
  renderItem: (
    item: ItemT,
    index: number,
    total: number,
  ) => React.ReactElement<any>;
}
interface IState<ItemT> {
  data: ItemT[];
  noMoreData: boolean;
  hasLoadData: boolean;
  refreshing: boolean;
}

class FlowList<ItemT> extends React.Component<FlowProps<ItemT>, IState<ItemT>> {
  static defaultProps = {
    pageSize: 20,
    disabledPage: false,
    cacheFirstPage: false,
    disabledRefresh: false,
    refreshScrollTop: false,
    useAnimated: false,
    data: [],
    //当前页数据总数不满足pageSize时就不请求下一页数据
    noMoreForLessPageSize: false,
    apiData: {},
    ListEmptyComponent: () => <Indictor preset="no-data"></Indictor>,
    LoadingComponent: () => (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator></ActivityIndicator>
        <Text
          style={{
            fontSize: transformSize(28),
            marginTop: transformSize(10),
            color: '#ccc',
          }}>
          加载中…
        </Text>
      </View>
    ),
  };

  flatListRef = React.createRef<FlatList<ItemT>>();
  /**
   * 请求是否完成
   */
  private isLoading: boolean = false;
  /**
   * 分页初始化
   */
  private pageNo: number = 1;
  /**
   * 组件是否安装
   */
  private _isMounted: boolean = true;

  /**
   * 初始时间戳
   */
  private timestamp: number = Date.now();
  constructor(props: FlowProps<ItemT>) {
    super(props);
    this.state = {
      refreshing: false,
      data: props.withStub ? [{}] : [],
      noMoreData: false,
      hasLoadData: false,
    };
  }
  scrollTo = (parms: {x?: number; y?: number; animated?: boolean}) => {
    let listRef = this.flatListRef.current as any;
    if (!listRef) return;
    if (!listRef.getScrollResponder) listRef = listRef.getNode();
    let scrollview: ScrollView = listRef.getScrollResponder();
    if (scrollview && scrollview.scrollTo) {
      scrollview.scrollTo(parms);
    }
  };
  componentDidMount() {
    this._isMounted = true;
    this.fetchData(false);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(preProps: FlowProps<ItemT>) {
    let update = ['api', 'pageSize'].some(
      (key: string) => preProps[key] !== this.props[key],
    );
    //'apiData' 浅比较
    if (update || !shallowEqual(preProps.apiData, this.props.apiData)) {
      this.handleRefresh();
    }
  }

  setCacheData = (key: string, res: PageList<ItemT>) => {
    return AsyncStorage.setItem(key, JSON.stringify(key));
  };

  getCacheData = async (key: string) => {
    let res = await AsyncStorage.getItem(key);
    if (!res) {
      return;
    }
    res = JSON.parse(res);
    this.afterFetchData(res as PageList<ItemT>);
  };

  private fetchData = async (refresh: boolean | void): Promise<void> => {
    if (this.isLoading) return;
    this.isLoading = true;
    let {api, apiData = false, pageSize, cacheKey} = this.props;
    if (refresh) {
      this.pageNo = 1;
    }
    if (apiData === false) {
      return;
    }
    let params = {...apiData, pageNo: this.pageNo, pageSize};
    try {
      let res = await api(params);
      this.afterFetchData(res);
      if (this.pageNo === 1 && cacheKey) {
        this.setCacheData(cacheKey, res);
      }
      this.pageNo++;
      this.isLoading = false;
      if (this.pageNo == 2) {
        this.finishRefresh();
      }
    } catch (res) {
      this.isLoading = false;
      this._isMounted &&
        this.setState(
          {refreshing: false, noMoreData: true, hasLoadData: true},
          () => {
            this.finishRefresh();
          },
        );
    }
  };

  private afterFetchData = (res: PageList<ItemT>) => {
    if (this.pageNo === 1) this.timestamp = Date.now();
    let {
      pageSize,
      disabledPage,
      onFetchedData,
      noMoreForLessPageSize,
    } = this.props;
    let {data, noMoreData} = this.state;

    let resEntities = res && res.entities;
    let fetchData =
      resEntities && onFetchedData ? onFetchedData(res.entities, res) : null;

    let entities = fetchData || resEntities || [];

    let extData = [...data, ...entities];

    if (this.pageNo === 1) {
      extData = [...entities];
      noMoreData = false;
    }
    //  后台返回的数据有可能会少于pageSize但还有下一页数据
    if (entities.length === 0 || disabledPage) {
      noMoreData = true;
    }
    // 正常情况当前页不满足pageSize时就没有更多数据
    if (noMoreForLessPageSize && entities.length < pageSize) {
      noMoreData = true;
    }

    this._isMounted &&
      this.setState({
        data: extData,
        noMoreData,
        hasLoadData: true,
        refreshing: false,
      });
  };
  handleRefresh = () => {
    if (this.isLoading) return;

    this.setState({refreshing: true}, () => {
      this.props.onRefresh && this.props.onRefresh();
      // 更新时间戳
      this.fetchData(true);
    });
  };

  handleLoadMore = () => {
    if (this.isLoading || this.state.noMoreData) {
      return;
    }
    this.fetchData(false);
  };

  private keyExtractor = (item: any, i: number): string => {
    return `${this.timestamp}_${item.kid || i}`;
  };

  finishRefresh = () => {
    if (this.props.refreshScrollTop) {
      let scroll = this.props.useAnimated
        ? (this.flatListRef.current as any)._component
        : this.flatListRef.current;
      let headerHeight = this.props.headerHeight || this.headerHeight;
      scroll.scrollToIndex({index: 0, viewOffset: headerHeight});
    }
  };

  // onEndReachedThreshold 没有作用，自行根据可见元素的变化加载更多
  private handleViewableItemsChanged = (e: any) => {
    let {viewableItems = []} = e;
    if (viewableItems.length === 0) return;
    let lastVisibleItem = viewableItems[viewableItems.length - 1];
    if (
      lastVisibleItem.index + this.props.pageSize / 2 >
      this.state.data.length
    ) {
      this.handleLoadMore();
    }
  };

  render() {
    let {data, refreshing} = this.state;
    let {
      disabledRefresh,
      onRefresh,
      onEndReached,
      useAnimated,
      keyExtractor,
      ...otherProps
    } = this.props;
    let FlatListComponent = FlatList;
    if (useAnimated) {
      FlatListComponent = (Animated as any).FlatList;
    }
    return (
      <FlatListComponent<ItemT>
        {...otherProps}
        ref={this.flatListRef}
        data={data}
        keyExtractor={keyExtractor || this.keyExtractor}
        ListHeaderComponent={this.renderListHeaderComponent()}
        ListFooterComponent={this.renderListFooterComponent()}
        ListEmptyComponent={this.renderListEmptyComponent()}
        onEndReached={onEndReached ? onEndReached : this.handleLoadMore}
        onViewableItemsChanged={this.handleViewableItemsChanged}
        refreshing={refreshing}
        renderItem={this.renderItem}
        refreshControl={this.renderRefreshControl()}
      />
    );
  }
  private renderItem = (info: ListRenderItemInfo<ItemT>) => {
    let ListRenderItem = this.ListRenderItem;
    return <ListRenderItem item={info.item} index={info.index} />;
  };
  ListRenderItem = React.memo((info: ListRenderItemInfo<ItemT>) => {
    // console.warn('render item', this.timestamp, (new Date).getTime())
    return this.props.renderItem(info.item, info.index, this.state.data.length);
  });

  private renderRefreshControl = () => {
    if (this.props.disabledRefresh) {
      return null;
    }
    let {refreshing} = this.state;
    let {refreshControl} = this.props;
    refreshControl = refreshControl || (
      <RefreshControl refreshing={refreshing} title="下拉获取更多内容" />
    );
    refreshControl = React.cloneElement(refreshControl, {
      refreshing: refreshing,
      onRefresh: this.handleRefresh,
    });
    return refreshControl;
  };
  headerHeight = 0;
  renderListHeaderComponent = () => {
    let {ListHeaderComponent} = this.props;

    if (!ListHeaderComponent) return ListHeaderComponent;
    if (React.isValidElement(ListHeaderComponent)) {
      return React.cloneElement(ListHeaderComponent, {
        onLayout: e => (this.headerHeight = e.nativeEvent.layout.height),
      } as ViewProps);
    }
    const HeaderComponent = ListHeaderComponent as React.ComponentType;
    return (
      <View onLayout={e => (this.headerHeight = e.nativeEvent.layout.height)}>
        <HeaderComponent />
      </View>
    );
  };
  private renderListEmptyComponent = () => {
    let {noMoreData, hasLoadData, data} = this.state;

    if (!hasLoadData || data.length) return null;
    return this.props.ListEmptyComponent;
  };
  private renderListFooterComponent = () => {
    let {noMoreData, hasLoadData, data} = this.state;
    let {LoadingComponent, ListFooterComponent} = this.props;
    if (!hasLoadData) {
      if (!LoadingComponent) return null;
      if (React.isValidElement(LoadingComponent)) return LoadingComponent;
      let Component = LoadingComponent as React.ComponentType;
      return <Component />;
    }
    if (!data.length) return null;

    if (ListFooterComponent) return ListFooterComponent;
    return (
      <EndTip noMoreData={noMoreData} endTipStyle={this.props.endTipStyle} />
    );
  };
}

export default FlowList;
