import { useId } from "react";
import { bloodGroups, districts, upazilasFor } from "@/lib/data";

export function BloodGroupSelect(props) {
  return (
    <select className="field" {...props}>
      <option value="">Blood group</option>
      {bloodGroups.map((group) => <option key={group}>{group}</option>)}
    </select>
  );
}

function SearchableLocation({ options, placeholder, ...props }) {
  const listId = useId();
  return (
    <>
      <input className="field" list={listId} placeholder={placeholder} autoComplete="off" {...props} />
      <datalist id={listId}>
        {options.map((option) => <option value={option} key={option} />)}
      </datalist>
    </>
  );
}

export function DistrictSelect(props) {
  return <SearchableLocation options={districts} placeholder="Type or select district" {...props} />;
}

export function UpazilaSelect({ district, ...props }) {
  return <SearchableLocation options={upazilasFor(district)} placeholder={district ? "Type or select upazila" : "Select district first"} {...props} />;
}
