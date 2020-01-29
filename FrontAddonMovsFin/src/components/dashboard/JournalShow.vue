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
      perPage: '5',
      perPageOptions: ['5', '10', '15', '20'],
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
          field: 'trans_id',
        },
        {
          label: '# LINEA',
          field: 'line_id',
        },
        {
          label: 'GLOSA',
          field: 'memo',
        },
        {
          label: 'DEBE',
          field: 'Debit',
        },
        {
          label: 'HABER',
          field: 'Credit',
        },
        {
          label: 'TOTAL',
          field: 'total',
        },
        {
          label: 'CUENTA',
          field: 'cuenta',
        },
        {
          label: 'UNIDAD ORGANIZACIONAL',
          field: 'unidad_organizacional',
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
        name: 'trans_id',
        title: this.$t('# TRANSACCION'),
        width: '10%',
      }, {
        name: 'line_id',
        title: this.$t('# LINEA'),
        width: '10%',
      }, {
        name: 'memo',
        title: this.$t('GLOSA'),
        width: '45%',
      }, {
        name: 'Debit',
        title: this.$t('DEBE'),
        width: '10%',
      }, {
        name: 'Credit',
        title: this.$t('HABER'),
        width: '10%',
      }, {
        name: 'total',
        title: this.$t('TOTAL'),
        width: '10%',
      }, {
        name: 'cuenta',
        title: this.$t('CUENTA'),
        width: '10%',
      }, {
        name: 'unidad_organizacional',
        title: this.$t('UNIDAD ORGANIZACIONAL'),
        width: '10%',
      }]
    },
  },
  methods: {
    readItems: function () {
      this.isLoading = true
      this.items = this.$route.params
      axios.get('/ProjectJournal/' + this.items.id)
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
