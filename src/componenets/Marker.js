import React from "react"
import '../Marker.css';



const Marker = (props) => {

    const { color, name, id,} = props;

    const handleClick = () => {
        console.log(`You clicked`);
      };

      const hover = e => {
          e.target.style.backgroundColor = "#272829"
      }

      const unHover = e => {
        e.target.style.backgroundColor = "#3797A4"
      }
    

    return (
      <div className={"marker"}
        style={{ backgroundColor: color, cursor: 'pointer'}}
        title={name}
        onClick={handleClick}
        onMouseOver={hover}
        onMouseLeave={unHover}
      />
    );
  };

  export default Marker