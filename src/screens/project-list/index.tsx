import React, { useEffect, useState } from 'react';
import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { cleanObject, useDebounce, useMount } from 'utils';
import * as qs from 'qs'

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
    const [users, setUsers] = useState([])
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const debouncedParam = useDebounce(param, 500)
    const [list, setList] = useState([])
    // name=${param.name}&personId=${param.personId}
    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`)
            .then(async response => {
                if (response.ok) {
                    setList(await response.json())
                }
            })
    }, [debouncedParam])

    useMount(() => {
        fetch(`${apiUrl}/users`).then(async response => {
            if (response.ok) {
                setUsers(await response.json())
            }
        })
    })


    return <div>
        <SearchPanel
            param={param}
            setParam={setParam}
            users={users}
        ></SearchPanel>
        <List list={list} users={users}></List>
    </div>
}