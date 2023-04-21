<template>
  <div class="container">
    <div class="card-container">
      <div class="data-card" v-for="(item, index) in yearData" :key="index" @click="selectYear(item)">
        <div class="database-icon"></div>
        <div class="database-name">
          <div class="title">Năm {{ item.year }}</div>
          <div class="active" v-if="item.year == currentYear">
            Đang làm việc
          </div>
          <div class="inactive" v-else>Không làm việc</div>
        </div>
        <div class="box-demo"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      yearData: [
        {
          year: 2021,
        },
        {
          year: 2022,
        },
        {
          year: 2023,
        },
        {
          year: 2024,
        },
        {
          year: 2025,
        },
        {
          year: 2026,
        },
      ],
      currentYear: 2023,
    };
  },
  computed: {},
  methods: {
    selectYear(item) {
      this.currentYear = item.year;
    }
  },
};
</script>
<style lang="scss" scoped>
.card-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .data-card {
    width: 220px;
    height: 80px;
    border: 2px solid #9e9e9e;
    border-radius: 4px;
    margin-right: 30px;
    margin-top: 10px;
    margin-bottom: 10px;
    position: relative;
    cursor: pointer;

    .database-icon {
      background: url("@/assets/images/Sprites.64af8f61.svg") no-repeat;
      width: 32px;
      height: 32px;
      margin: 10px;
      background-position: -480px -894px;
      position: absolute;
      top: 50%;
      transform: translate(0, -80%);
    }
    .database-name {
      margin-left: 60px;
      margin-top: 18px;
      font-size: 14px;

      .title {
        margin-bottom: 10px;
      }

      .active {
        color: #2ca01c;
      }

      .inactive {
        color: #9e9e9e;
      }
    }
  }
}
</style>
