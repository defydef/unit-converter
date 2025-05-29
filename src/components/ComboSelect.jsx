import { useState } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

export default function ComboSelect({ items, selected, onSelect }) {
  const [query, setQuery] = useState("");
  const filteredItems =
    query === ""
      ? items
      : items.filter((item) => {
          return item.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      value={selected}
      onChange={(value) => onSelect(value)}
      onClose={() => setQuery("")}
    >
      <div className="relative">
        <ComboboxInput
          className={clsx(
            "w-full rounded border border-gray-700 py-2 pr-8 pl-3 text-sm/6",
            "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25"
          )}
          displayValue={(item) => item}
          onChange={(event) => setQuery(event.target.value)}
        />
        <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5 cursor-pointer">
          <ChevronDownIcon className="size-4 fill-white/60 group-data-hover:fill-white" />
        </ComboboxButton>
      </div>

      <ComboboxOptions
        anchor="bottom"
        transition
        className={clsx(
          "w-(--input-width) rounded-xl border border-white/5 p-1 [--anchor-gap:--spacing(1)] empty:invisible",
          "transition duration-100 ease-in",
          "bg-base-100 cursor-pointer"
        )}
      >
        {filteredItems.map((item, index) => (
          <ComboboxOption
            key={index}
            value={item}
            className="group flex items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10 z-10"
          >
            <CheckIcon className="invisible size-4 fill-white group-data-selected:visible" />
            <div className="text-sm/6 text-white">{item}</div>
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
}
