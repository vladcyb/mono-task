export function getClearedPhone(phone: string) {
  return phone.replace(/\D+/g, '')
}
