<template>
  <va-dropdown
    class="profile-dropdown"
    v-model="isShown"
    boundary-body
    offset="0, 16px"
  >
    <span
      class="profile-dropdown__anchor" slot="anchor"
      :style="{color: this.$themes.primary}"
    >
      <slot/>
      <va-icon
        class="pa-1"
        :name="`fa ${isShown ? 'fa-angle-up' :'fa-angle-down'}`"
      />
    </span>
    <div class="profile-dropdown__content pl-2 pr-2 pt-2 pb-2" width="200px">
      <va-button flat color="danger" @click="logoutout">
        {{ $t('Cerrar sesión') }}
      </va-button>
    </div>
  </va-dropdown>
</template>

<script>
import router from '../../../../../router/index'
export default {
  name: 'profile-section',
  data () {
    return {
      isShown: false,
    }
  },
  props: {
    options: {
      type: Array,
      default: () => [
        {
          name: 'logout',
          redirectTo: '/login',
        },
      ],
    },
  },
  methods: {
    logoutout: function () {
      console.log('por lo menos si entra')
      this.$store.dispatch('logout')
        .then(() => {
          router.push('/')
        })
    },
  },
}
</script>

<style lang="scss">
.profile-dropdown {
  cursor: pointer;

  &__anchor {
    color: $vue-green;
  }
  .va-dropdown-popper__anchor {
    display: flex;
    justify-content: flex-end;
  }
  &__content {
    background-color: $dropdown-background;
    box-shadow: $gray-box-shadow;
    border-radius: .5rem;
    width: 8rem;
  }
  &__item {
    display: block;
    color: $vue-darkest-blue;

    &:hover, &:active {
      color: $vue-green;
    }
  }

  .va-dropdown__anchor {
    display: inline-block;
  }
}
</style>
