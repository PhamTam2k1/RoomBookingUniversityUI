<template>
  <div>
    <div :style="'background: red'" class="name">
      <h2>{{ rooms.data.text }}</h2>
    </div>
    <div class="avatar">
      Hello
      <!-- <img :src="employee.data.avatar"> -->
    </div>
    <div :style="'color: black'" class="info">
      Sức chứa: {{ rooms.data.capacity }}
      <br />
      <b>{{ rooms.data.name }}</b>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    rooms: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
<style>
.avatar {
  width: 155px;
  float: left;
  overflow: hidden;
  position: relative;
  height: 125px;
}

.name {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.name h2 {
  color: #fff;
  text-align: left;
  padding: 0 0 5px 175px;
  margin: 0;
}

.info {
  width: auto;
  text-align: left;
  height: 100%;
  font-size: 11pt;
  font-weight: normal;
  padding: 25px 20px;
  color: #707070;
}

.dx-color-scheme-contrast .info {
  color: #fff;
}
</style>
