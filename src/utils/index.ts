import {useEffect, useState} from 'react'

export const isFalsy = (value:any) => value === 0 ? false: !value

export const cleanObject = (object: object) => {
    const result = { ...object }
    Object.keys(object).forEach(key => {
        //@ts-ignore
        const value = object[key]
        if (isFalsy(value)) {
            //@ts-ignore
            delete result[key]
        }
    })
    return result
}

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
    }, [])
}

export const useDebounce = (value: any, delay?: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        // 每次在value变化后，设置一个定时器
        const timeout = setTimeout(() => setDebouncedValue(value), delay)
        // 每次在上一个useEffect处理完后再运行
        return () => clearTimeout(timeout)
    }, [value, delay])

    return debouncedValue
}