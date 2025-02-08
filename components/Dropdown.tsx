import React, { type FC } from "react";
import { List } from "@/types/list";

type Dropdown = {
  list: List[];
  handleSearch: (lat: number, lng: number) => void;
};

const Dropdown: FC<Dropdown> = ({ list, handleSearch }) => {
  return (
    <>
      {list.map((item: List) => (
        <ul
          className="flex flex-col justify-end items-end cursor-pointer px-2 py-1"
          key={item?.id}
          onClick={() => handleSearch(item?.lat, item?.lng)}
        >
          <li>
            <p className="text-xs">{item?.name}</p>
          </li>
        </ul>
      ))}
    </>
  );
};

export default Dropdown;
