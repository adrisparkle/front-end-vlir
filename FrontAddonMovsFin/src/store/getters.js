const config = state => state.app.config
const palette = state => state.app.config.palette
const isLoading = state => state.app.isLoading
const isLoggedIn = state => !!state.app.token
const authStatus = state => state.app.status

export {
  config,
  palette,
  isLoading,
  isLoggedIn,
  authStatus,
}
