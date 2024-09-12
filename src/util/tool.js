import XLSX from 'xlsx'
export const getHeaderRow = (sheet) => {
    const headers = []
    const range = XLSX.utils.decode_range(sheet['!ref'])
    let C
    const R = range.s.r
    /* start in the first row */
    for (C = range.s.c; C <= range.e.c; ++C) {
        /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({
            c: C,
            r: R
        })]
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
    }
    return headers
}

//解析表格文件
export const importfxx = (rawFile) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => {
            const data = e.target.result
            const workbook = XLSX.read(data, {
                type: 'array'
            })
            const firstSheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[firstSheetName]
            const header = getHeaderRow(worksheet)
            const results = XLSX.utils.sheet_to_json(worksheet)

            resolve({
                header,
                results
            })
        }
        reader.readAsArrayBuffer(rawFile)
    })

}

//获取唯一ID
export const randomRangeId = () => {
    return (
        (Math.random() * 10000000).toString(16).substr(0, 4) +
        new Date().getTime() +
        Math.random().toString().substr(2, 5)
    );
}