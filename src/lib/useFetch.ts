import { ref, toValue, watchEffect } from 'vue'

export function useFetch(url: string) {
  const error = ref(null)
  const isLoading = ref(true)
  const data = ref(null)

  const fetchData = () => {
    data.value = null
    error.value = null
    isLoading.value = true

    fetch(toValue(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
      .finally(() => {
        isLoading.value = false
      })
  }

  watchEffect(() => {
    fetchData()
  })

  return {
    error,
    isLoading,
    data
  }
}

export function useFetchCallback(url: string, callback: (data: any) => void) {
  const error = ref(null)
  const isLoading = ref(true)
  const data = ref(null)

  const fetchData = () => {
    data.value = null
    error.value = null
    isLoading.value = true

    fetch(toValue(url))
      .then((res) => res.json())
      .then((json) => (data.value = callback ? callback(json) : json))
      .catch((err) => (error.value = err))
      .finally(() => {
        isLoading.value = false
      })
  }

  watchEffect(() => {
    fetchData()
  })

  return {
    error,
    isLoading,
    data
  }
}
