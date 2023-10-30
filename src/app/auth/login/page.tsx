"use client";

import { FormEvent, useState } from "react";
import { login } from "@/api/auth";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setError('');

            await login({ email, password });

            router.push('/admin/dashboard');
        } catch (e) {
            setError('Have error login api');
        }
    };

    return (
        <>
            <div>Login Page</div>

            <form action="#" method="POST" onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                    <input type="email" placeholder="Email" name="email" value={email}
                           onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <input type="password" placeholder="Password" name="email" value={password}
                           onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </>
    );
};

export default LoginPage;
