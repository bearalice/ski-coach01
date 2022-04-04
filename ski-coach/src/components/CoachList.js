import React from 'react'
import Coach from './Coach'

export default function TasksList({ coaches, deleteCoach }) {
    return (
        <>
            {coaches.map((coach) => (
                <Coach key={coach._id} coach={coach} deleteCoach={deleteCoach} />
            ))}
        </>
    )
}