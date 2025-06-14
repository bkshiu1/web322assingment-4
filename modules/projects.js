const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

let projects = [];

const initialize = () => {
    return new Promise((resolve, reject) => {
        try {
            projects = [];
            projectData.forEach(proj => {
                const sector = sectorData.find(sec => sec.id === proj.sector_id);
                projects.push({
                    ...proj,
                    sector: sector ? sector.sector_name : "Unknown"
                });
            });
            resolve();
        } catch (err) {
            reject("Initialization failed: " + err);
        }
    });
};

const getAllProjects = () => {
    return new Promise((resolve, reject) => {
        if (projects.length > 0) {
            resolve(projects);
        } else {
            reject("No projects found.");
        }
    });
};

const getProjectById = (projectId) => {
    return new Promise((resolve, reject) => {
        const found = projects.find(p => p.id === projectId);
        if (found) {
            resolve(found);
        } else {
            reject("Project not found.");
        }
    });
};

const getProjectsBySector = (sector) => {
    return new Promise((resolve, reject) => {
        const matched = projects.filter(p => 
            p.sector.toLowerCase().includes(sector.toLowerCase())
        );
        if (matched.length > 0) {
            resolve(matched);
        } else {
            reject("No projects found for the given sector.");
        }
    });
};

module.exports = {
    initialize,
    getAllProjects,
    getProjectById,
    getProjectsBySector
};
