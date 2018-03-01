import React from 'react'

const LoginForm = ({ login, username, password, handleFieldChange }) => {
    return (
        <div>
        <h2>Login to application</h2>
        <form onSubmit={login}>
            <div>käyttäjätunnus
        <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleFieldChange}
                />
            </div>
            <div>
                salasana
        <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleFieldChange}
                />
            </div>
            <button type="submit">kirjaudu</button>
        </form>
        </div>
    )
}

export default LoginForm