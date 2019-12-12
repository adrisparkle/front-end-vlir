<template>
    <div class="vld-parent">
      <loading :active.sync="isLoading"
               :is-full-page="true"></loading>
  <div class="lists">
    <va-card class="flex xs12 lg12">
      <div class="row" v-for="data of formData" :key="'item' + data.id">
        <div class="flex xs12 lg12">
          <div align="center" class="buttons">
            <va-button color="info" :to="{ name: 'dashboard' }">
              {{ $t('Volver al Inicio') }}
            </va-button>
            <va-button color="warning" @click="volver(data.numero_solicitud)">
              {{ $t('Volver al mapa de relaciones') }}
            </va-button>
            <va-button color="success" @click="pago(data.numero_origen)">
              {{ $t('Volver a pago') }}
            </va-button>
          </div>
          <va-list fit class="mb-2">
            <va-list-label>
              {{ $t('Asiento contable') }}
            </va-list-label>
            <template>
              <table  width="100%" class="bla">
                <tr>
                  <td align="right" class="bla">
                    <b># Asiento: </b>
                  </td>
                  <td class="bla">
                    {{ data.numero_asiento }}
                  </td>
                  <td class="bla" align="right">
                    <b>Serie: </b>
                  </td>
                  <td class="bla">
                    {{ data.serie }}
                  </td>
                </tr>
                <tr>
                  <td align="right" class="bla">
                    <b># Transacción: </b>
                  </td>
                  <td class="bla">
                    {{ data.numero_transaccion }}
                  </td>
                  <td class="bla" align="right">
                    <b># Origen </b>
                  </td>
                  <td class="bla">
                    {{ data.numero_origen }}
                  </td>
                </tr>
                <tr>
                  <td align="right" class="bla">
                    <b>Fecha Contabilización: </b>
                  </td>
                  <td class="bla">
                    {{ data.fecha_contabilizacion }}
                  </td>
                  <td class="bla" align="right">
                    <b>Fecha Vencimiento:</b>
                  </td>
                  <td class="bla">
                    {{ data.fecha_valida }}
                  </td>
                </tr>
                <tr>
                  <td align="right" class="bla">
                    <b>Fecha Documento: </b>
                  </td>
                  <td class="bla">
                    {{ data.fecha_documento }}
                  </td>
                  <td class="bla" align="right">
                    <b>Comentario: </b>
                  </td>
                  <td class="bla">
                    {{ data.comentario }}
                  </td>
                </tr>
                <tr>
                  <td align="right" class="bla">
                    <b>Referencia 1: </b>
                  </td>
                  <td class="bla">
                    {{ data.referencia1 }}
                  </td>
                  <td class="bla" align="right">
                    <b>Referencia 2: </b>
                  </td>
                  <td class="bla">
                    {{ data.referencia2 }}
                  </td>
                </tr>
              </table>
            </template>
          </va-list>
        </div>
      </div>
      <div class="flex xs12 lg12">
        <va-card>
          <va-list-label>
            {{ $t('Detalle de la factura') }}
          </va-list-label>
          <va-data-table
            :fields="fields"
            :data="items"
            :loading="loading"
            :totalPages="totalPages"
            :per-page="parseInt(perPage)"
            @page-selected="readItems"
            api-mode
          >
            <template slot="actions" slot-scope="props">
              <va-button flat small color="blue" icon="fa fa-plus"
                         @click="see(props.rowData.id)">
                {{ $t('icons.mas_info') }}
              </va-button>
            </template>
            <template slot="prueba" slot-scope="props">
              <va-button flat small color="orange" icon="fa fa-plus"
                         @click="select(props.rowData)">
                {{ $t('icons.mas_info') }}
              </va-button>
            </template>
          </va-data-table>
        </va-card>
      </div>
    </va-card>
  </div>
    </div>
</template>
<script>
import axios from 'axios'
import VaCard from 'vuestic-ui/src/components/vuestic-components/va-card/VaCard'
import router from '../../router/index'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
  components: { VaCard, Loading },
  computed: {
    fields () {
      return [{
        name: 'cuenta',
        title: this.$t('Cuenta'),
        width: '15%',
      }, {
        name: 'nombre_cuenta',
        title: this.$t('Nombre de cuenta'),
        width: '30%',
      }, {
        name: 'referencia1',
        title: this.$t('Referencia 1'),
        width: '20%',
      }, {
        name: 'referencia2',
        title: this.$t('Referencia 2'),
        width: '20%',
      }, {
        name: 'referencia3',
        title: this.$t('Referencia 3'),
        width: '20%',
      }, {
        name: 'proyecto',
        title: this.$t('Proyecto'),
        width: '20%',
      }, {
        name: 'comentario',
        title: this.$t('Comentario'),
        width: '20%',
      }, {
        name: 'cuenta_mayor',
        title: this.$t('Cuenta Mayor'),
        width: '20%',
      }, {
        name: 'codigo_cuenta',
        title: this.$t('Codigo de cuenta'),
        width: '20%',
      }, {
        name: 'cuenta_oficial',
        title: this.$t('Cuenta Oficial'),
        width: '20%',
      }, {
        name: 'debito_bs',
        title: this.$t('Debito'),
        width: '20%',
      }, {
        name: 'credito_bs',
        title: this.$t('Credito'),
        width: '20%',
      }, {
        name: 'debito_ms',
        title: this.$t('Debito $'),
        width: '20%',
      }, {
        name: 'credito_ms',
        title: this.$t('Credito $'),
        width: '20%',
      }]
    },
  },
  data () {
    return {
      isLoading: false,
      fullPage: true,
      page: 1,
      items: [],
      loading: false,
      perPage: '6',
      formData: {
        id: null,
      },
    }
  },
  methods: {
    doAjax () {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 3000)
    },
    init: function () {
      this.formData = this.$route.params
      axios.get('/AccountEntry/' + this.formData.id)
        .then(response => {
          this.formData = response.data
        })
        .catch()
    },
    readItems: function () {
      this.items = this.$route.params
      axios.get('/AccountEntryDetail/' + this.items.id)
        .then(response => {
          this.items = response.data
        })
        .catch()
    },
    volver: function (id) {
      router.push('../relaciones/' + id)
    },
    pago: function (id) {
      router.push('../pago/' + id)
    },
  },
  created () {
    this.doAjax()
    this.init()
    this.readItems()
  },
}
</script>

  <style lang="scss">
  .bla{
    padding: 10px !important;
  }
</style>
