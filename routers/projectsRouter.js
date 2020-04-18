const express = require("express")
const db = require("../data/helpers/projectModel")

const router = express.Router()

// GET 
router.get("/", (req, res, next) => {
  db.get()
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      next(err);
    });
});

// GET by ID
router.get("/:id", validateId(), (req, res, next) => {
  db.getProjectActions(req.params.id)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      next(err);
    });
});

// POST 
router.post("/", validateProject(), (req, res, next) => {
  db.insert(req.body)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      next(err);
    });
});

// PUT 
router.put("/:id", validateId(), (req, res) => {
  db.update(req.params.id, req.body)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      next(err);
    });
});

// DELETE 
router.delete("/:id", validateId(), (req, res, next) => {
  db.remove(req.params.id)
    .then(response => {
      res.json({
        message: "Project was deleted.",
        response
      });
    })
    .catch(err => {
      next(err);
    });
});

// middleware functions
function validateId() {
  return (req, res, next) => {
    db.get(req.params.id)
      .then(response => {
        if (!response) {
          res.status(404).json({
            message: "A project with that ID does not exist."
          });
        } else {
          next();
        }
      })
      .catch(err => {
        next(err);
      });
  };
}

function validateProject() {
  return (req, res, next) => {
    const project = req.body;
    if (!project.name) {
      res.status(400).json({
        message: "Please provide the name."
      });
    } else if (!project.description) {
      res.status(400).json({
        message: "Please provide the required description"
      });
    } else if (!project) {
      message: "Please provide project data.";
    } else {
      next();
    }
  };
}

module.exports = router;

