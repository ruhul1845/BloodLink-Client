import locationData from "./bangladesh-locations.json";

export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const locations = locationData;

export const districts = Object.keys(locations).sort((a, b) => a.localeCompare(b));

export function upazilasFor(district) {
  return locations[district] || [];
}

export function initials(name = "U") {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
