import dbConnect from "@/utils/mongoose"
import Task from "../../../../models/Task"


export default async function handler(req, res) {
    await dbConnect()

    switch (req.method) {
        case "GET":
            try {
                const tasks = await Task.find()
                return res.status(200).json(tasks)

            } catch (error) {
                return res.status(500).json({error: error.message})
            }

        case "POST":
            try {
                const newTask = await new Task(req.body)
                const savedTask = await newTask.save()
                return res.status(201).json(savedTask)

            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
            

        default: return res.status(400).json({ msg: "Request can't be processed: Please use a valid method." })
    }


}
