<template>
  <div class="vld-parent">
    <loading :active.sync="isLoading"
             :is-full-page="true"></loading>
    <div class="lists">
      <va-card>
        <div align="center">
          <va-button color="info" :to="{ name: 'reportevlir' }">
            {{ $t('Volver al Inicio') }}
          </va-button>
          <vue-excel-xlsx
            :data="items"
            :columns="columns"
            :filename="'VLIRProyecto'"
            :sheetname="'hoja1'"
            :fields="fields"
            class="boton_personalizado"
          >
            {{ $t('Descargar Excel') }}
          </vue-excel-xlsx>
        </div>
        <div class="flex xs12 lg12">
          <va-card>
            <div align="left"  v-for="data of formData" :key="'item' + data.acctcode">
              <div class="mb-4" style="padding-left: 25px">
                <p class="display-2">Reporte de presupuesto</p><br>
                <table>
                  <tr>
                    <td><p class="display-5" style="padding-right: 50px">{{'Nombre del proyecto: ' + data.proyecto_nombre}}</p></td>
                    <td><p class="display-5" style="padding-left: 50px">{{'Código del proyecto: ' + data.PROYECTO_CODIGO}}</p></td>
                  </tr>
                  <br>
                  <tr>
                    <td><p class="display-5" style="padding-right: 50px">{{'Valido desde: ' + data.valido_desde}}</p></td>
                    <td><p class="display-5" style="padding-left: 50px">{{'Valido hasta: ' + data.valido_hasta}}</p></td>
                  </tr>
                  <br>
                  <tr>
                    <td><p class="display-5" style="padding-right: 50px">{{'Unidad organizacional: ' + data.unidad_organizacional}}</p></td>
                    <td><p class="display-5" style="padding-left: 50px">{{'PEI/PO: ' + data.pei_po}}</p></td>
                  </tr>
                </table>
              </div>
            </div>
            <va-data-table
              :fields="fields"
              :data="items"
              :per-page="parseInt(perPage)"
              :loading="loading"
            >
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
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
  components: { VaCard, Loading },
  computed: {
    fields () {
      return [{
        name: 'cuenta',
        title: this.$t('cuenta'),
        width: '15%',
        sortField: 'cuenta',
        fontColor: '#ffffff',
      }, {
        name: 'nombre_cuenta',
        title: this.$t('nombre cuenta'),
        width: '20%',
      }, {
        name: 'fecha',
        title: this.$t('fecha'),
        width: '10%',
        sortField: 'fecha',
      }, {
        name: 'numero_comprobante',
        title: this.$t('# comprobante'),
        width: '10%',
      }, {
        name: 'numero_transaccion',
        title: this.$t('# transaccion'),
        width: '10%',
      }, {
        name: 'linea_transaccion',
        title: this.$t('# linea'),
        width: '10%',
      }, {
        name: 'referencia',
        title: this.$t('referencia'),
        width: '10%',
      }, {
        name: 'descripcion',
        title: this.$t('descripcion'),
        width: '20%',
      }, {
        name: 'monto_total',
        title: this.$t('monto total'),
        width: '10%',
        sortField: 'monto_total',
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
      columns: [
        {
          label: 'sucursal',
          field: 'sucursal',
        },
        {
          label: 'codigo_proyecto',
          field: 'codigo_proyecto',
        },
        {
          label: 'cuenta',
          field: 'cuenta',
        },
        {
          label: 'nombre_cuenta',
          field: 'nombre_cuenta',
        },
        {
          label: 'fecha',
          field: 'fecha',
        },
        {
          label: 'numero_comprobante',
          field: 'numero_comprobante',
        },
        {
          label: 'numero_transaccion',
          field: 'numero_transaccion',
        },
        {
          label: 'linea_transaccion',
          field: 'linea_transaccion',
        },
        {
          label: 'referencia',
          field: 'referencia',
        },
        {
          label: 'descripcion',
          field: 'descripcion',
        },
        {
          label: 'debe',
          field: 'debe',
        },
        {
          label: 'haber',
          field: 'haber',
        },
        {
          label: 'monto_total',
          field: 'monto_total',
        },
      ],
    }
  },
  methods: {
    readItems: function () {
      this.isLoading = true
      this.items = this.$route.params
      axios.get('/ProjectVLIRInfo/' + this.items.id)
        .then(response => {
          this.items = response.data
        })
        .catch()
      setTimeout(() => {
        this.isLoading = false
      }, 2000)
    },
    init: function () {
      this.isLoading = true
      this.formData = this.$route.params
      axios.get('/ProjectName/' + this.formData.id)
        .then(response => {
          this.formData = response.data
        })
        .catch()
      setTimeout(() => {
        this.isLoading = false
      }, 2000)
    },
  },
  created () {
    this.readItems()
    this.init()
  },
}
</script>
<style lang="scss">
  .bla{
    padding: 10px !important;
  }
</style>
