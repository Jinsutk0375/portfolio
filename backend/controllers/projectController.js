const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch(error) {
    res.status(500).json({message: error.message});
  }
};

// @desc    Get a single project
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch(error) {
    res.status(500).json({message: error.message});
  }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = async (req, res) => {
  try {
    const { title, description, techStack, image, githubLink, liveLink, featured } = req.body;

    const project = new Project({
      title,
      description,
      techStack,
      image,
      githubLink,
      liveLink,
      featured
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch(error) {
    res.status(500).json({message: error.message});
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
const updateProject = async (req, res) => {
  try {
    const { title, description, techStack, image, githubLink, liveLink, featured } = req.body;

    const project = await Project.findById(req.params.id);

    if (project) {
      project.title = title || project.title;
      project.description = description || project.description;
      project.techStack = techStack || project.techStack;
      project.image = image || project.image;
      project.githubLink = githubLink || project.githubLink;
      project.liveLink = liveLink || project.liveLink;
      project.featured = featured !== undefined ? featured : project.featured;

      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch(error) {
    res.status(500).json({message: error.message});
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      await project.deleteOne();
      res.json({ message: 'Project removed' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch(error) {
    res.status(500).json({message: error.message});
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
