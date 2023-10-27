"use client"

import { FormEvent, useState } from "react";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();


    }

    return (
        <>
            <div>Login Page</div>

            <form action="#" method="POST" onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                    <input type="email" placeholder="Email" name="email" value={email} />
                </div>
                <div className="mb-3">
                    <input type="password" placeholder="Password" name="email" value={password} />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </>
    );
}

export default LoginPage;
