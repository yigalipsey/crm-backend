import { searchContactController } from "../../controllers/contact/searchContactController.js";

export const SearchContactService = async (req, res) => {
  const { q } = req.query;
  console.log(q);
  try {
    const response = await searchContactController(q);
    return res.status(401).res.json(response);
  } catch (err) {
    return res.json(err);
  }
};
