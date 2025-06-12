const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../app-error");


exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError("Name can not be empty", 400));
    }
    try {
        const contactService = new ContactService(MongoDB.client)
        const document = await contactService.create(req.body)
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError("An error occurred while creating the contact", 500)
        );
    }
};
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const contactService = new ContactService (MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await contactService.findByName(name);
        } else {
            documents = await contactService.find({});
        }
    } catch (error) {
        return next(new ApiError ("An error occurred while retrieving contacts", 500));
    }

    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);
        if(!document) {
            return next(new ApiError ("Contact not found", 404));
        }
        return res.send(document);
    } catch (error) {
        return next(
             new ApiError('Error retrieving contact with id=${req.params.id}', 500));
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length == 0) {
        return next(new ApiError("Data to update can not be empty", 400));
    }
    try {
        const contactService = new ContactService (MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);
        if (!document) {
            return next (new ApiError("Contact not found", 404));
        }
        return res.send({ message: "Contact was updated successfully" });
    } catch (error) {
        return next(new ApiError(`Error updating contact with id=${req.params.id}`, 500));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const contactService = new ContactService (MongoDB.client);
        const document = await contactService.delete(req.params.id);
        if (!document) {
            return next(new ApiError ("Contact not found", 404));
        }
        return res.send({ message: "Contact was deleted successfully" });
    } catch (error) {
        return next(new ApiError('Could not delete contact with id=${req.params.id}', 500));
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const deletedCount = await contactService.deleteAll();
        return res.send({ message: `${deletedCount} contacts were deleted successfully` });
    } catch (error) {
        return next(new ApiError("An error occurred while removing all contacts", 500));
    }
};


exports.findAllFavorite = async (req, res, next) => {
    try {
        const contactService = new ContactService (MongoDB.client);
        const documents = await contactService.findFavorite();
        return res.send(documents);
    } catch (error) {
        return next(new ApiError("An error occurred while retrieving favorite contacts", 500));
    }
};
