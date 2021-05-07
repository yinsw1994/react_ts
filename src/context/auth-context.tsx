import React, {ReactNode, useState} from "react";
import * as auth from 'auth-provider'
import { User } from "screens/project-list/search-panel"
import { http } from "utils/http";
import { useMount } from "utils";


interface AuthForm {
    username: string,
    password: string
}

const AuthContext = React.createContext<{
    user: User|null,
    register: (form:AuthForm) => Promise<void>,
    login: (form:AuthForm) => Promise<void>,
    logout: () => Promise<void>
} | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

const bootstrapUser = async () => {
    let user = null
    const token = auth.getToken()
    if (token) {
        const data = await http('me', {token})
        user = data.user
    }
    return user
}

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null)

    // 因为这里实际上是xxx.then then里面是执行函数，并没有返回值，所以上定义的泛型
    // 是 Promise<void>
    const login = (form: AuthForm) => auth.login(form).then(setUser)
    const register = (form: AuthForm) => auth.register(form).then(setUser)
    const logout = () => auth.logout().then(() => setUser(null))

    useMount(() => {
        bootstrapUser().then(setUser)
    })

    return <AuthContext.Provider value={{ user, login, register, logout }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    // 暂时可以这么理解，如果React.useContext(AuthContext)不在AuthProvider，
    // 则形成不了context，也就是用不了
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth必须在AuthProvider中使用')
    }
    return context
}

