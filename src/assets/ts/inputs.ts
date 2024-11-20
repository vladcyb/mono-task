document.addEventListener('DOMContentLoaded', () => {
  const inputs: NodeListOf<HTMLInputElement> =
    document.querySelectorAll('.input')

  inputs.forEach((item) => {
    changeInputValueClasses(item)

    const inputField = getFieldInput(item)

    inputField?.addEventListener('input', () => {
      changeInputValueClasses(item)
    })

    inputField?.addEventListener('focus', () => {
      item.classList.add('input_focused')
    })

    inputField?.addEventListener('blur', () => {
      item.classList.remove('input_focused')
    })

    if (item.classList.contains('input_phone')) {
      inputField?.addEventListener('input', phoneInputEventListener)
    }
  })
})

function changeInputValueClasses(input: HTMLInputElement) {
  const inputField = getFieldInput(input)

  if (inputField?.value) {
    input.classList.add('input_has-value')
  } else {
    input.classList.remove('input_has-value')
  }
}

function getFieldInput(input: HTMLInputElement): HTMLInputElement | null {
  return input.querySelector('.input__field')
}

/**
 * Обработчик для телефонных полей
 * */
function phoneInputEventListener(this: HTMLInputElement, e: Event) {
  const input = e.target as HTMLInputElement
  const prefixNumber = (str: string) => {
    if (str === '7') {
      return '7-('
    }
    return '7-(9'
  }

  const value = input.value.replace(/\D+/g, '')
  const numberLength = 11

  let result
  if (input.value.includes('+8') || input.value[0] === '8') {
    result = ''
  } else {
    result = '+'
  }

  for (let i = 0; i < value.length && i < numberLength; i++) {
    switch (i) {
      case 0:
        result += prefixNumber(value[i])
        continue
      case 4:
        result += ')-'
        break
      case 7:
        result += '-'
        break
      case 9:
        result += '-'
        break
      default:
        break
    }
    result += value[i]
  }

  const newValue = result.padEnd(18, '+7-(___)-___-__-__'.slice(result.length))
  input.value = newValue
  const match = newValue.match(/.*\d/)

  if (match) {
    setCursorPosition(input, match[0].length)
  }

  setTimeout(() => {
    changeInputValueClasses(input.parentElement as HTMLInputElement)
  }, 0)
}

function setCursorPosition(field: HTMLInputElement, position: number) {
  setTimeout(() => field.setSelectionRange(position, position), 0)
}
