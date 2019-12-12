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
            <va-list-label>
              {{ $t('Reporte') }}
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
      }, {
        name: 'fecha',
        title: this.$t('fecha'),
        width: '10%',
      }, {
        name: 'numero_comprobante',
        title: this.$t('numero de comprobante'),
        width: '15%',
      }, {
        name: 'numero_transaccion',
        title: this.$t('numero de transaccion'),
        width: '10%',
      }, {
        name: 'sucursal',
        title: this.$t('sucursal'),
        width: '10%',
      }, {
        name: 'descripcion',
        title: this.$t('descripcion'),
        width: '35%',
      }, {
        name: 'referencia',
        title: this.$t('referencia'),
        width: '20%',
      }, {
        name: 'monto',
        title: this.$t('monto'),
        width: '20%',
      }, {
        name: 'codigo_proyecto',
        title: this.$t('codigo de proyecto'),
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
      columns: [
        {
          label: 'Numero cuenta contable',
          field: 'cuenta',
        },
        {
          label: 'Fecha registro contable',
          field: 'fecha',
        },
        {
          label: 'No de comprobante contable',
          field: 'numero_comprobante',
        },
        {
          label: 'No de transaccion',
          field: 'numero_transaccion',
        },
        {
          label: 'Regional',
          field: 'sucursal',
        },
        {
          label: 'Descripcion',
          field: 'descripcion',
        },
        {
          label: 'Referencia',
          field: 'referencia',
        },
        {
          label: 'Monto Bs',
          field: 'monto',
        },
        {
          label: 'Codigo de proyecto',
          field: 'codigo_proyecto',
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
  },
  created () {
    this.readItems()
  },
}
</script>
<style lang="scss">
  .bla{
    padding: 10px !important;
  }
</style>
