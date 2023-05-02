<template>
  <div>
    <div
      v-if="!hasChildren"
      @mouseenter="showTooltip"
      @mouseleave="hideTooltip"
    >
      <el-tooltip
        :visible="!isExpandSibar && isTooltipVisible"
        :content="itemName"
        placement="right"
      >
        <router-link :to="itemLink" class="button">
          <span :class="itemIcon" class="material-icons">{{
            itemNameIcon
          }}</span>
          <span class="text">{{ itemName }}</span>
        </router-link>
      </el-tooltip>
    </div>
    <div
      @mouseenter="showTooltip"
      @mouseleave="hideTooltip"
      v-else
      class="has-children"
      :class="{ 'is-expanded-item': isChildrenExpanded }"
    >
      <el-tooltip
        :visible="!isExpandSibar && isTooltipVisible"
        :content="itemName"
        placement="right"
      >
        <button class="toggle-button" @click="toggleChildren">
          <span :class="itemIcon" class="material-icons">{{
            itemNameIcon
          }}</span>
          <span class="text">{{ itemName }}</span>
          <span
            class="misa-icon misa-icon-dropdown misa-icon-24"
            :class="{ 'is-rotated': isChildrenExpanded }"
          >
            <i class="fas fa-chevron-right"></i>
          </span>
        </button>
      </el-tooltip>
      <div
        class="children"
        v-show="isChildrenExpanded"
        v-for="(child, index) in children"
        :key="index"
      >
        <el-tooltip :content="child.itemName" placement="right">
          <router-link :to="child.itemLink" class="button">
            <div :class="child.icon" class="material-icons">
              {{ child.iconName }}
            </div>
            <span class="text">{{ child.itemName }}</span>
          </router-link>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /**Tên của item */
    itemName: {
      type: String,
      default: '',
    },

    /**Icon của item */
    itemIcon: {
      type: String,
      default: '',
    },
    itemNameIcon: {
      type: String,
      default: '',
    },
    /**Link của item */
    itemLink: {
      type: String,
      default: '',
    },
    /** Mở rộng nếu có con */
    isExpanded: {
      type: Boolean,
      required: false,
      default: false,
    },
    isExpandSibar: {
      type: Boolean,
      required: false,
      default: false,
    },
    /** Các children của item */
    children: {
      type: Array,
      required: false,
      default: () => [],
    },
  },

  data() {
    return {
      isChildrenExpanded: false,
      isTooltipVisible: false,
    }
  },

  computed: {
    hasChildren() {
      return this.children && this.children.length > 0
    },
  },

  methods: {
    toggleChildren() {
      this.isChildrenExpanded = !this.isChildrenExpanded
    },
    showTooltip() {
      this.isTooltipVisible = true
    },
    hideTooltip() {
      this.isTooltipVisible = false
    },
  },
}
</script>
<style lang="scss" scoped>
.has-children {
  .material-icons {
    font-size: 2rem;
    color: var(--light);
    transition: 0.2s ease-in-out;
  }
  button {
    padding-left: 20px;
    height: 48px;
    .text {
      display: none;
    }
  }
}

.is-expanded {
  .has-children {
    button {
      display: flex;
      align-items: center;
      text-decoration: none;
      width: 100%;
      transition: 0.2s ease-in-out;
      padding-left: 20px;
      height: 48px;
      position: sticky;
      top: 0;
      z-index: 1;
      background-color: var(--dark);
      span.misa-icon {
        position: absolute;
        right: 26px;
      }
      .text {
        color: #fff;
        transition: 0.2s ease-in-out;
        font-size: 16px;
        display: block;
      }

      .arrow-icon {
        margin-left: auto;
        transition: transform 0.3s ease;
        display: flex;
        align-items: center;
      }

      &:hover {
        background-color: rgb(48, 65, 86);

        .material-icons,
        .text {
          color: #fff;
        }
      }

      &.active .arrow-icon {
        transform: rotate(90deg);
      }
    }
    .material-icons {
      font-size: 2rem;
      color: var(--light);
      margin-right: 1rem;
      margin-left: 2px;
    }
    .children {
      overflow: hidden;
      transition: all 0.3s ease;
      &.expand-enter-active,
      &.expand-leave-active {
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }

      &.expand-enter,
      &.expand-leave-to {
        height: 0;
        opacity: 0;
      }
    }

    &.is-expanded-item {
      button {
        .misa-icon-dropdown {
          transform: rotate(180deg);
        }
        .misa-icon {
          display: block;
        }
      }

      .children {
        height: auto;
        opacity: 1;
        margin-top: 0.5rem;
      }
    }
  }
}
</style>
