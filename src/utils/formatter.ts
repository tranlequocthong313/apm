export const formatDatetime = (d: Date | string) => {
    if (typeof d === 'string') {
        d = new Date(d)
    }
    return (
        d.getUTCFullYear() +
        "-" +
        ("0" + (d.getUTCMonth() + 1)).slice(-2) +
        "-" +
        ("0" + d.getUTCDate()).slice(-2) +
        " " +
        ("0" + d.getUTCHours()).slice(-2) +
        ":" +
        ("0" + d.getUTCMinutes()).slice(-2) +
        ":" +
        ("0" + d.getUTCSeconds()).slice(-2)
    )
}
