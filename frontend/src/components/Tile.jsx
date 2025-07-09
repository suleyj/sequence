import React from 'react'

function Tile(props) {
  return (
    <div>
        <img src={`../public/${props.image}.svg`} className='w-26'/>
    </div>
  )
}

export default Tile
