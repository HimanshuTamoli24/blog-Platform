import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input } from "../"
import authService from '../../AppWrite/auth'
import { useForm } from 'react-hook-form'
import { login } from '../../store/authSlice'

function Signup() {
    const [error, setError] = useState("")
    const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        setError("")
        try {
            const user = await authService.createAccount(data)
            if (user) {
                const userData = await authService.getUserDetails()
                if (userData) {
                    dispatch(login(userData))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
            console.error("Signup Error:", error.message)
        }
    }

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-lg font-semibold mb-2">Signup</h1>

            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email format"
                            }
                        })}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div>
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters long"
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                message: "Password must contain uppercase, lowercase, number, and special character"
                            }
                        })}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <Button type="submit">Signup</Button>
            </form>

            <p className="text-sm mt-2">
                Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
            </p>
        </div>
    )
}

export default Signup
