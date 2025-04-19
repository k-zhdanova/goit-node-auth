import {
	listContacts,
	getContactById,
	addContact,
	removeContact,
	updateContact,
	updateStatusContact,
} from '../services/contactsServices.js';

import {
	createContactSchema,
	favoriteContactSchema,
	updateContactSchema
} from '../schemas/contactsSchemas.js';

export async function getAllContacts(req, res, next) {
	try {
		const contacts = await listContacts();
		res.status(200).json(contacts);
	} catch (error) {
		next(error);
	}
}

export async function getOneContact(req, res, next) {
	try {
		const { id } = req.params;
		const contact = await getContactById(id);
		if (!contact) {
			return res.status(404).json({ message: 'Not found' });
		}
		res.status(200).json(contact);
	} catch (error) {
		next(error);
	}
}

export async function deleteContact(req, res, next) {
	try {
		const { id } = req.params;
		const deleted = await removeContact(id);
		if (!deleted) {
			return res.status(404).json({ message: 'Not found' });
		}
		res.status(200).json(deleted);
	} catch (error) {
		next(error);
	}
}

export async function createContact(req, res, next) {
	try {
		const { error } = createContactSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.message });
		}
		const newContact = await addContact(req.body);
		res.status(201).json(newContact);
	} catch (error) {
		next(error);
	}
}

export async function updateContactById(req, res, next) {
	try {
		if (Object.keys(req.body).length === 0) {
			return res.status(400).json({ message: 'Body must have at least one field' });
		}
		const { error } = updateContactSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.message });
		}
		const { id } = req.params;
		const updated = await updateContact(id, req.body);
		if (!updated) {
			return res.status(404).json({ message: 'Not found' });
		}
		res.status(200).json(updated);
	} catch (error) {
		next(error);
	}
}

export async function updateFavorite(req, res, next) {
	try {
		const { error } = favoriteContactSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ message: error.message });
		}
		const { contactId } = req.params;
		const updated = await updateStatusContact(contactId, req.body);
		if (!updated) {
			return res.status(404).json({ message: 'Not found' });
		}
		res.status(200).json(updated);
	} catch (error) {
		next(error);
	}
}
