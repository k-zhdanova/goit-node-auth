import Contact from '../models/Contact.js';

export async function listContacts(ownerId) {
	return await Contact.findAll({ where: { owner: ownerId } });
}

export async function getContactById(id, ownerId) {
	return await Contact.findOne({ where: { id, owner: ownerId } });
}

export async function addContact(contactData, ownerId) {
	return await Contact.create({ ...contactData, owner: ownerId });
}

export async function removeContact(id, ownerId) {
	const contact = await getContactById(id, ownerId);
	if (!contact) return null;
	await Contact.destroy({ where: { id, owner: ownerId } });
	return contact;
}

export async function updateContact(id, updateData, ownerId) {
	const [affectedRows, [updatedContact]] = await Contact.update(updateData, {
		where: { id, owner: ownerId },
		returning: true,
	});
	return affectedRows ? updatedContact : null;
}

export async function updateStatusContact(id, statusData, ownerId) {
	const [affectedRows, [updatedContact]] = await Contact.update(statusData, {
		where: { id, owner: ownerId },
		returning: true,
	});
	return affectedRows ? updatedContact : null;
}
