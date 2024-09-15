import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const CardResponse = ({res}) => {
    const [showDetails,setShowDetails]=useState(false)
    const navigate=useNavigate()
    function handleTranslate(){//logic to send parameter to translate route over there we need to set the text to res
           navigate('/Translator',{ state: res })
    }
  return (
    <div style={{display: 'flex',justifyContent: 'space-between',width: '100%'}}>
        {  !showDetails &&
        (
           <>
           <p>{res.name}</p>
           <IoIosArrowDown onClick={() => {setShowDetails((prev) => !prev)}}/>
           </>
        )
        }
        {
          showDetails && (
            <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center',justifyContent: 'center',width: '100%'}}>
            <div style={{display: 'flex',justifyContent: 'space-between',width: '100%',marginBottom: 5, fontWeight: '700',fontSize: 16,width: '100%'}}>
                  <p>{res.name}</p>
                  <IoIosArrowUp onClick={() => {setShowDetails((prev) => !prev)}}/>
            </div>
                <div style={{display: 'flex', flexDirection: 'column',justifyContent: 'center',alignItems: 'flex-start',width: '100%',gap: 5,fontSize: 14}}>
                 
                    <p><span style={{fontWeight: '600'}}>Calories:</span> {res.nutritions.calories}</p>
                    <p><span style={{fontWeight: '600'}}>Fat:</span> {res.nutritions.fat}</p>
                    <p><span style={{fontWeight: '600'}}>Sugar:</span> {res.nutritions.sugar}</p>
                    <p><span style={{fontWeight: '600'}}>Carbohydrates:</span> {res.nutritions.carbohydrates}</p>
                    <p><span style={{fontWeight: '600'}}>Protein:</span> {res.nutritions.protein}</p>
                </div>
                <div style={{display: 'flex',justifyContent: 'flex-end',alignItems: 'flex-start',width: '100%',gap: 5,fontSize: 14}}>
              <button onClick={handleTranslate}>Translate</button>
              </div>
            </div>
          ) 
        }
       
    </div>
  )
}

export default CardResponse