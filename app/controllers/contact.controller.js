const Boom = require("boom");

const Contact = require("../models/contact.model");

const ctrl = {};
module.exports = ctrl;

ctrl.create = async (req, res, next) => {
  const { fullName, number } = req.body;

  const isDuplicate = await Contact.findOne(
    {
      number: {
        $regex: number,
        $options: "i"
      }
    },
    "_id"
  ).lean();

  if (isDuplicate) {
    return next(Boom.conflict("Contact with This Number Already Exists."));
  }

  const contact = await new Contact({ fullName, number, user: req.user._id }).save();

  res.status(201).json(contact);
};

ctrl.update = async (req, res, next) => {
  const { fullName, number, contactId } = req.body;
  const userId = req.user._id;

  let contact = await Contact.findOne({ _id: contactId, user: userId }).lean();

  if (number != contact.number) {
    const isDuplicate = await Contact.findOne(
      {
        number: {
          $regex: number,
          $options: "i"
        },
        user: userId
      },
      "_id"
    ).lean();

    if (isDuplicate) {
      return next(Boom.conflict("Contact with This Number Already Exists."));
    }
  }

  updateData.fullName = fullName || contact.fullName;
  updateData.number = number || contact.number;

  await Contact.updateOne({ _id: contactId, user: userId }, updateData, { runValidators: true });

  res.status(200).json({ ...contact, ...updateData });
};

ctrl.getAll = async (req, res, next) => {
  let { page, contactsPerPage, name, number } = req.query;

  page = parseInt(page) || 1;
  contactsPerPage = parseInt(contactsPerPage) || 50;

  if (contactsPerPage > 50) {
    throw Boom.badRequest("Contacts Per Page Can't be greater than 50.");
  }

  const limit = contactsPerPage;
  const offset = page * limit - limit;

  const query = {};

  if (name) {
    query.fullName = {
      $regex: name,
      $options: "i"
    };
  }

  if (number) {
    query.number = {
      $regex: number,
      $options: "i"
    };
  }

  const [contacts, totalCount] = await Promise.all([
    Contact.find(query)
      .skip(offset)
      .limit(limit)
      .lean(),

    Contact.countDocuments(query).lean()
  ]);

  if (!contacts.length) {
    throw Boom.notFound("No Contacts Not Found for This Query.");
  }

  const data = {
    contacts,
    totalCount,
    selectedPage: page,
    contactsPerPage,
    totalPages: Math.ceil(result.count / contactsPerPage)
  };

  res.status(200).json(data);
};
