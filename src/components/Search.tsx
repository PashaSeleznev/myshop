import { useState, FC, memo } from "react"
import store from "store";

type SearchProps = {
  findItem: (text: string) => void
}

const Search: FC<SearchProps> = memo(({ findItem }) => {
  const [filter, setFilter] = useState<string>(store.get("filter") || "");

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setFilter(value);
    store.set("filter", value);
    findItem(value);
  }

  return (
    <input
      className="search-form"
      type="text"
      placeholder="Введите название товара"
      value={filter}
      onChange={handleInputChange}
    />
  );
})

export default Search