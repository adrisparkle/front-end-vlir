<template>
  <div class="vld-parent">
    <loading :active.sync="isLoading"
             :is-full-page="true"></loading>
  <va-card>
    <div class="mb-4" align="center">
      <p class="display-2">Generación de reportes</p><br>
      <p class="display-4">Presupuesto de proyectos</p>
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
          formData = 1000
          :value="codigo_proyecto">
        </va-select>
      </div>
      <div align="center">
        <!-- @click="readItems(selected)" -->
        <va-button color="success" @click.prevent="check(simpleSelectModel.codigo_proyecto)"> {{ $t('Seleccionar') }}</va-button>
      </div>
    </form>
    <!-- @click="check(simpleSelectModel.codigo_proyecto)&&launchToast(formData.length,simpleSelectModel.codigo_proyecto)" -->
    <!--
    <div v-if="formData.length > 0">{{reporte(simpleSelectModel.codigo_proyecto)}}</div>
    <div v-if="(formData.length) === 0">{{launchToast()}}</div>
    -->
    <div align="center" hidden>
      {{date1 = simpleSelectModel.valido_desde}} <br>
      {{date2 = simpleSelectModel.valido_hasta}} <br>
      {{simple = simpleSelectModel.regional}} <br>
    </div>
  </va-card>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../../router/index'
import Loading from 'vue-loading-overlay'
export default {
  components: { Loading },
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
      toastText: '¡No se encuentran movimientos para este proyecto!',
      toastDuration: 3000,
      toastPosition: 'top-center',
      isToastFullWidth: true,
      formData: 1000,
      color: 'danger',
      codigo_proyecto: '',
    }
  },
  created () {
    this.init()
  },
  methods: {
    init: function () {
      this.isLoading = true
      axios.get('/ProjectGeneral/')
        .then(response => {
          this.simpleOptions = response.data
          this.isLoading = false
        }).catch()
    },
    check: function (id) {
      axios.get('/ProjectInfo/' + id)
        .then(response => {
          this.formData = response.data
          console.log(response.data)
          if (response.data.length === 0) {
            this.launchToast()
          } else {
            this.reporte(id)
          }
        })
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
    reporte: function (id) {
      router.push('../admin/mostrarreporte/' + id)
    },
  },
}
</script>
