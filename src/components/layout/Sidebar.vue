<template>
  <aside :class="`${is_expanded ? 'is-expanded' : ''}`">
    <div class="logo" :class="`${is_expanded ? 'flex-expand' : ''}`">
      <img :src="logoURL" alt="Vue" />
      <div :class="`${is_expanded ? 'text-expand' : 'hiding-text'}`">
        Hệ thống đặt lịch phòng học
      </div>
    </div>

    <div class="menu">
      <base-sibar-item
        v-for="item in MenuItems"
        :key="item.icon"
        :itemIcon="item.icon"
        :itemName="item.itemName"
        :itemLink="item.itemLink"
        :itemNameIcon="item.iconName"
      >
      </base-sibar-item>
    </div>
    <div class="flex"></div>

    <div class="menu">
      <!-- <router-link to="/settings" class="button">
        <span class="material-icons">settings</span>
        <span class="text">Settings</span>
      </router-link> -->

      <div class="menu-toggle-wrap">
        <button class="menu-toggle" @click="ToggleMenu">
          <font-awesome-icon
            icon="fa-solid fa-square-caret-right"
            style="color: #f8f9fc"
            size="2xl"
          />
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import logoURL from '../../assets/logoUniversity.png'
const MenuItems = [
  {
    itemLink: '/overview',
    itemName: 'Tổng quan',
    iconName: 'home',
    icon: 'material-icons',
  },
  {
    itemLink: '/room-booking',
    itemName: 'Đặt phòng',
    iconName: 'description',
    icon: 'material-icons',
  },
  {
    itemLink: '/room-import',
    itemName: 'Nhập khẩu',
    iconName: 'description',
    icon: 'material-icons',
  },
  {
    itemLink: '/about',
    itemName: 'About',
    iconName: 'description',
    icon: 'material-icons',
  },
  {
    itemLink: '/RoomBrowsing',
    itemName: 'Chờ duyệt',
    iconName: 'history',
    icon: 'material-icons',
  },
  {
    itemLink: '/department',
    itemName: 'Phòng ban',
    iconName: 'email',
    icon: 'material-icons',
  },

  {
    itemLink: '/building',
    itemName: 'Tòa nhà',
    iconName: 'email',
    icon: 'material-icons',
  },
  {
    itemLink: '/equipment',
    itemName: 'Thiết bị',
    iconName: 'email',
    icon: 'material-icons',
  },
  {
    itemLink: '/room',
    itemName: 'Phòng học',
    iconName: 'email',
    icon: 'material-icons',
  },
  {
    itemLink: '/role',
    itemName: 'Vai trò',
    iconName: 'email',
    icon: 'material-icons',
  },
  {
    itemLink: '/timeSlot',
    itemName: 'Ca học',
    iconName: 'email',
    icon: 'material-icons',
  },
]

const is_expanded = ref(localStorage.getItem('is_expanded') === 'false')

const ToggleMenu = () => {
  is_expanded.value = !is_expanded.value
  localStorage.setItem('is_expanded', is_expanded.value)
}
</script>

<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;

  background-color: var(--dark);
  color: var(--light);

  width: calc(1rem + 50px);
  overflow: hidden;
  min-height: 100vh;
  padding: 0.5rem;

  transition: 0.2s ease-in-out;
  .flex-expand {
    display: flex;
    .text-expand {
      padding: 10px 0 0 5px;
      font-weight: 600;
      font-size: 16px;
      line-height: 30px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .hiding-text {
    display: none;
  }
  .flex {
    flex: 1 1 0%;
  }

  .logo {
    height: 60px;

    img {
      width: 3rem;
      height: 3rem;
    }
  }

  .menu-toggle-wrap {
    padding-left: 15px;
    display: flex;
    position: relative;
    top: 0;
    transition: 0.2s ease-in-out;

    .menu-toggle {
      transition: 0.2s ease-in-out;
      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-icons {
          color: var(--primary);
          transform: translateX(0.5rem);
        }
      }
    }
  }

  h3,
  .button .text {
    opacity: 0.1;
    transition: opacity 0.3s ease-in-out;
  }

  h3 {
    color: var(--grey);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  .menu {
    margin: 0 -0.5rem;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;

      transition: 0.2s ease-in-out;
      padding: 0.5rem 1rem;

      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-in-out;
      }
      .text {
        color: var(--light);
        transition: 0.2s ease-in-out;
      }

      &:hover {
        background-color: var(--dark-alt);

        .material-icons,
        .text {
          color: var(--primary);
        }
      }

      &.router-link-exact-active {
        background-color: var(--dark-alt);
        border-right: 5px solid var(--primary);

        .material-icons,
        .text {
          color: var(--primary);
        }
      }
    }
  }

  .footer {
    opacity: 0.1;
    transition: opacity 0.3s ease-in-out;

    p {
      font-size: 0.875rem;
      color: var(--grey);
    }
  }

  &.is-expanded {
    width: var(--sidebar-width);

    .menu-toggle-wrap {
      padding-right: 15px;
      justify-content: flex-end;
      .menu-toggle {
        transform: rotate(-180deg);
      }
    }

    h3,
    .button .text {
      opacity: 1;
    }

    .button {
      .material-icons {
        margin-right: 1rem;
      }
    }

    .footer {
      opacity: 0.1;
    }
  }

  @media (max-width: 1024px) {
    position: absolute;
    z-index: 99;
  }
}
</style>
