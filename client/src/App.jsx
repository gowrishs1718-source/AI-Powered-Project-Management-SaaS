import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
useEffect(() => {
  async function fetchProjects() {
    try {
      const response = await fetch("http://localhost:5000/api/projects");

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();

      setProjects(data.projects);
    } catch (error) {
      console.log("Error:", error.message);
      setError("Unable to load projects from backend");
    } finally {
      setLoading(false);
    }
  }

  fetchProjects();
}, []);


  const [projectName, setProjectName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  
async function handleSaveProject(event) {
  event.preventDefault();

  const name = projectName.trim();

  if (name === "") {
    return;
  }

  try {
    // EDIT existing project
    if (editingProjectId !== null) {
      const response = await fetch(
        `http://localhost:5000/api/projects/${editingProjectId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: name }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update project");
      }

      setProjects((previousProjects) =>
        previousProjects.map((project) =>
          project.id === editingProjectId
            ? data.project
            : project
        )
      );
    } 

    // ADD new project
    else {
      const response = await fetch(
        "http://localhost:5000/api/projects",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: name }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create project");
      }

      setProjects((previousProjects) => [
        ...previousProjects,
        data.project,
      ]);
    }

    // Reset form
    setProjectName("");
    setShowForm(false);
    setEditingProjectId(null);

  } catch (error) {
    console.log("Error:", error.message);
    setError(error.message);
  }
}
async function handleDeleteProject(projectId) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/projects/${projectId}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete project");
    }

    setProjects((previousProjects) =>
      previousProjects.filter((project) => project.id !== projectId)
    );

  } catch (error) {
    console.log("Delete error:", error.message);
    setError(error.message);
  }
}

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2 className="brand">TaskFlow<span>.</span></h2>
        <p className="menu-label">WORKSPACE</p>

        <nav>
          <a className="nav-link active" href="#overview">
            ◫ Overview
          </a>
          <a className="nav-link" href="#projects">
            ▣ Projects
          </a>
          <a className="nav-link" href="#tasks">
            ✓ My Tasks
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="avatar">G</div>
          <div>
            <strong>My Workspace</strong>
            <p>Free Plan</p>
          </div>
        </div>
      </aside>

      <main className="main-content" id="overview">
        <header className="topbar">
          <div>
            <p className="eyebrow">WORKSPACE / OVERVIEW</p>
            <h1>Welcome to TaskFlow! 👋</h1>
            <p className="subtitle">
              Manage and track your projects.
            </p>
          </div>

          <button
            className="primary-button"
            onClick={() => {
              setProjectName("");
              setEditingProjectId(null);
              setShowForm(!showForm);
            }}
          >
            + New Project
          </button>
        </header>

        {showForm && (
          <form className="project-form" onSubmit={handleSaveProject}>
           <label htmlFor="projectName">
            {editingProjectId !== null ? "Edit Project Name" : "Project name"}
          </label>

            <input
              id="projectName"
              type="text"
              placeholder="Enter your project name"
              value={projectName}
              onChange={(event) =>
                setProjectName(event.target.value)
              }
            />

            <button className="primary-button" type="submit">
              {editingProjectId !== null ? "Update Project" : "Add Project"}
            </button>
            <button
              type="button" className="cancel-button"
              onClick={() => {
                setShowForm(false);
                setProjectName("");
                setEditingProjectId(null);
              }}
              >
                Cancel
            </button>
          </form>
        )}

        <section className="stats-grid" id="tasks">
          <div className="stat-card">
            <p>Total Projects</p>
            <h2>{projects.length}</h2>
            <span>Projects in your workspace</span>
          </div>

          <div className="stat-card">
            <p>Active Tasks</p>
            <h2>24</h2>
            <span>Sample statistic</span>
          </div>

          <div className="stat-card">
            <p>Completed</p>
            <h2>86</h2>
            <span>Sample statistic</span>
          </div>

          <div className="stat-card">
            <p>Team Members</p>
            <h2>08</h2>
            <span>Sample statistic</span>
          </div>
        </section>


        {loading && <p>Loading projects...</p>}
        {error && <p>{error}</p>}


        <section className="projects-section" id="projects">
          <div className="section-heading">
            <div>
              <h2>Your Projects</h2>
              <p>Track your project progress.</p>
            </div>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.id}>
                <div className="project-top">
                  <span
                    className="project-icon"
                    style={{ color: project.color }}
                  >
                    ◆
                  </span>

                  <span className="project-status">
                    {project.progress === 100
                      ? "Completed"
                      : "In progress"}
                  </span>
                </div>

                <p className="category">{project.category}</p>
                <h3>{project.name}</h3>
                <button
                  className="edit-button"  type="button"
                  onClick={() => {
                    setProjectName(project.name);
                    setEditingProjectId(project.id);
                    setShowForm(true);
                  }}
                >
                  Edit Project
                </button>
                
              <button
                className="delete-button"  type="button"
                onClick={() => handleDeleteProject(project.id)}
              >
                Delete Project
              </button>

                <div className="progress-label">
                  <span>Progress</span>
                  <strong>{project.progress}%</strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${project.progress}%`,
                      backgroundColor: project.color,
                    }}
                  />
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer>TaskFlow © 2026 · Built with React</footer>
      </main>
    </div>
  );
}

export default App;
