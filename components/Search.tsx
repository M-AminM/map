import React, { type ComponentPropsWithoutRef, type FC } from "react";
import Image from "next/image";
import search from "@/assets/images/search.svg";

type SearchProps = ComponentPropsWithoutRef<"input"> & {};

const Search: FC<SearchProps> = ({
  value,
  onChange,
  placeholder,
  type,
  dir,
}) => {
  return (
    <div className="flex flex-row-reverse justify-center px-2 bg-white rounded">
      <div className="flex ">
        <Image src={search} alt="" width={20} height={20} />
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="p-2 w-full outline-none text-sm bg-white text-black"
        dir={dir}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
