import React from 'react'
import { FaTimes } from 'react-icons/fa';
import { AiFillEdit } from "react-icons/ai";
import { Link } from 'react-router-dom';

export default function Task({ coach, deleteCoach, editCoach }) {
    return (
        <li>
            <div>
                <div>
                    <Link to={`/coaches/${coach._id}`}>
                        <p>{coach.name}</p>

                    </Link>
                    <FaTimes onClick={() => { deleteCoach(coach._id) }} />
                    <a href="/">
                        <AiFillEdit onClick={() => { deleteCoach(coach._id) }} />
                    </a>
                </div>
                <p>{coach.email}</p>
            </div>
        </li>
    )
}