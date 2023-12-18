import React, { useContext } from 'react'
import { useState } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import './styles.css'

const Header = ( ) => {
    const [active, setActive] = useState(true);
    const context = useContext(GlobalContext);
    const { ApiData, setContexts } = context
    const [groupCriteria, setGroupCriteria] = useState('status')
    const [ordering, setOrdering] = useState('')

    const handleClick = () =>{
        setActive(!active)
    }
    function getNameById(userId) {
        const user = ApiData.users.find(user => user.id === userId);
        return user ? user.name : null;
      }
    const onGrouping = (e) => {
        let value = e.target.value
        let tickets = ApiData.tickets

        let groupedData = Object.groupBy(tickets,(item => item[value]))

        const originalOrder = Object.keys(groupedData);

        const sortedData = Object.fromEntries(
            Object.entries(groupedData).map(([key, arr]) => [
              key,
              arr.slice().sort((a, b) => {
                if (ordering === 'asc') {
                  return a.title.localeCompare(b.title);
                } else if (ordering === 'desc') {
                  return b.priority - a.priority
                }
                return 0; 
              }),
            ])
          );
    
        let updatedGroupedData = {};
        
        if(value === 'userId'){
            originalOrder.forEach(userId => {
                const userName = getNameById(userId); 
              
                if (userName) {
                  updatedGroupedData[userName] = sortedData[userId];
                } else {
                  updatedGroupedData[userId] = sortedData[userId];
                }
              });
        }else{
            updatedGroupedData = groupedData
        }

        setGroupCriteria(value)

        setContexts({ FilterData: updatedGroupedData, groupCriteria: value})

   }
   const onOrdering = (e) => {
    let value = e.target.value
    const { FilterData } = context;
    
    const sortedData = Object.fromEntries(
        Object.entries(FilterData).map(([key, arr]) => [
          key,
          arr.slice().sort((a, b) => {
            if (value === 'asc') {
              return a.title.localeCompare(b.title);
            } else if (value === 'desc') {
              return b.priority - a.priority
            }
            return 0; 
          }),
        ])
      );
      
      console.log(sortedData);


    setContexts({ FilterData: sortedData, ordering: value})

    setOrdering(value)
    }

  return (
    <div>
     <div className='selecOption' onClick={handleClick}>Display</div>
        {
            active && <div className='selectModle'>
                <div className='grouping'>
                    <p className='text'>Grouping</p>
                    <select onChange={onGrouping} className='select'>
                        <option value='status'>Status</option>
                        <option value='userId'>User</option>
                        <option value='priority'>Priority</option>
                    </select>
                </div>
                <div className='grouping'>
                    <p className='text'>Ordering</p>
                    <select onChange={onOrdering} className='select'>
                        <option value="desc">Priority</option>
                        <option value="asc">Title</option>
                    </select>
                </div>
                </div>
        }
    </div>
  )
}

export default Header