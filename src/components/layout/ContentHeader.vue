<template>
  <div id="content-header">
    <div class="widget-container">
      <div class="dx-fieldset">
      
    </div>
  </div>
    <div class="content-right">
        <div class="icon-content">
         <font-awesome-icon class="icon-right" icon="fa-regular fa-envelope" size="xl"/>
         <font-awesome-icon class="icon-right" icon="fa-regular fa-bell" size="xl" />
         <font-awesome-icon class="icon-right" icon="fa-regular fa-circle-user" size="xl" />
         </div>
    </div>
  </div>
</template>
<script>

export default {
    name: "content-header",
    components: {
  },
  data() {
    return {
     
    }  },
  methods: {
   
  },
};
</script>
<style>
    #content-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        background-color: #fff;
    }

 
    .dx-field{
        width: 100%;
    }

    .icon-content{
        display: flex;
        justify-content: space-between;
    }

    .content-right{
        width: 180px;
        padding-right: 20px;
    }

    .icon-right{
      cursor: pointer;
    }
</style>
