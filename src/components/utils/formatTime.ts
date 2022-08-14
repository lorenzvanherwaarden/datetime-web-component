function formatTime(value: number) {
  const formatted = value.toString()

  return formatted.length === 2 ? formatted : '0' + formatted
}

export default formatTime
