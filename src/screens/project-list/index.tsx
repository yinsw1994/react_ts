import React, { useEffect, useState } from 'react';
import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { cleanObject, useDebounce, useMount } from 'utils';
import * as qs from 'qs'

import { useHttp } from 'utils/http'
import styled from '@emotion/styled';

// const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
    const [users, setUsers] = useState([])
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const debouncedParam = useDebounce(param, 500)
    const [list, setList] = useState([])
    // name=${param.name}&personId=${param.personId}

    const client = useHttp()

    useEffect(() => {
        client('projects', {
            data: cleanObject(debouncedParam)
        }).then(setList)
        // fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`)
        //     .then(async response => {
        //         if (response.ok) {
        //             setList(await response.json())
        //         }
        //     })
    }, [debouncedParam])

    useMount(() => {
        client('users').then(setUsers)
        // fetch(`${apiUrl}/users`).then(async response => {
        //     if (response.ok) {
        //         setUsers(await response.json())
        //     }
        // })
    })


    return <Container>
        <h1>项目列表</h1>
        <SearchPanel
            param={param}
            setParam={setParam}
            users={users}
        ></SearchPanel>
        <List list={list} users={users}></List>
    </Container>
}

const Container = styled.div`
  padding: 3.2rem;
`;

