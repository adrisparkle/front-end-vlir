<template>
  <div class="vld-parent">
    <loading :active.sync="isLoading"
             :is-full-page="true"></loading>
    <div class="lists">
    <va-card class="flex xs12 lg12"  v-for="data of formData" :key="'item' + data.id" >
      <div align="center" class="buttons">
        <va-button color="info" :to="{ name: 'dashboard' }">
          {{ $t('Volver al Inicio') }}
        </va-button>
        <va-button color="warning" @click="volver(data.numero_solicitud)">
          {{ $t('Volver al mapa de relaciones') }}
        </va-button>
      </div>
      <div class="row" >
        <div class="flex xs6 lg6">
          <va-list fit class="mb-2">
            <va-list-label>
              {{ $t('Entrada de mercancias') }}
            </va-list-label>
            <template>
              <table width="100%" class="bla">
                <tr>
                  <td class="bla" align="right">
                    <b>Estado:</b>
                  </td>
                  <td class="bla" align="left" v-if="data.estado=='Aprobado'">
                    <font color="#7fff00">{{data.estado}}</font>
                  </td>
                  <td class="bla" align="left" v-else>
                    <font color="#dc143c">{{data.estado}}</font>
                  </td>
                </tr>
                <tr>
                  <td align="right" class="bla">
                    <b># Proveedor: </b>
                  </td>
                  <td class="bla">
                    {{ data.codigo_proveedor }}
                  </td>
                  <td class="bla" align="right">
                    <b>Regional:</b>
                  </td>
                  <td class="bla">
                    {{ data.regional }}
                  </td>
                </tr>
                <tr>
                  <td class="bla" align="right">
                    <b>Nombre del proveedor: </b>
                  </td>
                  <td class="bla">
                    {{ data.proveedor }}
                  </td>
                  <td class="bla" align="right">
                    <b>Fecha de contabilización:</b>
                  </td>
                  <td class="bla">
                    {{ data.fecha_contabilizacion }}
                  </td>
                </tr>
                <tr>
                  <td class="bla" align="right">
                    <b>Serie:</b>
                  </td>
                  <td class="bla">
                    {{ data.serie }}
                  </td>
                  <td class="bla" align="right">
                    <b>Fecha de entrega:</b>
                  </td>
                  <td class="bla">
                    {{ data.fecha_entrega }}
                  </td>
                </tr>
                <tr>
                  <td class="bla" align="right">
                    <b># Documento:</b>
                  </td>
                  <td class="bla">
                    {{ data.numero_documento }}
                  </td>
                  <td class="bla" align="right">
                    <b>Fecha de documento:</b>
                  </td>
                  <td class="bla">
                    {{ data.fecha_documento }}
                  </td>
                </tr>
                <tr>
                  <td class="bla" align="right">
                    <b>Unidad Organizacional:</b>
                  </td>
                  <td class="bla">
                    {{ data.unidad_organizacional }}
                  </td>
                </tr>
              </table>
            </template>
          </va-list>
        </div>
        <div class="flex xs6 lg6">
          <template>
            <div>
              <va-list fit class="mb-2" v-if="data.espicificaciones_tecnicas==null && data.informe_proyecto==null && data.informe_circunstanciado==null && data.pago_directo==null && data.propuesta==null && data.cuadro_comparativo==null && data.acta_evaluacion==null && data.informe_legal==null && data.pliego==null && data.contrato==null">
                <va-list-label>
                  {{ $t('Documentos Anexos') }}
                </va-list-label>
                <va-item>
                  <va-item-section>
                    <va-item-label align="center">
                      No existen documentos anexos para este proceso.
                    </va-item-label>
                  </va-item-section>
                </va-item>
              </va-list>
              <va-list fit class="mb-2" v-else>
                <va-list-label>
                  {{ $t('Documentos Anexos') }}
                </va-list-label>
                <va-item v-if="data.espicificaciones_tecnicas!=null">
                  <va-item-section>
                    <va-item-label>
                      Especificaciones técnicas
                    </va-item-label>
                    <va-item-label caption>
                      <a v-bind:href="'file:///' + data.espicificaciones_tecnicas">{{ data.espicificaciones_tecnicas }}</a>
                    </va-item-label>
                  </va-item-section>
                  <va-item-section side>
                    <va-icon name="fa fa-eye" color="gray" />
                  </va-item-section>
                </va-item>
                <va-item v-if="data.informe_proyecto!=null" clickable @click="docs(data.informe_proyecto)">
                  <va-item-section>
                    <va-item-label>
                      Informe del Proyecto
                    </va-item-label>
                    <va-item-label caption>
                      <a v-bind:href="'file:///' + data.informe_proyecto">{{ data.informe_proyecto }}</a>
                    </va-item-label>
                  </va-item-section>
                  <va-item-section side>
                    <va-icon name="fa fa-eye" color="gray" />
                  </va-item-section>
                </va-item>
                <va-item v-if="data.informe_circunstanciado!=null" clickable @click="docs(data.informe_circunstanciado)">
                  <va-item-section>
                    <va-item-label>
                      Informe circunstanciado
                    </va-item-label>
                    <va-item-label caption>
                      <a v-bind:href="'file:///' + data.informe_circunstanciado">{{ data.informe_circunstanciado }}</a>
                    </va-item-label>
                  </va-item-section>
                  <va-item-section side>
                    <va-icon name="fa fa-eye" color="gray" />
                  </va-item-section>
                </va-item>
                <va-item v-if="data.pago_directo!=null" clickable>
                  <va-item-section>
                    <va-item-label>
                      Pago directo
                    </va-item-label>
                    <va-item-label caption>
                      <a v-bind:href="'file:///' + data.pago_directo">{{ data.pago_directo }}</a>
                    </va-item-label>
                  </va-item-section>
                  <va-item-section side>
                    <va-icon name="fa fa-eye" color="gray" />
                  </va-item-section>
                </va-item>
                <va-item v-if="data.propuesta!=null" clickable>
                  <va-item-section>
                    <va-item-label>
                      Propuesta
                    </va-item-label>
                    <va-item-label caption>
                      <a v-bind:href="'file:///' + data.propuesta">{{ data.propuesta }}</a>
                    </va-item-label>
                  </va-item-section>
                  <va-item-section side>
                    <va-icon name="fa fa-eye" color="gray" />
                  </va-item-section>
                </va-item>
                <va-item v-if="data.cuadro_comparativo!=null" clickable>
                  <va-item-section>
                    <va-item-label>
                      Cuadro comparativo
                    </va-item-label>
                    <va-item-label caption>
                      <a v-bind:href="'file:///' + data.cuadro_comparativo">{{ data.cuadro_comparativo }}</a>
                    </va-item-label>
                  </va-item-section>
                  <va-item-section side>
                    <va-icon name="fa fa-eye" color="gray" />
                  </va-item-section>
                </va-item>
                <va-item v-if="data.acta_evaluacion!=null" clickable>
                  <va-item-section>
                    <va-item-label>
                      Acta de Evaluación
                    </va-item-label>
                    <va-item-label caption>
                      <a v-bind:href="'file:///' + data.acta_evaluacion">{{ data.acta_evaluacion }}</a>
                    </va-item-label>
                  </va-item-section>
                  <va-item-section side>
                    <va-icon name="fa fa-eye" color="gray" />
                  </va-item-section>
                </va-item>
                <va-item v-if="data.informe_proceso!=null" clickable>
                  <va-item-section>
                    <va-item-label>
                      Informe del proceso
                    </va-item-label>
                    <va-item-label caption>
                      <a v-bind:href="'file:///' + data.informe_proceso">{{ data.informe_proceso }}</a>
                    </va-item-label>
                  </va-item-section>
                  <va-item-section side>
                    <va-icon name="fa fa-eye" color="gray" />
                  </va-item-section>
                </va-item>
                <va-item v-if="data.informe_legal!=null" clickable>
                  <va-item-section>
                    <va-item-label>
                      Informe legal
                    </va-item-label>
                    <va-item-label caption>
                      <a v-bind:href="'file:///' + data.informe_legal">{{ data.informe_legal }}</a>
                    </va-item-label>
                  </va-item-section>
                  <va-item-section side>
                    <va-icon name="fa fa-eye" color="gray" />
                  </va-item-section>
                </va-item>
                <va-item v-if="data.pliego!=null" clickable>
                  <va-item-section>
                    <va-item-label>
                      Pliego
                    </va-item-label>
                    <va-item-label caption>
                      <a v-bind:href="'file:///' + data.pliego">{{ data.pliego }}</a>
                    </va-item-label>
                  </va-item-section>
                  <va-item-section side>
                    <va-icon name="fa fa-eye" color="gray" />
                  </va-item-section>
                </va-item>
                <va-item v-if="data.contrato!=null" clickable>
                  <va-item-section>
                    <va-item-label>
                      Contrato
                    </va-item-label>
                    <va-item-label caption>
                      <a v-bind:href="'file:///' + data.contrato">{{ data.contrato }}</a>
                    </va-item-label>
                  </va-item-section>
                  <va-item-section side>
                    <va-icon name="fa fa-eye" color="gray" />
                  </va-item-section>
                </va-item>
              </va-list>
            </div>
          </template>
        </div>
      </div>
      <div class="flex xs12 lg12">
        <va-card>
          <va-list-label>
            {{ $t('Detalle de la mercancia') }}
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
import router from '../../router/index'
import VaCard from 'vuestic-ui/src/components/vuestic-components/va-card/VaCard'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  components: { VaCard, Loading },
  computed: {
    fields () {
      return [{
        name: 'codigo',
        title: this.$t('tables.headings.codigo'),
        width: '15%',
      }, {
        name: 'descripcion',
        title: this.$t('tables.headings.descripcion'),
        width: '30%',
      }, {
        name: 'observaciones',
        title: this.$t('tables.headings.observaciones'),
        width: '20%',
      }, {
        name: 'cantidad',
        title: this.$t('tables.headings.cantidad'),
        width: '20%',
      }, {
        name: 'proyecto',
        title: this.$t('tables.headings.proyecto'),
        width: '20%',
      }, {
        name: 'almacen',
        title: this.$t('tables.headings.almacen'),
        width: '20%',
      }, {
        name: 'impuesto',
        title: this.$t('tables.headings.impuesto'),
        width: '20%',
      }, {
        name: 'precio_unitario',
        title: this.$t('tables.headings.precio_unitario'),
        width: '20%',
      }, {
        name: 'total',
        title: this.$t('tables.headings.total'),
        width: '20%',
      }, {
        name: 'unidad_organizacional',
        title: this.$t('tables.headings.unidad_organizacional'),
        width: '20%',
      }, {
        name: 'pei_po',
        title: this.$t('tables.headings.pei_po'),
        width: '20%',
      }, {
        name: 'saldo_presupuestado',
        title: this.$t('tables.headings.saldo_presupuestado'),
        width: '20%',
      }, {
        name: 'motivo_salida',
        title: this.$t('tables.headings.motivo_salida'),
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
    init: function () {
      this.isLoading = true
      this.formData = this.$route.params
      axios.get('/PurchaseDN/' + this.formData.id)
        .then(response => {
          this.formData = response.data
        })
        .catch()
      setTimeout(() => {
        this.isLoading = false
      }, 2000)
    },
    readItems: function () {
      this.isLoading = true
      this.items = this.$route.params
      axios.get('/PurchaseDNDetail/' + this.items.id)
        .then(response => {
          this.items = response.data
        })
        .catch()
      setTimeout(() => {
        this.isLoading = false
      }, 2000)
    },
    volver: function (id) {
      router.push('../relaciones/' + id)
    },
  },
  created () {
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
