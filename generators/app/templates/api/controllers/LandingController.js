/**
 * LandingController
 *
 * @description :: Server-side logic for managing main landing page
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index: (req, res) => {
    const user = { username: 'admin' }
    res.view('homepage', { user })
  },

  login: (req, res) => {
    res.view('homepage')
  }
}
