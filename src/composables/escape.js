export function useEscape() {
  const title = (item) => {
    let output = null

    if (item) {
      output = item.replace(/%/g, '').replace(/ /g, '_')
    }

    return output
  }

  return {
    title,
  }
}
