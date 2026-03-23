const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: [String],
    image: { type: String }, // URL or local path
    githubLink: { type: String },
    liveLink: { type: String },
    featured: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
