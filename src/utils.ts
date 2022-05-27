export const readFileAsText = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(reader.error)
    reader.onload = () => resolve((reader.result as string) || '')
    reader.readAsText(file)
  })
}

export const mapCSVToArray = (csv: string): string[][] => {
  return csv
    .split('\n')
    .filter((row) => row.length > 0)
    .map((row) => row.split(',').map((i) => i.trim()))
}

export const mapArrayToInvoice = (rows: string[][]) => {
  const invoices = {} as Invoices
  rows.forEach((row) => {
    const [
      invNum,
      invDate,
      custName,
      custAddress1,
      custAddress2,
      prodCode,
      prodName,
      price,
      quantity,
      note,
    ] = row
    const invoice = {
      invNum,
      invDate,
      custName,
      custAddress1,
      custAddress2,
      items: [
        {
          prodCode,
          prodName,
          price: parseFloat(price),
          quantity: parseFloat(quantity),
          note,
        },
      ],
    } as Invoice

    if (invNum !== 'invNum') {
      if (invoices[invNum]) {
        invoices[invNum].items.push(invoice.items[0])
      } else {
        invoices[invNum] = invoice
      }
    }
  })
  return invoices
}

export const calcInvoiceTotal = (invoice: Invoice) => {
  const total = invoice.items.reduce(
    (prev, i) => prev + i.price * i.quantity,
    0
  )
  return total
}

export const numToStr = (n: number, decimals: number = 2) => {
  return n.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}
