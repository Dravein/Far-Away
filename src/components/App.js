import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "Charger", quantity: 1, packed: false },
// ];

export default function App() {
  //<Form> Componentből fölhelyezett State
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    ////Reactba nem szabad változtatni a meglévő Arrayt (Immutable) ezért így nem jó új Arrayt kell létrehozni.
    // setItems((items) => items.push(item));

    ////Helyette:
    setItems((items) => [...items, item]);
  }

  //Items listáról tudjunk törölni itemet.
  function handleDeleteItem(id) {
    // console.log("Kiírja ha csak a függvényt adom át az Item button onclickjébe");
    // Új Arrayal tér vissza. Minden itemmel aminek az ID-je nem a megadott, így töröljük a megadott ID-t.
    console.log(id);
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete the list?"
    );
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      {/* Handle funckiókat Props értékbe átadni onFunkciónével szoktuk*/}
      <Form onAddItems={handleAddItems} />
      {/* Itt helyezem át hogy a <PackingList> használni tudja. */}
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
