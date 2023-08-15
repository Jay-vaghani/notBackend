const ErrorHandler = require("../middleware/error");
const Task = require("../models/Task");

module.exports.newTask = async (req, res, next) => {

    try {
        const { title, description } = req.body

        await Task.create({ title, description, user: req.user.id, })

        res.status(201).json({
            success: true,
            message: "Task is created"
        })
    } catch (error) {
        next(error)
    }
}

module.exports.getMyTask = async (req, res, next) => {
    try {
        const userId = req.user.id

        const tasks = await Task.find({ user: userId })

        res.status(200).json({
            success: true,
            tasks
        })
    } catch (error) {
        next(error)
    }
}

module.exports.updateTask = async (req, res, next) => {
    try {
        const { id } = req.params

        let task = await Task.findById(id)

        if (!task) {
            return next(new ErrorHandler("Task Not Found", 404))
        }

        task.isCompleted = !task.isCompleted

        await task.save()

        res.status(200).json({
            success: true,
            message: "Task updated",
            task
        })
    } catch (error) {
        next(error)
    }
}

module.exports.deleteTask = async (req, res, next) => {

    try {
        const { id } = req.params

        let task = await Task.findById(id)

        if (!task) {
            return next(new ErrorHandler("Task Not Found", 404))
        }

        await task.deleteOne()


        res.status(200).json({
            success: true,
            message: "Task deleted",
        })
    } catch (error) {
        next(error)
    }


}