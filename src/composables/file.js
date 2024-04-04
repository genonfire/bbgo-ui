export function useFile() {
  const fileSize = (byteSize) => {
    const size = byteSize / 1024
    if (size < 1024) {
      return size.toFixed(2) + " KB"
    } else {
      return (size / 1024).toFixed(2) + " MB"
    }
  }

  return {
    fileSize,
  }
}
