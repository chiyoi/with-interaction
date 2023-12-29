export function PayloadJSONWithFiles(payload: string, files: { blob: Blob, filename: string }[]) {
  const form = new FormData()
  form.append('payload', new Blob([JSON.stringify(payload)], { type: 'application/json' }))
  for (const i in files) form.append(`files[${i}]`, files[i].blob, files[i].filename)
  return form
}
