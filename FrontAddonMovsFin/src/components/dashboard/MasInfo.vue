<template>
  <div class="vld-parent">
    <loading :active.sync="isLoading"
             :is-full-page="true"></loading>
  <va-card :title="$t('Mapa de relaciones')">
    <div v-if="solicitud1!=''">
      <div class="flex xs12 lg12">
        <div align="center" class="buttons">
          <va-button color="info" :to="{ name: 'dashboard' }">
            {{ $t('Volver al Inicio') }}
          </va-button>
        </div>
        <va-list fit class="mb-2">
          <va-card
            no-padding-h
            style="overflow-x: auto"
            class="timelines__horizontal-long"
          >
            <va-timeline align-top style="max-width: 120px;" class="timelines__horizontal-long__timeline">
              <va-timeline-item active align="center" v-if="solicitud1!=''">
                <template slot="before">
                  <div
                    class="title text--center"
                    :style="{color: $themes.info}"
                  >
                    Solicitud de compra
                  </div>
                </template>
                <va-card
                  slot="after"
                  stripe="warning"
                  class="mb-0"
                  v-for="sol of solicitud1"
                  :key="'item' + sol.numero_solicitud"
                  v-if="sol.estado=='N'"
                >
                  <template slot="title"></template>
                  <b>N° Doc: </b>{{ sol.numero_solicitud }}<br>
                  <b>Fecha: </b>{{ sol.fecha_solicitud }}<br>
                  <va-button flat small color="blue" icon="fa fa-plus" @click="solicitud(sol.numero_solicitud)">
                    {{ $t('Ver detalle') }}
                  </va-button>
                </va-card>
                <va-card
                  slot="after"
                  stripe="danger"
                  class="mb-0"
                  v-for="sol of solicitud1"
                  :key="'item' + sol.numero_solicitud"
                  v-else
                >
                  <template slot="title"></template>
                  <b>N° Doc: </b>{{ sol.numero_solicitud }}<br>
                  <b>Fecha: </b>{{ sol.fecha_solicitud }}<br>
                  <va-button flat small color="blue" icon="fa fa-plus" @click="solicitud(sol.numero_solicitud)">
                    {{ $t('Ver detalle') }}
                  </va-button>
                </va-card>
              </va-timeline-item>
              <va-timeline-item active align="center" v-if="oferta1!=''">
                <template slot="before">
                  <div
                    class="title text--center"
                    :style="{color: $themes.info}"
                  >
                    Oferta de compra
                  </div>
                </template>
                <va-card
                  slot="after"
                  stripe="warning"
                  class="mb-0"
                  v-for="ofe of oferta1"
                  :key="'item' + ofe.numero_solicitud"
                  v-if="ofe.estado=='N'"
                >
                  <template slot="title"></template>
                  <b>N° Doc: </b>{{ ofe.numero_oferta }}<br>
                  <b>Fecha: </b>{{ ofe.fecha_oferta }}<br>
                  <va-button flat small color="blue" icon="fa fa-plus" @click="oferta(ofe.numero_oferta)">
                    {{ $t('Ver detalle') }}
                  </va-button>
                </va-card>
                <va-card
                  slot="after"
                  stripe="danger"
                  class="mb-0"
                  v-for="ofe of oferta1"
                  :key="'item' + ofe.numero_solicitud"
                  v-else
                >
                  <template slot="title"></template>
                  <b>N° Doc: </b>{{ ofe.numero_oferta }}<br>
                  <b>Fecha: </b>{{ ofe.fecha_oferta }}<br>
                  <va-button flat small color="blue" icon="fa fa-plus" @click="oferta(ofe.numero_oferta)">
                    {{ $t('Ver detalle') }}
                  </va-button>
                </va-card>
              </va-timeline-item>
              <va-timeline-item active align="center" v-if="pedido1!=''">
                <template slot="before">
                  <div
                    class="title text--center"
                    :style="{color: $themes.info}"
                  >
                    Pedido
                  </div>
                </template>
                <va-card
                  slot="after"
                  stripe="warning"
                  class="mb-0"
                  v-for="ped of pedido1" :key="'item' + ped.numero_solicitud"
                  v-if="ped.estado=='N'"
                >
                  <template slot="title"></template>
                  <b>N° Doc: </b>{{ ped.numero_pedido }}<br>
                  <b>Fecha: </b>{{ ped.fecha_pedido }}<br>
                  <va-button flat small color="blue" icon="fa fa-plus" @click="pedido(ped.numero_pedido)">
                    {{ $t('Ver detalle') }}
                  </va-button>
                </va-card>
                <va-card
                  slot="after"
                  stripe="danger"
                  class="mb-0"
                  v-for="ped of pedido1" :key="'item' + ped.numero_solicitud"
                  v-else
                >
                  <template slot="title"></template>
                  <b>N° Doc: </b>{{ ped.numero_pedido }}<br>
                  <b>Fecha: </b>{{ ped.fecha_pedido }}<br>
                  <va-button flat small color="blue" icon="fa fa-plus" @click="pedido(ped.numero_pedido)">
                    {{ $t('Ver detalle') }}
                  </va-button>
                </va-card>
              </va-timeline-item>
              <va-timeline-item active align="center" v-if="mercancia1!=''">
                <template slot="before">
                  <div
                    class="title text--center"
                    :style="{color: $themes.info}"
                  >
                    Ingreso de mercancia
                  </div>
                </template>
                <va-card
                  slot="after"
                  stripe="warning"
                  class="mb-0"
                  v-for="mer of mercancia1" :key="'item' + mer.numero_solicitud"
                  v-if="mer.estado=='N'"
                >
                  <template slot="title"></template>
                  <b>N° Doc: </b>{{ mer.numero_mercancia }}<br>
                  <b>Fecha: </b>{{ mer.fecha_mercancia }}<br>
                  <va-button flat small color="blue" icon="fa fa-plus" @click="mercancia(mer.numero_mercancia)">
                    {{ $t('Ver detalle') }}
                  </va-button>
                </va-card>
                <va-card
                  slot="after"
                  stripe="danger"
                  class="mb-0"
                  v-for="mer of mercancia1" :key="'item' + mer.numero_solicitud"
                  v-else
                >
                  <template slot="title"></template>
                  <b>N° Doc: </b>{{ mer.numero_mercancia }}<br>
                  <b>Fecha: </b>{{ mer.fecha_mercancia }}<br>
                  <va-button flat small color="blue" icon="fa fa-plus" @click="mercancia(mer.numero_mercancia)">
                    {{ $t('Ver detalle') }}
                  </va-button>
                </va-card>
              </va-timeline-item>
              <va-timeline-item active align="center" v-if="factura1!=''">
                <template slot="before">
                  <div
                    class="title text--center"
                    :style="{color: $themes.info}"
                  >
                    Factura de proveedores
                  </div>
                </template>
                <va-card
                  slot="after"
                  stripe="warning"
                  class="mb-0"
                  v-for="fac of factura1" :key="'item' + fac.numero_solicitud"
                  v-if="fac.estado=='N'"
                >
                  <template slot="title"></template>
                  <b>N° Doc: </b>{{ fac.numero_factura }}<br>
                  <b>Fecha: </b>{{ fac.fecha_factura }}<br>
                  <va-button flat small color="blue" icon="fa fa-plus" @click="factura(fac.numero_factura)">
                    {{ $t('Ver detalle') }}
                  </va-button>
                </va-card>
                <va-card
                  slot="after"
                  stripe="danger"
                  class="mb-0"
                  v-for="fac of factura1" :key="'item' + fac.numero_solicitud"
                  v-else
                >
                  <template slot="title"></template>
                  <b>N° Doc: </b>{{ fac.numero_factura }}<br>
                  <b>Fecha: </b>{{ fac.fecha_factura }}<br>
                  <va-button flat small color="blue" icon="fa fa-plus" @click="factura(fac.numero_factura)">
                    {{ $t('Ver detalle') }}
                  </va-button>
                </va-card>
              </va-timeline-item>
              <va-timeline-item active align="center" v-if="pago1!=''">
                <template slot="before">
                  <div
                    class="title text--center"
                    :style="{color: $themes.info}"
                  >
                    Pagos efectuados
                  </div>
                </template>
                <va-card
                  slot="after"
                  stripe="warning"
                  class="mb-0"
                  v-for="pag of pago1" :key="'item' + pag.numero_solicitud"
                  v-if="pag.estado=='N'"
                >
                  <template slot="title"></template>
                  <b>N° Doc: </b>{{ pag.numero_pago }}<br>
                  <b>Fecha: </b>{{ pag.fecha_pago }}<br>
                  <va-button flat small color="blue" icon="fa fa-plus" @click="pago(pag.numero_pago)">
                    {{ $t('Ver detalle') }}
                  </va-button>
                </va-card>
                <va-card
                  slot="after"
                  stripe="danger"
                  class="mb-0"
                  v-for="pag of pago1" :key="'item' + pag.numero_solicitud"
                  v-else
                >
                  <template slot="title"></template>
                  <b>N° Doc: </b>{{ pag.numero_pago }}<br>
                  <b>Fecha: </b>{{ pag.fecha_pago }}<br>
                  <va-button flat small color="blue" icon="fa fa-plus" @click="pago(pag.numero_pago)">
                    {{ $t('Ver detalle') }}
                  </va-button>
                </va-card>
              </va-timeline-item>
            </va-timeline>
          </va-card>
        </va-list>
      </div>
    </div>
  </va-card>
  </div>
