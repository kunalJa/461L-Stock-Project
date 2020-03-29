import React from "react"
import { saveAs } from "file-saver"
import { utils } from "xlsx"

const ExportCSV = ({ csvData, fileName, buttonText }) => {
  const fileType = "text/csv;charset=utf-8"

  const exportToCSV = (csvData, fileName) => {
    const ws = utils.json_to_sheet(csvData)
    const csv = utils.sheet_to_csv(ws, { strip: true })
    const data = new Blob([csv], { type: fileType })
    saveAs(data, `${fileName}.csv`)
  }

  return (
    <button onClick={_ => exportToCSV(csvData, fileName)}>{buttonText}</button>
  )
}

export default ExportCSV
