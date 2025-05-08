import toast from 'react-hot-toast'
import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'

const useSignin = () => {
    // const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const signin = async ({ email,phone, password }) => {
        const success = handleInputErrors({ email,phone, password })
        if (!success) {
            return
        }
        // setLoading(true) 
        try {
            const res = await fetch("http://localhost:5000/api/auth/signin", { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email,phone, password }), 
                credentials: "include"
            }
            )
            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }
            localStorage.setItem("gas-user", JSON.stringify(data)) 
            setAuthUser(data)

        } catch (err) {
            toast.error(err.message)
        } 
    }
    return { signin } 
}

export default useSignin 

function handleInputErrors({ email,phone, password }) {
    if (!email || !phone || !password) { 
        toast.error('All fields are required')
        return false
    } 
    return true
}