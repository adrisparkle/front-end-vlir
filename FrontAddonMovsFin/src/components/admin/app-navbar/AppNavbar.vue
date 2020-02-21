<template>
  <va-navbar class="app-navbar">
    <template>
      <div align="left"><b><font color="#ff8c00">REPORTE DE PRESUPUESTACIÓN DE PROYECTOS</font></b></div>
    </template>
    <div class="app-navbar__actions row flex-nowrap align--right">
      <profile-dropdown class="va-navbar__item">
        <span>{{user}}</span>
      </profile-dropdown>
    </div>
  </va-navbar>
</template>

<script>
import VaIconVuestic
  from 'vuestic-ui/src/components/vuestic-components/va-icon/va-iconset/VaIconVuestic'
import HeaderSelector from './components/HeaderSelector'
import ProfileDropdown from './components/dropdowns/ProfileDropdown'

export default {
  name: 'app-navbar',
  components: {
    VaIconVuestic,
    HeaderSelector,
    ProfileDropdown,
  },
  props: {
    minimized: {
      type: Boolean,
      required: true,
    },
  },
  data () {
    return {
      userName: 'USUARIO',
    }
  },
  computed: {
    minimizedProxy: {
      get () {
        return this.minimized
      },
      set (minimized) {
        this.$emit('update:minimized', minimized)
      },
    },
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    },
    user: function () {
      return this.$store.getters.user
    },
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('login')
        })
    },
  },
}
</script>
<style lang="scss">
.app-navbar {
  &__button {
    width: 10.8125rem;
    .va-button__content__icon-left.fa-github {
      font-size: 1.5rem;
    }
  }
  &__actions {
    justify-content: flex-end;
  }
  &__mailto-link:hover {
    filter: brightness(85%);
  }
  @include media-breakpoint-down(lg) {
    &__button {
      display: none !important;
    }
    .profile-dropdown {
      margin: auto 0 auto .75rem;
    }
  }
  @include media-breakpoint-down(md) {
    @at-root .va-navbar__text {
      display: none !important;
    }
  }
  @include media-breakpoint-down(sm) {
    &__button {
      display: none !important;
    }
    &__actions {
      justify-content: space-around;
      padding: 0 .5rem;
    }
    .profile-dropdown {
      position: absolute;
      right: .75rem;
      top: 1.25rem;
      height: fit-content;
      margin: auto;
    }
  }
}
</style>
