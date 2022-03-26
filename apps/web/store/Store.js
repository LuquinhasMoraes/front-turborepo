import { applySnapshot } from 'mobx-state-tree'
import { useMemo } from 'react'

import RootStore from './RootStore.tsx'

const isServer = typeof window === 'undefined'

let store

export function initializeStore (snapshot = null) {
  if (isServer || !store) {
    store = RootStore.create()
  }
  if (snapshot) applySnapshot(store, snapshot)

  if (isServer) return store

  window.store = store
  return store
}

export function useStore (initialState) {
  const _store = useMemo(() => initializeStore(initialState), [initialState])
  return _store
}