</template>
<script>
import axios from 'axios'
import router from '../../router/index'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
  data () {
    return {
      isLoading: false,
      fullPage: true,
      solicitud1: {
        numero_solicitud: null,
      },
      oferta1: {
        numero_solicitud: null,
      },
      pedido1: {
        numero_solicitud: null,
      },
      mercancia1: {
        numero_solicitud: null,
      },
      factura1: {
        numero_solicitud: null,
      },
      pago1: {
        numero_solicitud: null,
      },
    }
  },
  components: {
    Loading,
  },
  methods: {
    request: function () {
      this.isLoading = true
      this.solicitud1 = this.$route.params
      axios.get('/solicitud/' + this.solicitud1.id)
        .then(response => {
          this.solicitud1 = response.data
        })
        .catch()
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    },
    quotation: function () {
      this.isLoading = true
      this.oferta1 = this.$route.params
      axios.get('/oferta/' + this.oferta1.id)
        .then(response => {
          this.oferta1 = response.data
        })
        .catch()
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    },
    order: function () {
      this.isLoading = true
      this.pedido1 = this.$route.params
      axios.get('/pedido/' + this.pedido1.id)
        .then(response => {
          this.pedido1 = response.data
        })
        .catch()
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    },
    merchandise: function () {
      this.isLoading = true
      this.mercancia1 = this.$route.params
      axios.get('/mercancia/' + this.mercancia1.id)
        .then(response => {
          this.mercancia1 = response.data
        })
        .catch()
      setTimeout(() => {
        this.isLoading = false
      }, 2000)
    },

    check: function () {
      this.isLoading = true
      this.factura1 = this.$route.params
      axios.get('/factura/' + this.factura1.id)
        .then(response => {
          this.factura1 = response.data
        })
        .catch()
      setTimeout(() => {
        this.isLoading = false
      }, 2000)
    },
    payment: function () {
      this.isLoading = true
      this.pago1 = this.$route.params
      axios.get('/pago/' + this.pago1.id)
        .then(response => {
          this.pago1 = response.data
        })
        .catch()
      setTimeout(() => {
        this.isLoading = false
      }, 2000)
    },
    solicitud: function (id) {
      router.push('../solicitud/' + id)
    },
    oferta: function (id) {
      router.push('../oferta/' + id)
    },
    pedido: function (id) {
      router.push('../pedido/' + id)
    },
    mercancia: function (id) {
      router.push('../mercancia/' + id)
    },
    factura: function (id) {
      router.push('../factura/' + id)
    },
    pago: function (id) {
      router.push('../pago/' + id)
    },
  },
  created () {
    this.request()
    this.quotation()
    this.order()
    this.merchandise()
    this.check()
    this.payment()
  },
}
</script>
<style lang="scss">
  .bla{
    padding: 10px !important;
  }
  .spinners {
    &__size {
      &-smaller, &-bigger {
        width: 40px;
        text-align: center;
        font-weight: 600;
      }

      &-smaller {
        font-size: 1rem;
      }

      &-bigger {
        font-size: 1.3rem;
      }
    }

    &__duration {
      &-slower, &-faster {
        transform: translateY(-1px);
      }
    }

    .spinner-box {
      height: 140px
    }
    .bla{
      padding-left: 10px;
      padding-right: 10px;
    }
  }
</style>
