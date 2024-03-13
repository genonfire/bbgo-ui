<template>
  <v-row
    class="pt-5"
  >
    <v-col
      cols="2"
      class="pt-3 hidden-sm-and-down"
    >
      {{ tallyItems }}
    </v-col>
    <v-col
    >
      <v-pagination
        v-model="page"
        :length="pagination.page_total"
        :total-visible="6"
        variant="flat"
        active-color="secondary"
        density="comfortable"
        @click="onPageClick"
      >
      </v-pagination>
    </v-col>
    <v-col
      cols="2"
      class="text-right hidden-sm-and-down"
    >
      <v-select
        v-model="pageSize"
        variant="outlined"
        density="compact"
        :items="pageSizeItems"
        item-title="text"
        item-value="value"
        @update:modelValue="onUpdatePageSize"
      ></v-select>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    modelValue: Number,
    pagination: Object,
    getItems: Function,
  },
  emits: [
    'update:modelValue'
  ],
  data() {
    return {
      page: 1,
      pageSizeItems: [
        {
          text: this.$t('hint.PAGESIZE_BY', { pageSize: 20 }),
          value: 20
        },
        {
          text: this.$t('hint.PAGESIZE_BY', { pageSize: 50 }),
          value: 50
        },
        {
          text: this.$t('hint.PAGESIZE_BY', { pageSize: 100 }),
          value: 100
        }
      ],
    }
  },
  computed: {
    pageSize: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    },
    tallyItems() {
      return this.$t('hint.TALLY_ITEMS', { total: this.pagination.item_total })
    },
  },
  methods: {
    onPageClick() {
      this.getItems(this.page)
    },
    onUpdatePageSize() {
      this.page = 1
      this.getItems(this.page)
    },
  }
}
</script>
