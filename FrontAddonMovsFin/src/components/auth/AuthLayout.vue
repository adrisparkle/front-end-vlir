<template>
<div class="auth-layout row align-content--center">
  <loading :active.sync="isLoading"
           :is-full-page="true"></loading>
  <div class="flex xs12 pa-3">
    <div class="d-flex justify--center">
      <va-card class="auth-layout__card">
        <div class="flex xs12 pa-3 flex-center">
          <img src="colores-horizontal-LP.jpg" width="200">
        </div>
        <va-tabs
          v-model="tabIndex"
          center
        >
          <va-tab>{{ $t('auth.login') }}</va-tab>
        </va-tabs>

        <va-separator/>

        <div class="pa-3">
          <form @submit.prevent="login">
            <va-input
              v-model="email"
              type="email"
              :label="$t('auth.email')"
            />

            <va-input
              v-model="password"
              type="password"
              :label="$t('auth.password')"
            />
            <div class="d-flex justify--center mt-3">
              <va-button type="submit" class="my-0">{{ $t('auth.login') }}</va-button>
            </div>
          </form>
        </div>
      </va-card>
    </div>
  </div>
</div>
</template>

<script>
import VaIconVuestic from 'vuestic-ui/src/components/vuestic-components/va-icon/va-iconset/VaIconVuestic'
import Loading from 'vue-loading-overlay'
const tabs = [
  'login',
]
export default {
  name: 'AuthLayout',
  components: { VaIconVuestic, Loading },
  data () {
    return {
      isLoading: false,
      selectedTabIndex: 0,
      tabTitles: ['login', 'createNewAccount'],
      email: '',
      password: '',
    }
  },
  computed: {
    tabIndex: {
      set (tabIndex) {
        this.$router.push({ name: tabs[tabIndex] })
      },
      get () {
        return tabs.indexOf(this.$route.name)
      },
    },
  },
  methods: {
    login: function () {
      this.isLoading = true
      let email = this.email
      let password = this.password
      this.$store.dispatch('login', { email, password })
        .then(() => this.$router.push('../admin/reportes/'))
        .catch(err => console.log(err))
      setTimeout(() => {
        this.isLoading = false
      }, 10000)
    },
  },
}
</script>

<style lang="scss">
.auth-layout {
  min-height: 100vh;
  background-image: linear-gradient(to right, #ffcb1a, #0e095d);
 // background: #0e095d;
  &__card {
    width: 100%;
    max-width: 600px;
  }

  &__options {
    @include media-breakpoint-down(xs) {
      flex-direction: column;
    }
  }
}
</style>
