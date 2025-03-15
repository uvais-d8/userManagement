import  React, { useState } from "react"

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar:React.FC<SearchBarProps> = ({onSearch}) => {
    const [query,setQuery]=useState<string>("")
    const handlechange= (e:React.ChangeEvent<HTMLInputElement>)=>{
e.preventDefault()
setQuery(e.target.value)
onSearch(e.target.value)

    }
  return (
<div className="">
  <form className="max-w-md mx-auto">
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-white sr-only dark:text-white">
      Search
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        type="search"
        id="default-search"
        className="block w-full p-4 ps-10 text-sm text-white border border-gray-500 rounded-lg bg-black focus:ring-gray-300 focus:border-gray-300 placeholder-gray-400"
        placeholder="Search..."
        required
        value={query}
        onChange={handlechange}
      />
      <button
        hidden
        type="submit"
        className="text-white absolute end-2.5 bottom-2.5 bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium rounded-lg text-sm px-4 py-2"
        onClick={(e) => e.preventDefault()}
      >
        Search
      </button>
    </div>
  </form>
</div>

  )
}

export default SearchBar