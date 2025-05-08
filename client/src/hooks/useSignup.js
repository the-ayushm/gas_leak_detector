import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'

const useSignUp = () => {
    // const [loading, setLoading] = useState(false)
    const {setAuthUser} = useAuthContext()
    const signup = async ({ fullName, email, phone, sensorId, password, confirmPassword }) => {
        const success = handleInputErrors({ fullName, email, phone, sensorId, password, confirmPassword})
        if (!success) {
            return
        }
        // setLoading(true)
        try {
            const res = await fetch("http://localhost:5000/api/auth/signup", { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({fullName, email, phone, sensorId, password, confirmPassword})

            })
            const data = await res.json()
            if(data.error){
                throw new Error(data.error)
            }
            // localstorage
            localStorage.setItem("gas-user" , JSON.stringify(data)) 
            // context
            setAuthUser(data)
        } catch (err) {
            toast.error(err.message)
        } 
    }
    return {signup} 
}

export default useSignUp

function handleInputErrors({ fullName, email, phone, sensorId, password , confirmPassword}) {
    if (!fullName || !email || !phone || !sensorId || !password || !confirmPassword) {
        toast.error('All fields are required')
        return false
    }
    if (password !== confirmPassword) {
        toast.error('Passwords do not match')
        return false
    }
    if (password.length < 6) {
        toast.error('Password must be atleast 6 characters long')
        return false
    }
    return true
}