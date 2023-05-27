<template>
  <router-view />
</template>

<style lang="scss">
@import url(./styles/components/toat-msg-el.css);
// Import Main styles for this application
@import 'styles/style';
#app {
  font-style: 'Roboto';
}
.mgl-16 {
  margin-left: 16px !important;
}
.mgt-16 {
  margin-top: 16px !important;
}
.mgb-16 {
  margin-bottom: 16px !important;
}
.mgt-8 {
  margin-top: 8px;
}
.mgt-10 {
  margin-top: 10px;
}
.mgt-14 {
  margin-top: 14px;
}
.mgb-8 {
  margin-bottom: 8px;
}
.mgl-8p {
  margin-left: 8px;
}
.flex {
  display: flex;
}
button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}
.w-86 {
  width: 86px;
  min-width: 86px;
}
.required {
  color: #e54848;
}
.w-80 {
  width: 80px;
  min-width: 80px;
}
.w-120 {
  width: 120px;
  min-width: 120px;
}
:root {
  --primary: #4ade80;
  --primary-alt: #22c55e;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --sidebar-width: 300px;
  --border-color: #babec5;
  --input-hover-border-color: #0c9cdd;
  --primary: #0c9cdd;
  --primary-bg: #f3fbfd;
  --text-box-height: 36px;
  --combo-box-height: 36px;
  --input-border-radius: 3.5px;
  --text-primary-color: #171b2a;
  --text-secondary-color: #666;
  --text-disable-color: #9e9e9e;
  --text-white-primary-color: #fff;
  --text-white-secondary-color: #d7dae5;
  --text-placeholder-color: #9fa4b4;
  --text-error: #f75010;
  --border-color: #e7e8e9;
  --input-normal-border-color: #e0e0e0;
  --input-active-border-color: #0c9cdd;
  --input-hover-border-color: #0c9cdd;
  --input-disable-border: #e1e1e1;
  --input-disable-bg-color: #ebebeb;
  --input-error-border-color: #e61d1d;
  --combobox-highlight-bg-color: #f3fbfd;
  --combobox-highlight-bg-2-color: #f3fbfd;
  --combobox-highlight-color: #0c9cdd;
  --combobox-color: #000;
  --tab-color: #0c9cdd;
  --tab-bg: #0c9cdd;
  --tab-border: #0c9cdd;
  --button-height: 36px;
  --button-border-radius: 4px;
  --buton-icon-bg-hover: #eff1f6;
  --buton-icon-bg-press: #e8eaef;
  --buton-icon-bg-hover2: #dadce3;
  --buton-icon-bg-press2: #c5c9d2;
  --buton-icon-bg-hover3: #bff2da;
  --buton-icon-bg-press3: #aaeece;
  --button-primary-color: #fff;
  --button-primary-normal-bg-color: #0c9cdd;
  --button-primary-normal-border-color: #0c9cdd;
  --button-primary-hover-bg-color: #0c9cdd;
  --button-primary-hover-border-color: #0c9cdd;
  --button-primary-active-bg-color: #0c9cdd;
  --button-primary-active-border-color: #0c9cdd;
  --button-primary-disabled-color: hsla(0, 0%, 100%, 0.6);
  --button-primary-disabled-bg-color: #0c9cdd;
  --button-primary-disabled-border-color: #0c9cdd;
  --button-primary-focus-bg-color: #0c9cdd;
  --button-primary-focus-border-color: #0c9cdd;
  --grid-loading-color: 52, 176, 87;
  --grid-row-hover-bg: #eff1f6;
  --grid-border: #dadce3;
  --grid-header-bg-dark: #e8eaef;
  --dropdown-item-hover: #eff1f6;
  --dropdown-item-active-color: #25b973;
  --date-picker-active-bg: #0c9cdd;
  --date-picker-range-bg: #f3fbfd;
  --date-picker-hover-bg: #f3fbfd;
  --date-picker-color-today: #0c9cdd;
  --combobox-selected-bg: #e6e8ed;
  --icon-deault-color: #686c7b;
}
.tooltip {
  opacity: 1 !important;
  padding: 0 !important;
}
.container-lg {
  padding: 0 !important;
}
</style>
