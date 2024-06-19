import { useRef, useState, useEffect, FC } from "react"
import store from "store";

type SearchProps = {
  findItem: (text: string) => void
}

const Search: FC<SearchProps> = ({ findItem }) => {
  const [filter, setFilter] = useState<string>(store.get("filter") || "");
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (input.current) {
      input.current.value = filter;
    }
  }, [filter])

  function handleInputChange () {
    if (input.current) {
      const value = input.current.value;
      setFilter(value);
      store.set("filter", value);
      findItem(value);
    }
  }

  return (
    <input
      className="search-form"
      type="text"
      placeholder="Введите название товара"
      ref={input}
      onChange={handleInputChange}
    />
  );
}

export default Search