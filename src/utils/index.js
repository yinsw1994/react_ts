export const isFalsy = (value) => value === 0 ? false: !value

export const cleanObject = (object) => {
    const result = { ...object }
    Object.keys(object).forEach(key => {
        const value = object[key]
        if (isFalsy(value)) {
            delete result[key]
        }
    })
    return result
}