import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Authlayout({
    children,
    Status = true
}) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if (Status && authStatus !== Status) {
            navigate('/login')
        } else if (!Status && authStatus !== Status) {
            navigate('/')

        }
        setLoader(false)
    }, [authStatus, navigate, Status])

    return loader ? <div>Loading...</div> : children
}