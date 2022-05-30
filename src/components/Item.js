import React from "react";

function Item({ item, onAddToCart, onDelete, id }) {

  function handleCart() {
    const config = {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({isInCart: !item.isInCart})
    }
    fetch(`http://localhost:4000/items/${id}`, config)
      .then(r => r.json())
      .then(item => onAddToCart(item))
  }


  function handleDelete() {
    fetch(`http://localhost:4000/items/${id}`, {method: 'DELETE'})
      .then(r => r.json())
      .then(() => onDelete(item))
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={handleCart}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default Item;
