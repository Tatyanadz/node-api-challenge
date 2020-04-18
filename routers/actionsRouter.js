const express = require('express')
const db = require('../data/helpers/actionModel')

const router = express.Router();


//GET
router.get('/', (req, res, next) => {
    db.get()
      .then(response => {
          res.json(response)
      })
      .catch(err => {
          next(err)
      })
})

//POST
router.get('/', (req, res, next) => {
    db.insert(req.body)
      .then(response => {
          res.json(response)
      })
      .catch(err => {
          next(err)
      })
})

//PUT
router.put('/:id', validateId(), (req, res, next) => {
    db.update(req.params.id, req.body)
      .then(response => {
          res.json(response)
      })
      .catch(err => {
          next(err)
      })
})

//DELETE
router.delete('/:id', validateId(), validateAction(), (req, res) => {
    db.remove(req.params.id)
      .then(response => {
          res.json({
              message: "Project was deleted",
              response
          })
      })
      .catch(err => {
          next(err)
      })
})


//middleware functions 

function validateId() {
    return (req, res, next) => {
        db.get(req.params.id)
          .then(action => {
              if (action) {
                  req.action = action
                  next()
              } else {
                  res.status(400).json({
                      message: 'Invalid ID'
                  })
              }
          })
          .catch(err => {
              next(err)
          })
    }
}

function validateAction() {
    return (req, res, next) => {
        const action = req.body
        if (!action.project_id) {
            res.status(400).json({
                message: "Please provide a valid ID"
            })
        } else if (!action.notes) {
            res.status(400).json({
                message: "Please provide notes for the action"
            })
        } else if (!action.description) {
            res.status(400).json({
                message: "Please provide description"
            })
        } else {
            next()
        }
    }
}

module.exports = router


