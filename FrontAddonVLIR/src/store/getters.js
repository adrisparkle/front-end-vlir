const config = state => state.app.config
const palette = state => state.app.config.palette
const isLoading = state => state.app.isLoading
const isLoggedIn = state => !!state.token
const authStatus = state => state.status

export {
  config,
  palette,
  isLoading,
  isLoggedIn,
  authStatus,
}
