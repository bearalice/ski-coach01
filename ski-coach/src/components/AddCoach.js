import React, { useState } from 'react'

export default function AddCoach({ addCoach }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const onSubmit = (e) => {
        if (!name || !email) {
            alert("Please enter information!");
            return;
        }
        e.preventDefault();
        addCoach({ name, email });
        setName('');
        setEmail('');

    }
    return (
        <form onSubmit={onSubmit}>
            <div className="form-control">
                <label>Coach Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-control">
                <label>Coach Contact</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <input type="submit" value="Save Coach" />
        </form>
    )
}