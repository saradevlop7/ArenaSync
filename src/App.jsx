import { useEffect, useMemo, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { fetchTournaments } from './data/tournamentDB'
import { filterBySport } from './services/dataFilter'
import HomePage from './pages/HomePage'
import TournamentPage from './pages/TournamentPage'

const SPORTS_FILTER_ALL = 'All'

function App() {
  const [tournaments, setTournaments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [selectedSport, setSelectedSport] = useState(SPORTS_FILTER_ALL)
  const [searchQuery, setSearchQuery] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true

    async function load() {
      try {
        const data = await fetchTournaments()
        if (!isMounted) return
        setTournaments(data)
      } catch (e) {
        if (!isMounted) return
        setError('Impossible de charger les tournois.')
        console.error(e)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    load()
    return () => {
      isMounted = false
    }
  }, [])

  const sportsFilters = useMemo(() => {
    const sports = new Set(tournaments.map((t) => t.sport))
    return [SPORTS_FILTER_ALL, ...Array.from(sports)]
  }, [tournaments])

  const filteredTournaments = useMemo(() => {
    const bySport = filterBySport(
      tournaments,
      selectedSport === SPORTS_FILTER_ALL ? null : selectedSport,
    )
    if (!searchQuery.trim()) return bySport
    const q = searchQuery.toLowerCase()
    return bySport.filter((t) => t.title.toLowerCase().includes(q))
  }, [tournaments, selectedSport, searchQuery])

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            loading={loading}
            error={error}
            sportsFilters={sportsFilters}
            selectedSport={selectedSport}
            onChangeSport={setSelectedSport}
            filteredTournaments={filteredTournaments}
            searchQuery={searchQuery}
            onChangeSearch={setSearchQuery}
            onOpenTournament={(id) => navigate(`/tournament/${id}`)}
          />
        }
      />
      <Route
        path="/tournament/:id"
        element={<TournamentPage tournaments={tournaments} loading={loading} error={error} />}
      />
    </Routes>
  )
}

export default App
