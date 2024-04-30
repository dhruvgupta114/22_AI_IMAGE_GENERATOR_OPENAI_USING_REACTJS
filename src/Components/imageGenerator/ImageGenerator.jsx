import React, { useRef, useState } from 'react'
import './ImageGenerator.css'
import default_Image from '../assets/default_image.svg'

const ImageGenerator = () => {
    const [image_url, setImage_url] = useState('/')
    const [loading, setloading] = useState(false)
    let inputRef = useRef(null)

    const imageGenerator = async ()=>{
        if(inputRef.current.value===''){
            return 0;
        }
        setloading(true)
        const response = await fetch('https://api.openai.com/v1/images/generations',{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                Authorization:`Bearer ${import.meta.env.VITE_KEY_OPEN_AI_API}`,
                "User-Agent": "Chrome",
            },
            body:JSON.stringify({
                prompt:`${inputRef.current.value}`,
                n:1,
                size:"512x512",
            }),
        });
        let data = await response.json();
        console.log(data)
        let data_array = data.data;
        setImage_url(data_array[0].url)
        setloading(false)
    }

  return (
    <div className='ai-image-generator'>
      <div className="header">AI Image <span>Generator</span></div>
      <div className="img-loading">
        <div className="image">
            <img src={image_url==='/'?default_Image:image_url} alt="" />
        </div>
        <div className="loading">
            <div className={loading? "loading-bar-full": "loading-bar"}></div>
            <div className={loading? "loading-text":"display:none"}>Loading...</div>
        </div>
      </div>
      <div className="search-box">
        <input ref={inputRef} type="text" className='search-input' placeholder='Describe what you want to see' />
        <div onClick={()=>{imageGenerator()}} className="generate-btn">Generate</div>
      </div>
    </div>
  )
}

export default ImageGenerator
