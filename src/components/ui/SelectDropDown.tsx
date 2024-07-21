import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";

const SelectDropDown = () => {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue className="font-semibold" placeholder="Week" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="font-semibold">
          <SelectItem value="week">Week</SelectItem>
          <SelectItem value="month">Month</SelectItem>
          <SelectItem value="year">Year</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectDropDown;
