import User from "./User.model";

/* ADD ITEM TO CART */
/* Logic */
export const addToCart = async (item) => {
    // find if the product already exists in the cart or not, if yes, index will be 1, else -1;
    const itemIndex = User.cart.items.findIndex(cartItem => {
        return cartItem.itemId.toString() === item._id.toString();
    })

    let newQty = 1;
    const currentItems = [...User.cart.items];

    // if it exists, increment it, else add afresh
    if (itemIndex >= 0) {
        newQty = User.cart.items[itemIndex].itemQty + 1;
        currentItems[itemIndex].itemQty = newQty;
    } else {
        currentItems.push({
            itemId: item._id,
            itemQty: newQty,
        });
    }

    //  Updating the cart
    User.cart = {
        items: currentItems,
    }

    User.cart.items.find

    return User.save()
}
/* INCREMENT ITEM */
// export const 