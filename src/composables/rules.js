import { ref, reactive, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'

const useRules = () => {
  const i18n = useI18n()
  const state = reactive({
    password: null,
  })

  const rules = ref({
    required: (v) => !!v || i18n.t('error.REQUIRED_FIELD'),
    requiredSelect: (v) => !!v && v.length > 0 || i18n.t('error.REQUIRED_FIELD'),
    alphaNumber: (v) => /^[a-zA-Z0-9]*$/.test(v) ||
      i18n.t('error.ALPHABETS_NUMBER_ONLY'),
    emailRules: (v) =>
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
      i18n.t('error.INVALID_EMAIL'),
    samePassword: (v) =>
      v === state.password || i18n.t('error.PASSWORD_NOT_MATCH'),
  })

  return {
    ...toRefs(state),
    rules,
  }
}

export default useRules
