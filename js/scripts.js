const addressForm = document.querySelector('#address-form')
const cepInput = document.querySelector('#cep')
const addresInput = document.querySelector('#rua')
const cityInput = document.querySelector('#cidade')
const neighborhoodInput = document.querySelector('#neighborhood')
const regionInput = document.querySelector('#region')
const formInputs = document.querySelectorAll('[data-input]')
const closeButton = document.querySelector('#close-message')
const fadeElement = document.querySelector('#fade')

//Validação do CEP:
cepInput.addEventListener('keypress', e => {
  const onlyNumbers = /[0-9]/
  const key = String.fromCharCode(e.keyCode)

  //Permitir somente números:
  if (!onlyNumbers.test(key)) {
    e.preventDefault()
    alert('Digite apenas números')
    return
  }
})

//Captar cep:
cepInput.addEventListener('keyup', e => {
  const inputValue = e.target.value

  //Checar se temos um cep valido:
  if (inputValue.length === 8) {
    getAddress(inputValue)
  }
})

//Requisitar dados da API:
const getAddress = async cep => {
  console.log(cep)
  toggleLoader()

  cepInput.blur()

  const apiUrl = `https://viacep.com.br/ws/${cep}/json/`

  const response = await fetch(apiUrl)

  const data = await response.json()

  console.log(data)
  //console.log(formInputs)
  //console.log(data.erro)

  //Mostrar erro e resetar form:
  if (data.erro === 'true') {
    if (!addressInput.hasAttribute('disabled')) {
      toggleDisabled()
    }

    addressForm.reset()
    toggleLoader()
    toggleMessage('CEP Inválido, tente novamente.')
    return
  }
}

//Função de exibir ou ocultar o Loader:
const toggleLoader = () => {
  const loaderElement = document.querySelector('#loader')

  fadeElement.classList.toggle('hide')
  loaderElement.classList.toggle('hide')
}

//Função de exibir ou fechar mensagem:
const toggleMessage = msg => {
  const messageElement = document.querySelector('#message')
  const messageElementText = document.querySelector('#message p')

  messageElementText.innerText = msg

  fadeElement.classList.toggle('hide')
  messageElement.classList.toggle('hide')
}

// Close message modal
closeButton.addEventListener('click', () => toggleMessage())
