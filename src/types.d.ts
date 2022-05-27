type InvoiceItem = {
  prodCode: string
  prodName: string
  price: number
  quantity: number
  note: string
}

type Invoice = {
  invNum: string
  invDate: string
  custName: string
  custAddress1: string
  custAddress2: string
  items: InvoiceItem[]
}

type Invoices = {
  [key: string]: Invoice
}
