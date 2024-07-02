import { FC, memo } from "react"
import { RootStateType, reduxStore } from "../reduxStore";
import { useSelector } from "react-redux";

type SearchProps = {
  findItem: (text: string) => void
}

const Search: FC<SearchProps> = memo(({ findItem }) => {

  const filter = useSelector((state: RootStateType) => state.filter.input)

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    reduxStore.dispatch({ type: "INPUT_CHANGE", payload: value })
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