<template>
  <v-select
    v-model="active"
    clearable
    variant="outlined"
    density="compact"
    :label="customLabel"
    :items="activeItems"
    item-title="text"
    item-value="value"
    @update:modelValue="onUpdateActive"
  ></v-select>
</template>

<script>
export default {
  props: {
    modelValue: String,
    getItems: Function,
    label: String,
  },
  emits: [
    'update:modelValue'
  ],
  data() {
    return {
      activeItems: [
        {
          text: this.$t('common.YES'),
          value: 'true'
        },
        {
          text: this.$t('common.NO'),
          value: 'false'
        }
      ],
    }
  },
  computed: {
    active: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    },
    customLabel() {
      if (!this.label) {
        return this.$t('common.ACTIVE')
      }

      return this.label
    },
  },
  methods: {
    onUpdateActive() {
      this.getItems()
    },
  }
}
</script>
