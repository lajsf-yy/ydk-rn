/// <reference path="custom.d.ts" />
/// <reference path="global.d.ts" />
declare module 'md5'
declare type Func<T = {}> = (value?: T) => void
type Listener<T> = (value: T) => void
declare interface PageComponent<P> {
  (props: P & { children?: JSX.Element; componentId: string }): JSX.Element
  componentId?: string
}
