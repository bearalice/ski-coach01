import React from 'react'
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Task({ coach, deleteCoach }) {
    return (
        <li>
            <div>
                <div>
                    <Link to={`/coaches/${coach._id}`}>
                        <p>{coach.name}</p>

                    </Link>
                    <FaTimes onClick={() => { deleteCoach(coach._id) }} />
                </div>
                <p>{coach.email}</p>
            </div>
        </li>
    )
}