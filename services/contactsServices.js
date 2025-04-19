import Contact from '../models/Contact.js';

export async function listContacts() {
	return await Contact.findAll();
}

export async function getContactById(id) {
	return await Contact.findByPk(id);
}

export async function addContact(contactData) {
	const newContact = await Contact.create(contactData);
	return newContact;
}

export async function removeContact(id) {
	const contact = await getContactById(id);
	if (!contact) {
		return null;
	}
	await Contact.destroy({ where: { id } });
	return contact;
}

export async function updateContact(id, updateData) {
	const [affectedRows, [updatedContact]] = await Contact.update(updateData, {
		where: { id },
		returning: true,
	});
	return affectedRows ? updatedContact : null;
}

export async function updateStatusContact(contactId, body) {
	const [affectedRows, [updatedContact]] = await Contact.update(body, {
		where: { id: contactId },
		returning: true,
	});
	return affectedRows ? updatedContact : null;
}
