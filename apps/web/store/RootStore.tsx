import { types } from 'mobx-state-tree'
import AppStore from './AppStore'
import { ShoppingPageStore } from './ShoppingPageStore'

export const RootStore = types.compose(
  types
    .model('RootStore', {
      currentView: types.optional(ShoppingPageStore, {})
    })
    .actions(self => ({
      setCurrentView (view) {
        self.currentView = view
      }
    })),
    AppStore
)

export default RootStore
