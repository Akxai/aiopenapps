import React from 'react'
import { useState } from 'react';
import '../theme/Dark.css'
import { BsSunFill } from 'react-icons/bs'
import { FaMoon } from 'react-icons/fa'
// import { useSelector , useDispatch } from 'react-redux'

function  Dark  () {


  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [textColor, setTextColor] = useState('#ffffff');
  const [hoverColor, setHoverColor] = useState('#ffffff');
  const [lghtColor, setlghtColor ] = useState('#343541')

  const handleColorChange = (bgColor,  lghtColor, textColor ,iconColor ,  hoverColor, whiteColor ,shadowColor , floatnavColor , btntextColor , purpleColor , bdyColor , purplebgColor, radColor) => {
    setBackgroundColor(bgColor);
    setlghtColor(lghtColor); 
    setTextColor(textColor);
    setHoverColor(hoverColor);
    document.documentElement.style.setProperty('--bg-color', bgColor);   
    document.documentElement.style.setProperty('--color-light', lghtColor);
    document.documentElement.style.setProperty('--text-color', textColor);
    document.documentElement.style.setProperty('--icon-color', iconColor);
    document.documentElement.style.setProperty('--hover-color',hoverColor);
    document.documentElement.style.setProperty('--white-color',whiteColor);
    document.documentElement.style.setProperty('--shadow-color',shadowColor);
    document.documentElement.style.setProperty('--nav-color',floatnavColor);
    document.documentElement.style.setProperty('--bttxt-color',btntextColor);
    document.documentElement.style.setProperty('--purple-color',purpleColor);
    document.documentElement.style.setProperty('--spl-bg',bdyColor);
    document.documentElement.style.setProperty('--purple-bg',purplebgColor);
    document.documentElement.style.setProperty('--radtxt-clr',radColor);
  };

  const [ dark , setDark ] = useState(true);

  const handleDark = () => {
    if(dark)  {
      setDark(false)
    }
    else {
      setDark(true)
    }
  }


  const handleColorChangeAndDark = () => {
    handleColorChange('#121212','#292929', ' #ffffff' , '#d6d4d4d4' , '','','#ffffff','#292929','#000000','#C76ED7' , '#000000' , '#292929' , '#00FFF2');
    
  };

  const handleWhite = () => {
    handleColorChange('#ffffff00', '#ffffff', '#000000', '#272727c1' , '#000000', '#0000001a', '#000000', '#000000','#ffffff','#000000','linear-gradient(to bottom,#6d5df3, #7364f4,#7a6bf4, #8071f5,#8678f5,#9385f7,#a093f9,#aca0fa, #c1b7fc,#d6cffe,#ebe7ff,#ffffff' , '#4e42b2' , '#000000');
  };
  

  // const { auth , theme } = useSelector( state => state);
  // const dispatch = useDispatch();



  return (
    <div className="container background">
       {

        dark ? 

         (  
            <div className="bg-1"  onClick={handleColorChangeAndDark}>
                <BsSunFill className='sun' onClick={handleDark}/>
              </div> 
         ) :

         (
                <div className="bg-1" onClick={handleWhite}  >   
                    <FaMoon className='moon' onClick={handleDark}/>
                </div> 
           )
       }
              </div>
  )
}

export default Dark
