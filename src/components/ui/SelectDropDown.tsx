"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface DropDownProps<T> {
  items: DropDownItemProps[];
  setValue?: (name: T, value: any) => void;
  name?: T;
  className?: string;
}

export interface DropDownItemProps {
  id: number | string;
  title: string;
  icon?: any;
  image?: string;
  placeholder?: string;
}

const SelectDropDown = <T extends string>({
  items,
  className,
  setValue,
  name,
}: DropDownProps<T>) => {
  const [selectedValue, setSelectedValue] = useState(items[0]?.title || "");

  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    if (setValue && name) {
      setValue(name, value);
    }
  };

  useEffect(() => {
    if (!selectedValue && items.length > 0) {
      setSelectedValue(items[0]?.title);
      if (setValue && name) {
        setValue(name, items[0].title);
      }
    }
  }, [items, selectedValue, setValue, name]);

  return (
    <Select onValueChange={handleSelectChange} value={selectedValue}>
      <SelectTrigger className={cn("w-full", className)}>
        <SelectValue
          className="font-semibold"
          placeholder={
            <h4 className="inline-flex items-center gap-2">
              {items[0].icon && !items[0].image ? items[0].icon : null}
              {items[0].image && !items[0].icon ? (
                <Image
                  loading="eager"
                  alt="icon-image"
                  src={items[0].image}
                  width={20}
                  height={20}
                />
              ) : null}
              {items[0].title}
            </h4>
          }
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="font-semibold">
          {items?.map((item, index) => (
            <SelectItem key={index} value={item.title}>
              <h4 className="inline-flex items-center gap-2">
                {item.icon && !item.image ? item.icon : null}
                {item.image && !item.icon ? (
                  <Image
                    loading="eager"
                    alt="icon-image"
                    src={item.image}
                    width={20}
                    height={20}
                  />
                ) : null}
                {item.title}
              </h4>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectDropDown;
