import { getClearedPhone } from './utils'

function $(selector: string) {
  return document.querySelector(selector)
}

export function onContactsFormSubmit(event: SubmitEvent) {
  event.preventDefault()

  const nameField = $('#contacts-name') as HTMLInputElement
  const phoneField = $('#contacts-phone') as HTMLInputElement
  const textField = $('#contacts-text') as HTMLTextAreaElement
  const checkbox = $('#contacts-agree') as HTMLInputElement
  const clearedPhone = getClearedPhone(phoneField.value)

  const validationResult = [
    validateField(nameField, 'input_has-error'),
    validatePhoneField(phoneField, 'input_has-error', clearedPhone),
    validateField(textField, 'input_has-error'),
    validateCheckbox(checkbox, 'contacts__checkbox-error_visible'),
  ]

  if (!validationResult.includes(false)) {
    alert(
      'Валидация прошла успешно: ' +
        JSON.stringify(
          {
            name: nameField.value,
            phone: clearedPhone,
            text: textField.value,
          },
          null,
          2
        )
    )
  }
}

function validateField(
  element: HTMLInputElement | HTMLTextAreaElement,
  errorClassName: string
) {
  const parent = element.parentElement!

  if (element.value.trim()) {
    parent.classList.remove(errorClassName)
    return true
  }

  parent.classList.add(errorClassName)
  return false
}

function validateCheckbox(element: HTMLInputElement, errorClassName: string) {
  const checkbox = $('#checkbox-error') as HTMLInputElement
  if (element.checked) {
    checkbox.classList.remove(errorClassName)
    return true
  }

  checkbox.classList.add(errorClassName)
  return false
}

function validatePhoneField(
  element: HTMLInputElement | HTMLTextAreaElement,
  errorClassName: string,
  clearedPhone: string
) {
  const parent = element.parentElement!

  if (clearedPhone.length === 11) {
    parent.classList.remove(errorClassName)
    return true
  }

  parent.classList.add(errorClassName)
  return false
}
