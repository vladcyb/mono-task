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
