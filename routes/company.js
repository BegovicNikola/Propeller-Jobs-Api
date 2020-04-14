const express = require('express');
const {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
  getCompaniesByRadius,
} = require('../controllers/company');

const router = express.Router();

router.route('/radius/:city/:distance').get(getCompaniesByRadius);

router.route('/').get(getCompanies).post(createCompany);

router.route('/:id').get(getCompany).put(updateCompany).delete(deleteCompany);

module.exports = router;
