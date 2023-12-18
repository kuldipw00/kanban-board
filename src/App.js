import { useEffect, useState } from 'react';
import './App.css';
import KanbanBoard from './components/KanbanBoard/KanbanBoard.js';
import { GlobalContext } from './context/GlobalContext';

function App() {
  const [state, setstate] = useState({});
  useEffect(() => {
      callApi();
  }, []);
  const callApi = async() => {
    const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment')

    const data = await response.json()

    let groupedData = Object.groupBy(data.tickets,(item => item.status))
    setstate({
      ApiData: data,
      FilterData: groupedData
    });
  }

  const setContexts = (obj) => {
    setstate({
      ...state,
      ...obj
    })
  }
  return (
    <div className="App">
      <GlobalContext.Provider value={
        {
        ...state,
        setContexts
        }
        }>
        <KanbanBoard />
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
