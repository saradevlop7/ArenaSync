import { StatusBadge } from "./StatusBadge.js";

export function ParticipantRow(participant) {
  return `
    <div class="flex items-center gap-4 bg-white p-3 rounded shadow">
      <img 
        src="${participant.avatar}" 
        class="w-10 h-10 rounded-full"
      />
      <span class="flex-1">${participant.name}</span>
      ${StatusBadge(participant.status)}
    </div>
  `;
}