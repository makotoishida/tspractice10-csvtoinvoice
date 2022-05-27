import { html, render } from 'lit-html'
import 'normalize.css'
import './style.css'
import {
  mapArrayToInvoice,
  mapCSVToArray,
  readFileAsText,
  calcInvoiceTotal,
  numToStr,
} from './utils'

const appRoot = document.querySelector<HTMLDivElement>('#app')!
const initialData = [] as Invoice[]

const handleSelectFile = async (ev: InputEvent) => {
  const input = ev.target as HTMLInputElement
  const files = input.files as FileList
  if (!files || files.length === 0) {
    return
  }

  const file = files[0]
  const str = await readFileAsText(file)
  const arr = mapCSVToArray(str)
  const invoices = mapArrayToInvoice(arr)
  const invoicesArray = Array.from(Object.values(invoices))
  console.log(invoicesArray)
  renderApp(invoicesArray)
}

const InvoiceDetail = (item: InvoiceItem) => {
  return html` <tr>
    <td>${item.prodCode}</td>
    <td>
      ${item.prodName}
      <div class="note">${item.note}</div>
    </td>
    <td class="number">${numToStr(item.price)}</td>
    <td class="number">${numToStr(item.quantity, 0)}</td>
    <td class="number">${numToStr(item.price * item.quantity)}</td>
  </tr>`
}

const InvoiceComponent = (invoice: Invoice) => {
  if (!invoice) return null

  const total = calcInvoiceTotal(invoice)

  return html`<div class="invoice">
    <h3>Invoice #${invoice.invNum}</h3>
    <div class="customer">
      <div>Date: ${invoice.invDate}</div>
      <div>To: ${invoice.custName}</div>
      <div>${invoice.custAddress1}</div>
      <div>${invoice.custAddress2}</div>
    </div>
    <table class="invoice-items">
      <tr>
        <th>Code</th>
        <th>Name</th>
        <th class="number">Price</th>
        <th class="number">Quantity</th>
        <th class="number">Extended</th>
      </tr>
      ${invoice.items.map((i) => InvoiceDetail(i))}
      <tr class="total">
        <td colspan="4">&nbsp;</td>
        <td class="number">${numToStr(total)}</td>
        <td>&nbsp;</td>
      </tr>
    </table>
    <a
      class="back"
      href="#"
      @click=${() => {
        renderApp(initialData)
      }}
      >&lt;&lt;</a
    >
  </div>`
}

const SelectFile = () => {
  return html`<p>Please select a CSV file</p>
    <input type="file" @change=${handleSelectFile} accept="text/csv" />`
}

const App = (invoices: Invoice[]) => {
  const invoice = invoices[0]
  return html`<div>${invoice ? InvoiceComponent(invoice) : SelectFile()}</div>`
}

const renderApp = (invoices: Invoice[]) => {
  render(App(invoices), appRoot)
}

renderApp(initialData)
