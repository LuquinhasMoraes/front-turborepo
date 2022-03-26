import { types } from 'mobx-state-tree'

const AppStore = types
  .model('AppStore', {
    isLoading: types.optional(types.boolean, false),
  })
  .actions(self => ({
    setLoading: (value) => {
        self.isLoading = value
    }
  }))

export default AppStore
