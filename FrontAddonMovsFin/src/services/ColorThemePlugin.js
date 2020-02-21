const getDefaultOptions = () => ({
  themes: {
    primary: '#ea9a12',
    secondary: '#0a1b42',
    success: '#87e726',
    info: '#1471ff',
    danger: '#ff0900',
    warning: '#ffcb1a',
    gray: '#7a777a',
    dark: '#141429',
  },
})

export const ColorThemePlugin = {
  install (Vue, options) {
    const defaultOptions = getDefaultOptions()

    if (options && options.themes) {
      Object.assign(defaultOptions.themes, options.themes)
    }

    Vue.prototype.$themes = defaultOptions.themes

    /* eslint-disable no-new */
    // This line is just to make themes reactive
    new Vue({ data: { themes: Vue.prototype.$themes } })
  },
}

export const ColorThemeMixin = {
  data () {
    return {
      colorThemeDefault: 'primary',
      colorDefault: '#000000',
    }
  },
  props: {
    color: {
      type: String,
    },
  },
  computed: {
    // This allows a multitude of defaults.
    // theme color => color => theme default => hard default
    colorComputed () {
      if (this.$themes && this.$themes[this.color]) {
        return this.$themes[this.color]
      }
      if (this.color) {
        return this.color
      }
      if (this.$themes && this.$themes[this.colorThemeDefault]) {
        return this.$themes[this.colorThemeDefault]
      }
      return this.colorDefault
    },
  },
}
