export function useUser() {
  const username = (item) => {
      if (item.user) {
        return item.user.call_name
      }
      else {
        return item.name
      }
    }

  return {
    username,
  }
}
