import qs from 'qs'
import * as auth from 'auth-provider'

import { useAuth } from 'context/auth-context'

const apiUrl = process.env.REACT_APP_API_URL

interface Config extends RequestInit {
    data?: object,
    token?: string,
}

export const http = async(endpoint: string, {data, token, headers, ...customConfig}: Config = {}) => {
    const config = {
        method: 'GET',
        headers: {
            Authorization: token? `Bearer ${token}`: '',
            'Content-Type': data ? 'application/json' : ''
        },
        ...customConfig
    }

    if (config.method.toUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`
    } else {
        config.body = JSON.stringify(data || {})
    }
    return window.fetch(`${apiUrl}/${endpoint}`, config).then(async Response => {
        if (Response.status === 401) {
            await auth.logout()
            window.location.reload()
            return Promise.reject({message: '请重新登录'})
        }
        const data = await Response.json()
        if (Response.ok) {
            return data
        } else {
            return Promise.reject(data)
        }

    })
}

export const useHttp = () => {
    const {user} = useAuth()
    // TODO 讲解 ts操作符
    return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, {...config, token: user?.token})
}