import { html, render } from 'lit-html'
import 'normalize.css'
import './style.css'

const appRoot = document.querySelector<HTMLDivElement>('#app')!


const readFileAsText = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(reader.error)
    reader.onload = () => resolve((reader.result as string) || '')
    reader.readAsText(file)
  })
}

const mapCSVToArray = (csv: string): string[][] => {
  return csv
    .split('\n')
    .filter((row) => row.length > 0)
    .map((row) => row.split(','))
}

const handleSelectFile = async (ev: InputEvent) => {
  const input = ev.target as HTMLInputElement
  const files = input.files as FileList
  if (!files || files.length === 0) {
    return
  }

  const file = files[0]
  const str = await readFileAsText(file)
  const arr = mapCSVToArray(str)
  console.log(arr)
}

const App = () => {
  return html`<div>
    <p>Please select a CSV file</p>
    <input type="file" @change=${handleSelectFile} accept="text/csv" />
  </div>`
}

const renderApp = () => {
  render(App(), appRoot)
}

renderApp()
