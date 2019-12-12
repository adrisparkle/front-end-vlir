<template>
  <div class="vld-parent">
    <loading :active.sync="isLoading"
             :is-full-page="true"></loading>
    <va-card>
      <div class="mb-4" align="center">
        <p class="display-2">Generación de reportes</p><br>
        <p class="display-4">Gastos del Proyecto VLIR</p>
        <p>Seleccionar el proyecto a continuación:</p>
      </div>
      <form>
        <div class="flex md6 offset--md3" >
          <va-input
            :label="$t('Regional')"
            v-model="simple"
            placeholder="Regional"
            readonly
          />
          <va-input
            :label="$t('Fecha desde')"
            v-model="date1"
            readonly
          />
          <va-input
            :label="$t('Fecha Hasta')"
            v-model="date2"
            readonly
          />
          <va-select
            :label="$t('Proyecto')"
            v-model="simpleSelectModel"
            textBy="nombre"
            searchable
            keyBy="codigo_proyecto"
            :options="simpleOptions"
            placeholder="Seleccione aqui"
            :value="codigo_proyecto">
          </va-select>
        </div>
        <div align="center">
          <!-- @click="readItems(selected)" -->
          <va-button color="success" @click="check(simpleSelectModel.codigo_proyecto)"> {{ $t('Seleccionar') }}</va-button>
        </div>
      </form>
      <div v-if="formData.length > 0">{{reporte(simpleSelectModel.codigo_proyecto)}}</div>
      <div v-if="(formData.length) === 0">{{launchToast()}}</div>
      <div align="center" hidden>
        jkah{{date1 = simpleSelectModel.valido_desde}} <br>
        shdkj{{date2 = simpleSelectModel.valido_hasta}} <br>
        kashj{{simple = simpleSelectModel.regional}} <br>
      </div>
    </va-card>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../../router/index'
import Loading from 'vue-loading-overlay'
import VaInput from 'vuestic-ui/src/components/vuestic-components/va-input/VaInput'
export default {
  components: { VaInput, Loading },
  data () {
    return {
      simple: '',
      date1: '',
      date2: '',
      simpleSelectModel: '',
      simpleOptions: [],
      term: null,
      dateSearch: null,
      perPage: '5',
      perPageOptions: ['5', '10', '15', '20'],
      formData: -1,
    }
  },
  created () {
    this.init()
  },
  methods: {
    init: function () {
      this.isLoading = true
      axios.get('/ProjectVLIR/')
        .then(response => {
          this.simpleOptions = response.data
          this.isLoading = false
        }).catch()
    },
    reporte: function (id) {
      router.push('mostrarvlir/' + id)
    },
    check: function (id) {
      axios.get('/ProjectVLIRInfo/' + id)
        .then(response => {
          this.formData = response.data
        }).catch()
    },
    launchToast () {
      this.showToast(
        this.toastText,
        {
          position: this.toastPosition,
          duration: this.toastDuration,
          fullWidth: this.isToastFullWidth,
        },
      )
    },
  },
}
</script>
