import { onContactsFormSubmit } from './on-contacts-form-submit'

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contacts-form') as HTMLFormElement

  form.addEventListener('submit', onContactsFormSubmit)
})
