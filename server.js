/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Karl Shiu          Student ID: 131531246       Date: 2025-06-13
*
*  Published URL: https://assignment3-karlshiu.onrender.com/

*
********************************************************************************/

const express = require("express");
const path = require("path");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

const projectData = require("./modules/projects");

app.use(express.static("public"));

projectData.initialize().then(() => {
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"));
  });
  app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"));
  });
  app.get("/solutions/projects", (req, res) => {
    const sector = req.query.sector;

    if (sector) {
      projectData.getProjectsBySector(sector)
        .then(data => res.json(data))
        .catch(err => res.status(404).send(err));
    } else {
      projectData.getAllProjects()
        .then(data => res.json(data))
        .catch(err => res.status(404).send(err));
    }
  });
  app.get("/solutions/projects/:id", (req, res) => {
    const projectId = parseInt(req.params.id);

    projectData.getProjectById(projectId)
      .then(data => res.json(data))
      .catch(err => res.status(404).send(err));
  });
  app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
  });
  app.listen(HTTP_PORT, () => {
    console.log(`Server listening on port ${HTTP_PORT}`);
  });
}).catch(err => {
  console.error("Failed to start server:", err);
});
