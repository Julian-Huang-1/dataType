export function alignment(datas) {
    let L = datas[0].length
    return datas.map((data) => {
        if (data.length == L) {
            return data
        }
        else {
            data = [...data, ...new Array(L - data.length).fill(undefined)]
            return data
        }

    })
}