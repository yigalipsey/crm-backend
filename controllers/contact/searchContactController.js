import Contact from "../../models/ContactModel.js";

export const searchContactController = async (query) => {
  try {
    if (!query) {
      return { code: 103, err: true, msg: "Search query is required" };
    }

    // Determine if the query is a phone number or a name
    const isPhoneNumber = /^\d+$/.test(query); // Check if query contains only digits

    // Build the search query based on the query type
    let searchQuery;
    if (isPhoneNumber) {
      searchQuery = { $or: [{ phone: query }, { mobile: query }] }; // Search by phone or mobile
    } else {
      // Assuming your Contact model has 'name' field (adjust if needed)
      searchQuery = { firstName: { $regex: query, $options: "i" } }; // Case-insensitive name search
    }

    const contactFound = await Contact.findOne(searchQuery);

    if (!contactFound) {
      return { code: 104, err: true, msg: "Contact not found" };
    } else {
      return {
        code: 100,
        err: false,
        name: contactFound.name, // Assuming you have a 'name' field in the Contact model
        contact: contactFound, // Return the entire contact object
      };
    }
  } catch (err) {
    console.error(err);
    return { err: true, msg: err.toString() };
  }
};
