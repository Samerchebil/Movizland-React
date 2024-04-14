import React from 'react'
import { Logo } from './Logo'
import Search from './Search'
import { NumResult } from './NumResult'

export const Navigation = ({ query, setQuery,movies }) => {
  return (
    <nav className="nav-bar">
    <Logo />
    <Search query={query} setQuery={setQuery} />
    <NumResult movies={movies} />
  </nav>  )
}
