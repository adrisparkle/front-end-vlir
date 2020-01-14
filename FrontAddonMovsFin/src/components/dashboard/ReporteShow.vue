<template>
  <div class="vld-parent">
    <loading :active.sync="isLoading"
             :is-full-page="true"></loading>
    <div class="lists">
      <va-card>
        <div align="center">
          <va-button color="info" :to="{ name: 'reportes' }">
            {{ $t('Volver al Inicio') }}
          </va-button>
              <vue-excel-xlsx
              :data="items"
              :columns="columns"
              :filename="'PresupProyecto'"
              :sheetname="'hoja1'"
              :fields="fields"
              class="boton_personalizado"
            >{{ $t('Descargar Excel') }}
              </vue-excel-xlsx>
        </div>
        <div class="flex xs12 lg12">
          <va-card>
            <div align="left"  v-for="data of formData" :key="'item' + data.id">
              <div class="mb-4" style="padding-left: 25px">
                <p class="display-2">Reporte de presupuesto</p><br>
                <table>
                  <tr>
                  <td><p class="display-5">{{'Nombre del proyecto: ' + data.proyecto_nombre}}</p></td>
                  <td style="padding-left: 100px"><p class="display-5">{{'Código del proyecto: ' + data.PROYECTO_CODIGO}}</p></td>
                  </tr>
                  <br>
                  <tr>
                    <td><p class="display-5">{{'Valido desde: ' + data.valido_desde}}</p></td>
                    <td style="padding-left: 100px"><p class="display-5">{{'Valido hasta: ' + data.valido_hasta}}</p></td>
                  </tr>
                  <br>
                  <tr>
                    <td><p class="display-5">{{'Unidad organizacional: ' + data.unidad_organizacional}}</p></td>
                    <td style="padding-left: 100px"><p class="display-5">{{'PEI/PO: ' + data.pei_po}}</p></td>
                  </tr>
                </table>
              </div>
            </div>
            <va-data-table
              :fields="fields"
              :data="items"
              :loading="loading"
              :totalPages="totalPages"
              :per-page="parseInt(perPage)"
              @page-selected="readItems"
              api-mode
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
        name: 'formatcode',
        title: this.$t('Cuenta'),
        width: '10%',
      }, {
        name: 'acctname',
        title: this.$t('nombre de cuenta'),
        width: '30%',
      }, {
        name: 'acctcode',
        title: this.$t('código de cuenta'),
        width: '20%',
      }, {
        name: 'dim1',
        title: this.$t('unidad organizacional'),
        width: '20%',
      }, {
        name: 'dim2',
        title: this.$t('pei/po'),
        width: '20%',
      }, {
        name: 'total_dim',
        title: this.$t('Monto presupuestado'),
        width: '20%',
      }, {
        name: 'ejecutado',
        title: this.$t('ejecutado'),
        width: '20%',
      }, {
        name: 'solicitado',
        title: this.$t('solicitado'),
        width: '20%',
      }, {
        name: 'comprometido',
        title: this.$t('comprometido'),
        width: '20%',
      }, {
        name: 'total_cuenta',
        title: this.$t('saldo de cuenta'),
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
      totalPages: 0,
      loading: false,
      perPage: '6',
      formData: [],
      toastText: '¡No se encuentran movimientos para este proyecto!',
      toastDuration: 2500,
      toastPosition: 'top-center',
      isToastFullWidth: true,
      columns: [
        {
          label: 'Cuenta',
          field: 'formatcode',
        },
        {
          label: 'NOMBRE DE CUENTA',
          field: 'acctname',
        },
        {
          label: 'CODIGO DE CUENTA SAP',
          field: 'acctcode',
        },
        {
          label: 'UNIDAD ORGANIZACIONAL',
          field: 'dim1',
        },
        {
          label: 'PEI/PO',
          field: 'dim2',
        },
        {
          label: 'MONTO DE PRESUPUESTO',
          field: 'total_dim',
        },
        {
          label: 'MONTO EJECUTADO',
          field: 'ejecutado',
        },
        {
          label: 'MONTO SOLICITADO',
          field: 'solicitado',
        },
        {
          label: 'MONTO COMPROMETIDO',
          field: 'comprometido',
        },
        {
          label: 'SALDO DE CUENTA',
          field: 'total_cuenta',
        },
      ],
    }
  },
  methods: {
    readItems: function () {
      this.isLoading = true
      this.items = this.$route.params
      axios.get('/ProjectInfo/' + this.items.id)
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
  .boton_personalizado{
    font-size: 18px;
    color: #ffffff;
    background-color: #40e583;
    border: 2px solid #40e583;
    border-radius: 20px;
    padding: 7.5px 25px;
  }
  .boton_personalizado:hover{
    color: #ffffff;
    background-color: rgba(64, 229, 131, 0.55);
  }
</style>
