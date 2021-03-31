import Vue from 'vue'
import autoInstallComponent from '~/components/autoInstallComponent'
import utils from '~/utils/utils'

Vue.use(autoInstallComponent)

// eslint-disable-next-line
export default function (context, inject) {
  inject('utils', utils)
}
