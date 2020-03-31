// @desc    Get All Companies
// @route   GET /api/v1/company
// @access  Public
const getCompanies = (req, res, next) => {
  res.send({
    success: true,
    data: 'Get all companies'
  });
};

// @desc    Get Single Comapny
// @route   GET /api/v1/company/:id
// @access  Public
const getCompany = (req, res, next) => {
  res.send({
    success: true,
    data: `Get a company with the id: ${req.params.id}`
  });
};

// @desc    Create Company
// @route   POST /api/v1/company
// @access  Private
const createCompany = (req, res, next) => {
  res.send({
    success: true,
    data: 'Create a company'
  });
};

// @desc    Update Company
// @route   PUT /api/v1/company/:id
// @access  Private
const updateCompany = (req, res, next) => {
  res.send({
    success: true,
    data: `Update a company with the id: ${req.params.id}`
  });
};

// @desc    Delete Company
// @route   DELETE /api/v1/company/:id
// @access  Private
const deleteCompany = (req, res, next) => {
  res.send({
    success: true,
    data: `Delete a company with the id: ${req.params.id}`
  });
};

module.exports = {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany
};
