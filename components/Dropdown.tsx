import React, { FC } from "react";

type Dropdown = {
  list: any;
  handleSearch: (lat: number, lng: number) => void;
};

const Dropdown: FC<Dropdown> = ({ list, handleSearch }) => {
  return (
    <>
      {list.map((item: any) => (
        <ul
          className="flex flex-col justify-end items-end cursor-pointer p-1"
          key={item?.id}
          onClick={() => handleSearch(item?.lat, item?.lng)}
        >
          <li>
            <p className="text-sm">{item?.name}</p>
          </li>
        </ul>
      ))}
    </>
  );
};

export default Dropdown;
