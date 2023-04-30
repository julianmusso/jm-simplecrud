import { useRouter } from 'next/router'

export default function Home({ tasks }) {

  const router = useRouter();

  if (tasks.length === 0) return (
    <div className="flex flex-col items-center min-h-screen justify-center container mx-auto">

      <div className="my-6 ">There is not tasks yet.</div>
      <div className="">
        <button className="mt-3 px-5 py-2 bg-sky-600 text-slate-100 rounded">Create a Task</button>
      </div>
    </div>
  )

  return (
    <>

      {/*CARD LISTING */}
      <div className="flex items-center min-w-screen justify-center container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-12">

          {/* Begin of Task.map() */
            tasks.map((task) => (

              <div key={task._id} className="m-6 p-6 max-w-sm rounded-lg shadow-md">

                <div className="my-2 font-bold text-lg">{task.title}</div> {/* Title */}

                <div className="grid grid-cols-1 divide-y"> {/* Description + Buttons */}
                  <div className="mb-2">{task.description}</div>
                  <div className="flex">
                    <div>
                      <button className="mt-3 mr-2 px-5 py-2 bg-sky-600 text-slate-100 rounded"
                        onClick={() => router.push(`/tasks/${task._id}`)}>
                        View</button>
                    </div>
                    <div>
                      <button className="mt-3 mr-2 px-5 py-2 bg-slate-300 rounded"
                        onClick={() => router.push(`/tasks/${task._id}/edit`)}>Edit</button>
                    </div>
                  </div>
                </div>

              </div>

            )) /* End of Task.map() */
          }
        </div>
      </div>



    </>
  )
}

export const getServerSideProps = async (ctx) => {

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const res = await fetch(`${apiUrl}/api/tasks`);
  const tasks = await res.json();

  return {
    props: {
      tasks,
    }
  }
}