<template>
  <form>
  <div align="center">
    <div width="300px">
      <p>Tabla 1</p>
      <table class="table">
        <tr>
          <th style="padding: 10px">Valor: {{aux}}</th>
          <th style="padding: 10px">Valor: {{aux}}</th>
        </tr>
        <tr>
          <td style="padding: 15px">Valor: {{aux}}</td>
          <td style="padding: 15px">Valor: {{aux}}</td>
        </tr>
      </table>
    </div>
  </div>
    <div align="center">
      <button class="button" @click.prevent="fill">Sumar 1</button></div>
  </form>
</template>
<script>
export default {
  data () {
    return {
      aux: 0,
    }
  },
  methods: {
    fill: function () {
      this.aux = this.aux + 1
      return this.aux
    },
  },
}
</script>
<style lang="scss">
  .table{
    width: 200px;
    height: 100px;
    font-size: 20px;
    align-content: center;
    color: #00480c;
    background-color: rgba(135, 229, 10, 0.63);
    border: 2px solid rgba(9, 24, 64, 0.62);
  }
  .button{
    color: #ffffff;
    background-color: rgba(0, 93, 16, 0.55);
    border-radius: 20px;
    padding: 7.5px 25px;
  }
  .button:hover{
    color: #ffffff;
    background-color: rgba(64, 229, 131, 0.55);
  }
</style>
