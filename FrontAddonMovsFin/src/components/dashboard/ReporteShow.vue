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
            <div align="left"  v-for="data of formData" :key="'item' + data.acctcode">
              <div class="mb-4" style="padding-left: 25px">
                <p class="display-2">Reporte de presupuesto</p><br>
                <table>
                  <tr>
                  <td><p class="display-5" style="padding-right: 50px">{{'Nombre del proyecto: ' + data.proyecto_nombre}}</p></td>
                    <td><p class="display-5" style="padding-left: 50px">{{'Valido desde: ' + data.valido_desde}}</p></td>
                  </tr>
                  <br>
                  <tr>
                    <td><p class="display-5" style="padding-right: 50px">{{'Código del proyecto: ' + data.PROYECTO_CODIGO}}</p></td>
                    <td><p class="display-5" style="padding-left: 50px">{{'Valido hasta: ' + data.valido_hasta}}</p></td>
                  </tr>
                  <br>
                  <tr>
                    <td><p class="display-5" style="padding-right: 50px">{{'Regional: ' + data.regional}}</p></td>
                    <td><p class="display-5" style="padding-left: 50px">{{'PEI/PO: ' + data.pei_po}}</p></td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="flex xs12 md2 offset--md10">
              <va-select
                v-model="perPage"
                :label="$t('tables.perPage')"
                :options="perPageOptions"></va-select>
            </div>
            <va-data-table
              :fields="fields"
              :data="items"
              :per-page="parseInt(perPage)"
              :loading="loading"
            >
              <template slot="actions" slot-scope="props">
                <va-button flat small color="info" @click="journal(props.rowData.ACCTCODE, props.rowData.PrjCode, fecha1, fecha2)" class="ma-0">
                  {{ $t('Detalle') }}
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
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import VaAccordion from 'vuestic-ui/src/components/vuestic-components/va-collapse/VaAccordion'
import VaCollapse from 'vuestic-ui/src/components/vuestic-components/va-collapse/VaCollapse'
import VaButton from 'vuestic-ui/src/components/vuestic-components/va-button/VaButton'
import router from '../../router/index'
export default {
  components: { VaButton, VaCollapse, VaAccordion, VaCard, Loading },
  data () {
    return {
      fecha1: '',
      fecha2: '',
      isLoading: false,
      fullPage: true,
      page: 1,
      perPage: '10',
      perPageOptions: ['5', '10', '15', '20', '50', '100'],
      items: [],
      totalPages: 0,
      loading: false,
      formData: [],
      toastText: '¡No se encuentran movimientos para este proyecto!',
      toastDuration: 2500,
      toastPosition: 'top-center',
      isToastFullWidth: true,
      columns: [
        {
          label: 'FORMATCODE',
          field: 'FORMATCODE',
        },
        {
          label: 'ACCTCODE',
          field: 'ACCTCODE',
        },
        {
          label: 'ACCTNAME',
          field: 'ACCTNAME',
        },
        {
          label: 'DIM1',
          field: 'DIM1',
        },
        {
          label: 'DIM2',
          field: 'DIM2',
        },
        {
          label: 'TOTAL_CUENTA',
          field: 'TOTAL_CUENTA',
        },
        {
          label: 'TOTAL_DIM',
          field: 'TOTAL_DIM',
        },
        {
          label: 'SOLICITADO',
          field: 'SOLICITADO',
        },
        {
          label: 'COMPROMETIDO',
          field: 'COMPROMETIDO',
        },
        {
          label: 'EJECUTADO',
          field: 'EJECUTADO',
        },
        {
          label: 'SUCURSAL',
          field: 'SUCURSAL',
        },
        {
          label: 'PrjCode',
          field: 'PrjCode',
        },
        {
          label: 'PrjName',
          field: 'PrjName',
        },
      ],
    }
  },
  computed: {
    fields () {
      return [{
        name: 'FORMATCODE',
        title: this.$t('Cuenta'),
        width: '10%',
      }, {
        name: 'ACCTNAME',
        title: this.$t('Nombre de la cuenta'),
        width: '35%',
      }, {
        name: 'SOLICITADO',
        title: this.$t('Presupuesto solicitado'),
        width: '10%',
      }, {
        name: 'EJECUTADO',
        title: this.$t('Presupuesto Ejecutado'),
        width: '10%',
      }, {
        name: '__slot:actions',
        title: this.$t('tables.headings.acciones'),
        width: '10%',
      }]
    },
  },
  methods: {
    readItems: function () {
      this.isLoading = true
      this.items = this.$route.params
      this.fecha1 = this.items.initDate
      this.fecha2 = this.items.endDate
      axios.get('/ProjectInfo/' + this.items.id + '/' + this.items.initDate)
        .then(response => {
          this.items = response.data
        })
        .catch()
      setTimeout(() => {
        this.isLoading = false
      }, 4000)
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
      }, 4000)
    },
    journal: function (cuenta, proyecto, initDate, endDate) {
      console.log('/admin/showjournal/' + cuenta + '/' + proyecto + '/' + initDate + '/' + endDate)
      router.push('/admin/showjournal/' + cuenta + '/' + proyecto + '/' + initDate + '/' + endDate)
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
    background-color: rgba(135, 229, 10, 0.63);
    border: 2px solid rgba(135, 229, 10, 0.63);
    border-radius: 20px;
    padding: 7.5px 25px;
  }
  .boton_personalizado:hover{
    color: #ffffff;
    background-color: rgba(64, 229, 131, 0.55);
  }
</style>
