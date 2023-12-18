import { Avatar } from '@mui/material';
import React, { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalContext';
import './styles.css'
const Card = ({ data }) => {

  const { id, title, userId, tag } = data;
  const { ApiData } = useContext(GlobalContext);;
  const userName = ApiData?.users.filter(item => item.id == userId)[0].name

  function stringToColor(string) {
    let hash = 0;
    let i;
  
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
  
    return color;
  }

  function stringAvatar(name) {
   const word = name.split(' ')
   let shortName = ''
   if(word.length > 1){
    shortName = `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
   }else{
    shortName = `${name.split(' ')[0][0]}`
   }
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: shortName?.toUpperCase()
    };
  }
  return (
    <div className='main-card'>
        <div className='card-header'> 
            <div>{id}</div>
            <div>
            <Avatar {...stringAvatar(userName)} style={{ fontSize: '15px'}} /></div>
        </div>
        <div className='card-body'>
            {title}
        </div>
        <div className='card-footer'>
          {tag?.map(item => (
            <span>{item}</span>
          ))}
        </div>
    </div>
  )
}

export default Card