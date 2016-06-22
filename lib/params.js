export default (source, context, selector) => {
  if (source === undefined) {
    return { source: context, context: selector, selector: undefined }
  }

  if (context === undefined) {
    return { source, context: selector, selector: undefined }
  }

  return { source, context, selector }
}
