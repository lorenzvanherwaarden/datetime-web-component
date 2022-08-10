function parseUTCDate(value: string) {
  if (value.endsWith('z') || value.endsWith('Z')) {
    return new Date(value)
  }

  return new Date(value + 'Z')
}

export default parseUTCDate
