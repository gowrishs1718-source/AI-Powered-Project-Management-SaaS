
import { useState } from "react";
import "./App.css";

function App() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Website Redesign",
      category: "Design",
      progress: 75,
      color: "#7c5cff",
    },
    {
      id: 2,
      name: "SaaS Dashboard",
      category: "Development",
      progress: 45,
      color: "#159d91",
    },
    {
      id: 3,
      name: "AI Integration",
      category: "Artificial Intelligence",
      progress: 25,
      color: "#e6a23c",
    },
  ]);

  const [projectName, setProjectName] = useState("");
  const [showForm, setShowForm] = useState(false);

  function handleAddProject(event) {
    event.preventDefault();

    const name = projectName.trim();

    if (name === "") {
      return;
    }

    const newProject = {
      id: Date.now(),
      name: name,
      category: "New Project",
      progress: 0,
      color: "#7c5cff",
    };

    setProjects([...projects, newProject]);
    setProjectName("");
    setShowForm(false);
  }
  
function handleDeleteProject(projectId) {
  const updatedProjects = projects.filter(
    (project) => project.id !== projectId
  );

  setProjects(updatedProjects);
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
            onClick={() => setShowForm(!showForm)}
          >
            + New Project
          </button>
        </header>

        {showForm && (
          <form className="project-form" onSubmit={handleAddProject}>
            <label htmlFor="projectName">Project name</label>

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
              Add Project
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
                className="delete-button"
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
