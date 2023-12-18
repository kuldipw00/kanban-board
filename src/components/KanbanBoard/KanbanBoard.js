import React, { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalContext';
import Body from '../Body/Body'
import Header from '../Header/Header'

const KanbanBoard = () => {
    const { ApiData } = useContext(GlobalContext);
  return (
    <div>
    <Header />
    <Body data={ApiData} />
    </div>
  )
}

export default KanbanBoard