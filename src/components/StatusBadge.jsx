export function StatusBadge(status) {

  let color = "bg-gray-400";

  if (status === "On Going") {
    color = "bg-green-500";
  } else if (status === "Upcoming") {
    color = "bg-blue-500";
  } else if (status === "Pending") {
    color = "bg-orange-500";
  }

  return `
    <span class="${color} text-white px-3 py-1 rounded-full text-sm">
      ${status}
    </span>
  `;
}