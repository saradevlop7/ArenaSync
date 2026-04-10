import StatusBadge from "./StatusBadge.js";

export default function TournamentCard(tournament) {
  return `
    <div class="border rounded p-4 shadow mb-4">
      <h2 class="font-bold text-lg">${tournament.title}</h2>
      ${StatusBadge({ status: tournament.status })}
      <p>${tournament.sport} - ${tournament.date}</p>
      <p>${tournament.location}</p>
    </div>
  `;
}