import Admin from "../model/Admin.model.js";
import Items from "../model/items.model.js";

/* ADD ITEMS */
export const addItem = async (req, res) => {
    const { title,
        price,
        description } = req.body;
    let item;
    // Todo later, check if item exist, if it does increment, if ordered decerement
}