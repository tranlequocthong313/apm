export const parseCSV = (data: string[][]): unknown[] => {
    if (data.length < 2) return []

    const rows = data.slice(1)
    const result: { [key: string]: string }[] = []
    for (let i = 0; i < rows.length; i++) {
        const cols = rows[i]
        result.push({})
        for (let j = 0; j < cols.length; j++) {
            try {
                result[i][data[0][j]] = JSON.parse(rows[i][j])
            } catch {
                result[i][data[0][j]] = rows[i][j]
            }
        }
    }

    return result
}
