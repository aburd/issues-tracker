import React from 'react'
import RepoLinks from '../../../components/RepoLinks'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'

export const HomeView = () => (
  <div>
    <p>レポジトリーを選択してください。</p>
    <RepoLinks />
  </div>
)

export default HomeView
