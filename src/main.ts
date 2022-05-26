import { html, render } from 'lit-html'
import 'normalize.css'
import './style.css'

const appRoot = document.querySelector<HTMLDivElement>('#app')!

const App = () => {
  return html`<div>CSV TO INVOICE</div>`
}

const renderApp = () => {
  render(App(), appRoot)
}

renderApp()
