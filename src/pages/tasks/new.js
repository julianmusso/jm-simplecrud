import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

export default function TaskFormPage() {

    const apiURL = process.env.NEXT_PUBLIC_API_URL

    const router = useRouter()

    const [newTask, setNewTask] = useState({
        title: "",
        description: ""
    })

    const [errors, setErrors] = useState({
        title: "",
        description: ""
    })

    const validate = () => {
        const errors = {}

        if(!newTask.title) errors.title = "Title is required"
        if(!newTask.description) errors.description = "Description is required"

        return errors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let errors = validate()

        if(Object.keys(errors).length) setErrors(errors)

        if (router.query.id) {
            console.log('updating')
            await updateTask();

        } else {
            console.log('submiting')
            await createTask();
        }


        await router.push('/')
    }

    const createTask = async () => {
        try {
            fetch(apiURL +"/api/tasks",{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTask)
            })
        } catch (error) {
            console.error(error)            
        }
    }

    const updateTask = async () => {
        try {
            fetch(apiURL +"/api/tasks/"+router.query.id, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTask)
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = (e) => 
    setNewTask({ ...newTask, [e.target.name]: e.target.value })

    const getTask = async () => {

        console.log(apiURL)
        console.log(router.query.id)

        const res = await fetch(`${apiURL}/api/tasks/${router.query.id}`)
        const data = await res.json();
        setNewTask({title: data.title, description: data.description})
    }
    
    useEffect(() => {
        if (router.query.id) getTask()
    }, [])

    return (
        <div className="container mx-auto max-w-screen-lg">
            <div className="flex items-center justify-center my-12">

                <form onSubmit={handleSubmit} className="w-full max-w-md p-8 shadow-md rounded-lg">
                    <div className="grid gap-6 mb-6 md:grid-cols-1">

                        <div className="sm:col-span-4">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Task Title
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Name of the task"
                                        error={errors.title ? {content: 'Please enter a title', pointing: 'below'}:null}
                                        onChange={handleChange}
                                        value={newTask.title}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-full">
                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                            Description
                        </label>
                        <div className="mt-2">
                            <textarea
                                id="description"
                                name="description"
                                rows={3}
                                className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Tell about the task"
                                onChange={handleChange}
                                value={newTask.description}
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" className="text-md font-semibold leading-6 text-gray-900"
                            onClick={() => router.push('/')}>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-sky-600 px-5 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Save
                        </button>
                    </div>

                </form>
            </div>
        </div >
    )
} 
