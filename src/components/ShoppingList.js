import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/items')
      .then(r => r.json())
      .then(items => setItems(items))
  }, [])

  function handleAddItem(item) {
    setItems([...items, item])
  }

  function handleCart(item) {
    const updatedItems = items.map(oItem => {
      return oItem.id === item.id ? item : oItem
    })
    setItems(updatedItems)
  }

  function handleDelete(item) {
    const updatedItems = items.filter(remainingItem => remainingItem.id !== item.id)
    setItems(updatedItems)
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onAddToCart={handleCart} onDelete={handleDelete} id={item.id} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
