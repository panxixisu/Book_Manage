<template>
  <div>
    <div :v-if="$store.state.isshow">
      <h1>{{ $store.state.data}}</h1>
    </div>
  </div>
</template>
<script>
export default {
  name: "show",
  props: {
    msg: Number,
  },

  props: {
    msg: String,
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
    getdata: function () {},
  },
};
</script>