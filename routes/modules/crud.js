const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// Detail function
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// Edit Function
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
router.put('/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const category = req.body.category
  const rating = req.body.rating
  const image = req.body.image
  const location = req.body.location
  const googleMap = req.body.googleMap
  const phone = req.body.phone
  const description = req.body.description
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.category = category
      restaurant.rating = rating
      restaurant.image = image
      restaurant.location = location
      restaurant.googleMap = googleMap
      restaurant.phone = phone
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// Delete Function
router.delete('/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Sort Function
router.get('/:sort', (req, res) => {
  let sort = req.params.sort
  Restaurant.find()
    .lean()
    .sort(sort)
    .then(restaurants => res.render('index', { restaurants, sort }))
    .catch(error => console.log(error))
})

module.exports = router