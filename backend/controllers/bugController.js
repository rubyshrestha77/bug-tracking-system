const Bug = require('../models/Bug');

const createBug = async (req, res) => {
    const { title, description, stepsToReproduce, severity } = req.body;

    if (!title || !title.trim()) {
        return res.status(400).json({ message: 'Title is required' });
    }
    if (!description || !description.trim()) {
        return res.status(400).json({ message: 'Description is required' });
    }
    if (!stepsToReproduce || !stepsToReproduce.trim()) {
        return res.status(400).json({ message: 'Steps to reproduce are required' });
    }
    if (!['Critical', 'Major', 'Minor', 'Trivial'].includes(severity)) {
        return res.status(400).json({ message: 'Valid severity is required' });
    }

    try {
        const bug = await Bug.create({
            title,
            description,
            stepsToReproduce,
            severity,
            reporter: req.user.id
        });
        res.status(201).json(bug);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBugs = async (req, res) => {
    try {
        const bugs = await Bug.find()
            .populate('reporter', 'name')
            .populate('assignee', 'name')
            .sort({ createdAt: -1 });
        res.status(200).json(bugs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBugById = async (req, res) => {
    try {
        const bug = await Bug.findById(req.params.id)
            .populate('reporter', 'name')
            .populate('assignee', 'name');

        if (!bug) {
            return res.status(404).json({ message: 'Bug not found' });
        }

        res.status(200).json(bug);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(404).json({ message: 'Bug not found' });
        }
        res.status(500).json({ message: error.message });
    }
};

const assignBug = async (req, res) => {
    const { priority } = req.body;

    if (!['High', 'Medium', 'Low'].includes(priority)) {
        return res.status(400).json({ message: 'Priority is required' });
    }

    try {
        const bug = await Bug.findById(req.params.id);

        if (!bug) {
            return res.status(404).json({ message: 'Bug not found' });
        }

        if (bug.status !== 'New') {
            return res.status(422).json({
                message: 'Only bugs with status New can be assigned'
            });
        }

        bug.priority = priority;
        bug.assignee = req.user.id;
        bug.status = 'Assigned';
        await bug.save();

        const updated = await Bug.findById(bug._id)
            .populate('reporter', 'name')
            .populate('assignee', 'name');

        res.status(200).json(updated);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(404).json({ message: 'Bug not found' });
        }
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createBug, getBugs, getBugById, assignBug};