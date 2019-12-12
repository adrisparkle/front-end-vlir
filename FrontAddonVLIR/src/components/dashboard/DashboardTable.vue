<template>
  <va-card :title="$t('Búsqueda de solicitudes de compra')">
    <div class="row align--center">
      <div class="flex xs12 md4">
        <va-input
          :value="term"
          :placeholder="$t('tables.searchByName')"
          @input="search"
          removable
        >
          <va-icon name="fa fa-search" slot="prepend"></va-icon>
        </va-input>
      </div>
      <!--
      <div class="flex xs12 md3">
        <va-date-picker
          :label="$t('Buscar por fecha')"
          v-model="date"
          :value="dateSearch"
        />
      </div>
      -->
      <div class="flex xs12 md2 offset--md6">
        <va-select
          v-model="perPage"
          :label="$t('tables.perPage')"
          :options="perPageOptions"></va-select>
      </div>
    </div>

    <va-data-table
      :fields="fields"
      :data="filteredData"
      :per-page="parseInt(perPage)"
      :loading="loading"
    >
      <template slot="actions" slot-scope="props">
        <va-button flat small color="blue" icon="fa fa-plus"
                   @click="see(props.rowData.id)">
          {{ $t('icons.mas_info') }}
        </va-button>
      </template>
    </va-data-table>
  </va-card>
</template>

<script>
import { debounce } from 'lodash'
import axios from 'axios'
import router from '../../router/index'
export default {
  data () {
    return {
      term: null,
      dateSearch: null,
      perPage: '5',
      perPageOptions: ['5', '10', '15', '20'],
      items: [],
      loading: false,
      date: '2019-05-09',
    }
  },
  computed: {
    fields () {
      return [{
        name: 'id',
        title: this.$t('tables.headings.n_documento'),
        width: '15%',
      }, {
        name: 'solicitante',
        title: this.$t('tables.headings.solicitante'),
        width: '30%',
      }, {
        name: 'fecha_contabilizacion',
        title: this.$t('tables.headings.fecha_documento'),
        width: '20%',
      }, {
        name: 'regional',
        title: this.$t('tables.headings.regional'),
        width: '15%',
      }, {
        name: 'unidad_organizacional',
        title: this.$t('tables.headings.unidad_organizacional'),
        width: '20%',
      }, {
        name: '__slot:actions',
        title: this.$t('tables.headings.acciones'),
        width: '10%',
      }]
    },
    filteredData () {
      if (!this.term || this.term.length < 1) {
        return this.items
      }

      return this.items.filter(item => {
        return item.solicitante.toLowerCase().startsWith(this.term.toLowerCase())
      })
    },
  },
  created () {
    this.readItems()
  },
  methods: {
    search: debounce(function (term) {
      this.term = term
    }, 400),
    readItems (page = 0) {
      this.loading = true

      axios.get('/PurchaseSearch/')
        .then(response => {
          this.items = response.data
          this.loading = false
        })
    },
    see: function (id) {
      router.push('relaciones/' + id)
    },
  },
}
</script>
