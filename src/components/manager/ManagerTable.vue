<template>
  <div>
    <Table ref="selection" :columns="table.col" :data="table.list"></Table>
  </div>
</template>
<script>

export default {
  data() {
    return {
      add:true
    }
  },
  props: {
    table: Object
  },
  components: {
  },
  methods: {
  }
};
</script>
