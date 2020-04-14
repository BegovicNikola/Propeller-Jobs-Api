const Company = require('../models/Company');
const ErrorResponse = require('../middleware/utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../middleware/utils/geocoder');
const formatParams = require('./utils/formatting');

// @desc    Get All Companies
// @route   GET /api/v1/company
// @access  Public
const getCompanies = asyncHandler(async (req, res, next) => {
  let query;
  const reqQuery = { ...req.query };

  const removeFields = ['select', 'sort'];
  removeFields.forEach((param) => delete reqQuery[param]);

  let queryString = JSON.stringify(reqQuery);

  queryString = queryString.replace(
    /\b(gt|gte|lt|lte|eq|in)\b/g,
    (match) => `$${match}`
  );

  query = Company.find(JSON.parse(queryString));

  if (req.query.select) {
    const fields = formatParams(req.query.select);
    query = query.select(fields);
  }

  if (req.query.sort) {
    const sortBy = formatParams(req.query.sort);
    query = query.sort(sortBy);
  } else {
    query = query.sort('name');
  }

  const companies = await query;

  res.status(201).json({
    success: true,
    count: companies.length,
    data: companies,
  });
});

// @desc    Get Single Comapny
// @route   GET /api/v1/company/:id
// @access  Public
const getCompany = asyncHandler(async (req, res, next) => {
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
});

// @desc    Create Company
// @route   POST /api/v1/company
// @access  Private
const createCompany = asyncHandler(async (req, res, next) => {
  const company = await Company.create(req.body);

  res.status(201).json({
    success: true,
    data: company,
  });
});

// @desc    Update Company
// @route   PUT /api/v1/company/:id
// @access  Private
const updateCompany = asyncHandler(async (req, res, next) => {
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
});

// @desc    Delete Company
// @route   DELETE /api/v1/company/:id
// @access  Private
const deleteCompany = asyncHandler(async (req, res, next) => {
  const company = await Company.findByIdAndDelete(req.params.id);

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
});

// @desc    Get Companies by Radius
// @route   GET /api/v1/radius/:zip/:distance
// @access  Private
const getCompaniesByRadius = asyncHandler(async (req, res, next) => {
  const { city, distance } = req.params;
  const cityFormat = city.split('-').join(' ');

  const loc = await geocoder.geocode(cityFormat);
  const longitude = loc[0].longitude;
  const latitude = loc[0].latitude;

  const radius = distance / 6378.1;

  const companies = await Company.find({
    location: {
      $geoWithin: { $centerSphere: [[longitude, latitude], radius] },
    },
  });

  res.status(200).json({
    success: true,
    count: companies.length,
    data: companies,
  });
});

module.exports = {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
  getCompaniesByRadius,
};
