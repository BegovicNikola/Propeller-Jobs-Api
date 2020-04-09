const Company = require('../models/Company');
const ErrorResponse = require('../middleware/utils/errorResponse');

// @desc    Get All Companies
// @route   GET /api/v1/company
// @access  Public
const getCompanies = async (req, res, next) => {
  try {
    const companies = await Company.find();

    res.status(201).json({
      success: true,
      count: companies.length,
      data: companies,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get Single Comapny
// @route   GET /api/v1/company/:id
// @access  Public
const getCompany = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      throw new ErrorResponse(
        `Company with the id: ${req.params.id} is not found`,
        404
      );
    }

    res.status(201).json({
      success: true,
      data: company,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create Company
// @route   POST /api/v1/company
// @access  Private
const createCompany = async (req, res, next) => {
  try {
    const company = await Company.create(req.body);

    res.status(201).json({
      success: true,
      data: company,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update Company
// @route   PUT /api/v1/company/:id
// @access  Private
const updateCompany = async (req, res, next) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!company) {
      throw new ErrorResponse(
        `Company with the id: ${req.params.id} is not found`,
        404
      );
    }

    res.status(200).json({
      success: true,
      data: company,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete Company
// @route   DELETE /api/v1/company/:id
// @access  Private
const deleteCompany = async (req, res, next) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);

    if (!company) {
      throw new ErrorResponse(
        `Company with the id: ${req.params.id} is not found`,
        404
      );
    }
    console.log(company);
    res.status(200).json({
      success: true,
      data: company,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
};
