import { useState } from "react";

export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(5);
  //// Mivel ezt a Statet megkell osztanom a <Form> egy testvérével (<Packinglist>>) felkell helyeznem (liftup) a közös Patrent Componentjükbe, hogy mind a kettő használni tudja
  // const [items, setItems] = useState([]);
  function handleSubmit(e) {
    // Meg akadályozza a HTML default Event működését (Frissítené az egész oldalt)
    e.preventDefault();

    //Guard feltétel, ha nincs kitöltve a description akkor visszatér a függvény és nem csinál semmit.
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {/* <option value={1}>1</option> */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        // Ha változik valami az input fielden, akkor frissíti a statet automatikusan, event. targer az input fieldre mutat
        value={description}
        onChange={(e) => {
          // console.log(e.target.value);
          setDescription(e.target.value);
        }}
      ></input>
      <button>Add</button>
    </form>
  );
}
