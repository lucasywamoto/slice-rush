export async function getAddress({ latitude, longitude }: Position) {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude.toString()}&longitude=${longitude.toString()}`,
  )
  if (!res.ok) throw Error('Failed getting address')

  const data = await res.json()
  return data
}
