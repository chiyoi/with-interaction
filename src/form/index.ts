export const PayloadJSONWithFiles = (payload: {}, files: { blob: Blob, filename: string }[]) => {
  const form = new FormData()
  form.append('payload_json', new Blob([JSON.stringify(payload)], { type: 'application/json' }))
  for (const i in files) form.append(`files[${i}]`, files[i].blob, files[i].filename)
  return form
}
