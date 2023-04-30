import Error from "next/error"
import { useState } from "react";
import { useRouter } from 'next/router'

export default function TaskDetail({ task, error }) {
    const [showModal, setShowModal] = useState(false);
    const router = useRouter()
    const [isDeleting, setIsDeleting] = useState(false)

    const apiURL = process.env.NEXT_PUBLIC_API_URL

    const deleteTask = async () => {
        const { id } = router.query;
        try {
            await fetch(`${apiURL}/api/tasks/${id}`, {
                method: "DELETE",
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handleDelete = () => {
        setIsDeleting(true)
        deleteTask()
        setShowModal(false)
        router.push("/")
    }

    if (error && error.statusCode) return <Error statusCode={error.statusCode} title={error.statusText} />

    return (
        <>
            <div className="container mx-auto max-w-screen-lg">
                <div className="flex items-center justify-center my-12">
                    <div className="w-full max-w-md p-8 shadow-md rounded-lg">
                        <div className="my-2 font-bold text-lg">{task.title}</div>
                        <div className="mb-2">{task.description}</div>
                        <div>
                            {isDeleting ? (
                                <button
                                    type="button"
                                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    disabled
                                >
                                    <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                                    </svg>
                                    Delete</button>

                            ) :

                                <button
                                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    onClick={() => setShowModal(true)}
                                >
                                    Delete</button>
                            }
                        </div>
                    </div>

                </div>
            </div >
            {
                showModal ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-2xl font-semibold">
                                            Are you sure ?
                                        </h3>
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => handleDelete()}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null
            }
        </>
    )
}

export async function getServerSideProps({ query: { id } }) {

    const apiURL = process.env.NEXT_PUBLIC_API_URL

    const res = await fetch(`${apiURL}/api/tasks/${id}`)
    if (res.status === 200) {
        const task = await res.json()
        return {
            props: {
                task
            }
        }
    }

    return {
        props: {
            error: {
                statusCode: res.status,
                statusText: "Request can't be processed"
            }
        }
    }
}
