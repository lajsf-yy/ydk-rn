import React, { ConsumerProps, useMemo, useRef } from 'react'
import ToastContainer from 'components/toast'
import { useTopView } from './useTopView'
import { useEffect } from 'react'

export interface Toast {
  show(content: string, duration?: number, mask?: boolean, onClose?: () => void): Promise<any>

  info(content: string, duration?: number, onClose?: () => void, mask?: boolean): Promise<any>

  success(content: string, duration?: number, onClose?: () => void, mask?: boolean): Promise<any>

  fail(content: string, duration?: number, onClose?: () => void, mask?: boolean): Promise<any>

  offline(content: string, duration?: number, onClose?: () => void, mask?: boolean): Promise<any>

  loading(content: string, duration?: number, onClose?: () => void, mask?: boolean): Promise<any>

  event(e: any, content?: string): Promise<any>

  hide(): void
}

export const useToast = (): Toast => {
  const topview = useTopView()
  const topviewRef = useRef(topview)
  const toastRef = useRef<ToastContainer>()
  useEffect(() => {
    topviewRef.current = topview
  })
  return useMemo(() => {
    function notice(content: string, type: string, duration = 1.5, onClose: (() => void) | undefined, mask = false) {
      return topviewRef.current.show(props => (
        <ToastContainer
          ref={toastRef}
          content={content}
          duration={duration}
          onClose={() => {
            onClose && onClose()
          }}
          type={type}
          mask={mask}
          onAnimationEnd={() => {
            props.onDismiss(true)
          }}
        />
      ))
    }

    function show(content: string, duration?: number, mask?: boolean, onClose?: () => void) {
      return notice(content, 'info', duration, onClose, mask)
    }

    function info(content: string, duration?: number, onClose?: () => void, mask?: boolean) {
      return notice(content, 'info', duration, onClose, mask)
    }

    function success(content: string, duration?: number, onClose?: () => void, mask?: boolean) {
      return notice(content, 'success', duration, onClose, mask)
    }

    function fail(content: string, duration?: number, onClose?: () => void, mask?: boolean) {
      return notice(content, 'fail', duration, onClose, mask)
    }

    function offline(content: string, duration?: number, onClose?: () => void, mask?: boolean) {
      return notice(content, 'offline', duration, onClose, mask)
    }

    function loading(content: string, duration?: number, onClose?: () => void, mask?: boolean) {
      return notice(content, 'loading', duration, onClose, mask)
    }
    function hide() {
      toastRef.current && toastRef.current.close()
    }

    function event(e: any, content?: string) {
      const code = Number(e.code)
      if (code > 1000) {
        return notice(content || e.message || '获取数据失败', 'info', 1, null, false)
      }
    }
    return { show, offline, loading, fail, info, success, hide, event }
  }, [])
}
