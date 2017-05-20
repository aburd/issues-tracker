import React from 'react'
import { Link } from 'react-router'
import komaruNeko from '../assets/neko.jpg'

export const FourZeroFour = () => (
  <div>
    <h1>404</h1>
    <h3>あれ？そのページが見つかりませんでしたね、、</h3>
    <img src={komaruNeko} /> <br />
    <Link to='/'>ホームに戻る</Link>
  </div>
)

export default FourZeroFour
