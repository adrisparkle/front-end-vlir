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
            :filename="'DetallePresupProyecto'"
            :sheetname="'hoja1'"
            :fields="fields"
            class="boton_personalizado"
          >{{ $t('Descargar Excel') }}
          </vue-excel-xlsx>
        </div>
        <div class="flex xs12 lg12">
          <va-card>
            <div align="left"  v-for="data of formData" :key="'item' + data.codigo_proyecto">
              <div class="mb-4" style="padding-left: 25px">
                <p class="display-2">Detalle de gastos de presupuesto</p><br>
                <table>
                  <tr>
                    <td><p class="display-5" style="padding-right: 50px">{{'Nombre del proyecto: ' + data.nombre_proyecto}}</p></td>
                    <td><p class="display-5" style="padding-left: 50px">{{'Código del proyecto: ' + data.codigo_proyecto}}</p></td>
                  </tr>
                  <br>
                  <tr>
                    <td><p class="display-5" style="padding-right: 50px">{{'Cuenta: ' + data.cuenta}}</p></td>
                    <td><p class="display-5" style="padding-left: 50px">{{'Nombre de la cuenta: ' + data.nombre_cuenta}}</p></td>
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
                <va-button flat small color="info" @click="journal(props.rowData.acctcode)" class="ma-0">
                  {{ $t('tables.edit') }}
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
          label: 'FECHA',
          field: 'fecha',
        },
        {
          label: '# TRANSACCIÓN',
          field: 'numero_transaccion',
        },
        {
          label: '# LINEA',
          field: 'numero_linea',
        },
        {
          label: 'GLOSA',
          field: 'glosa',
        },
        {
          label: 'MONTO',
          field: 'monto',
        },
      ],
    }
  },
  computed: {
    fields () {
      return [{
        name: 'fecha',
        title: this.$t('FECHA'),
        width: '10%',
      }, {
        name: 'numero_transaccion',
        title: this.$t('# TRANSACCION'),
        width: '10%',
      }, {
        name: 'numero_linea',
        title: this.$t('# LINEA'),
        width: '10%',
      }, {
        name: 'glosa',
        title: this.$t('GLOSA'),
        width: '45%',
      }, {
        name: 'monto',
        title: this.$t('MONTO'),
        width: '10%',
      }]
    },
  },
  methods: {
    readItems: function () {
      this.isLoading = true
      this.items = this.$route.params
      axios.get('/ProjectInfoDetail/' + this.items.cuenta + '/' + this.items.proyecto + '/' + this.items.initDate + '/' + this.items.endDate)
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
      axios.get('/JournalReportHead/' + this.items.cuenta + '/' + this.items.proyecto)
        .then(response => {
          this.formData = response.data
        })
        .catch()
      setTimeout(() => {
        this.isLoading = false
      }, 2000)
    },
    journal: function (id) {
      console.log('hola we')
      router.push('/admin/showjournal/' + id)
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
