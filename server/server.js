
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("TaskFlow Backend is running!");
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Project Management SaaS API is running!"
  });
});

// Temporary project data
let projects = [
  {
    id: 1,
    name: "Website Redesign",
    category: "Design",
    progress: 75,
    color: "#7c5cff"
  },
  {
    id: 2,
    name: "SaaS Dashboard",
    category: "Development",
    progress: 45,
    color: "#159d91"
  },
  {
    id: 3,
    name: "AI Integration",
    category: "Artificial Intelligence",
    progress: 25,
    color: "#e6a23c"
  }
];

// GET: Get all projects
app.get("/api/projects", (req, res) => {
  res.json({
    success: true,
    projects: projects
  });
});

// POST: Create a project
app.post("/api/projects", (req, res) => {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: "Project name is required"
    });
  }

  const newProject = {
    id: Date.now(),
    name: name.trim(),
    category: "New Project",
    progress: 0,
    color: "#7c5cff"
  };

  projects.push(newProject);

  res.status(201).json({
    success: true,
    project: newProject
  });
});

// DELETE: Delete a project
app.delete("/api/projects/:id", (req, res) => {
  const projectId = Number(req.params.id);

  const exists = projects.some(
    (project) => project.id === projectId
  );

  if (!exists) {
    return res.status(404).json({
      success: false,
      message: "Project not found"
    });
  }

  projects = projects.filter(
    (project) => project.id !== projectId
  );

  res.json({
    success: true,
    message: "Project deleted successfully"
  });
});
// PUT - Update an existing project
app.put("/api/projects/:id", (req, res) => {
  const projectId = Number(req.params.id);
  const { name } = req.body;

  // Find the project
  const project = projects.find(
    (project) => project.id === projectId
  );

  // Check whether project exists
  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }

  // Validate project name
  if (!name || name.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Project name is required",
    });
  }

  // Update project name
  project.name = name.trim();

  res.json({
    success: true,
    message: "Project updated successfully",
    project: project,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
