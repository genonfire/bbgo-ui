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
        v-model="pageModel"
        :length="pagination.page_total"
        :total-visible="smAndUp ? 6 : 4"
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
        v-if="pageSize"
      ></v-select>
    </v-col>
  </v-row>
</template>

<script>
import { useDisplay } from 'vuetify'

export default {
  setup() {
    const { smAndUp } = useDisplay()
    return { smAndUp }
  },
  props: {
    modelValue: Number,
    pagination: Object,
    getItems: Function,
    page: {
      type: Number,
      default: 1,
    },
  },
  emits: [
    'update:modelValue'
  ],
  data() {
    return {
      pageModel: this.page,
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
      this.getItems(this.pageModel)
    },
    onUpdatePageSize() {
      this.pageModel = 1
      this.getItems(this.pageModel)
    },
  }
}
</script>
