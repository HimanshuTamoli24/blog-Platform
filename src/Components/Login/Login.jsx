import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from "../../store/authSlice"
import { Button, Input } from "../"
import authService from '../../AppWrite/auth'
import { useForm } from 'react-hook-form'

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");
        try {
            const session = await authService.login(data);
            const userData = await authService.getUserDetails();
            if (userData) {
                dispatch(authLogin(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message || "Invalid email or password");
            console.error("Login :: error", error);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-lg font-semibold mb-2">Welcome Back!</h2>
            <p className="mb-4">Don't have an account? <Link to="/signup" className="text-blue-500">Sign up here</Link></p>

            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit(login)} className="space-y-4">
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

                <Button type="submit">Login</Button>

                <div className="text-sm mt-2">
                    <Link to="/forgot-password" className="text-blue-500">Forgot Password?</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
