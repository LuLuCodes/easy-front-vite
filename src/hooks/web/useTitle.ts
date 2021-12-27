import { watch, unref } from 'vue'
import { useTitle as usePageTitle } from '@vueuse/core'
import { useRouter } from 'vue-router'

export function useTitle() {
  const appTitle = import.meta.env.VITE_GLOB_APP_TITLE
  const { currentRoute } = useRouter()

  const pageTitle = usePageTitle()

  watch(
    () => currentRoute.value.path,
    () => {
      const route = unref(currentRoute)

      const title = route?.meta?.title
      pageTitle.value = title ? ` ${appTitle} - ${title} ` : `${appTitle}`
    },
    { immediate: true },
  )
}
