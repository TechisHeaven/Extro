import React, { HTMLProps } from "react";
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

interface DropDownProps {
  items: DropDownItemProps[];
  className?: HTMLProps<HTMLElement>["className"];
}

export interface DropDownItemProps {
  id: number | string;
  title: string;
  icon?: any;
  image?: string;
  placeholder?: string;
}

const SelectDropDown = ({ items, className }: DropDownProps) => {
  return (
    <Select>
      <SelectTrigger className={cn("w-full", className)}>
        <SelectValue className="font-semibold" placeholder={items[0]?.title} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="font-semibold">
          {items?.map((item, index) => {
            return (
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
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectDropDown;
