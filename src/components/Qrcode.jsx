import React, { useState } from 'react'


export const Qrcode = () => {

  const[ Img, setImg] =useState('');
  const[Loading, setLoading] = useState(false);
  const [qrData, setQrData] =useState("https://github.com/kishore9251");
  const[qrSize, setQrSize] = useState("150");

 async function generateQr(){

    setLoading(true);
    let size= qrSize*qrSize;
    try{
      const url=  `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${encodeURIComponent(qrData)}`;
      setImg(url);
    }catch(error){
      console.log("error is catched", error);
    }finally{
      setLoading(false);
    }
}

async function downloadqr(){
      fetch(Img)
      .then((response)=>response.blob())
      .then((blob)=>{
        const Link = document.createElement("a");
        Link.href= URL.createObjectURL(blob);
        Link.download="images.png";
        document.body.appendChild(Link);
        Link.click();
        document.body.removeChild(Link);
      }).catch((error)=>{
        console.log("error in download code ",error);
      })
}

  return (
    <>
    
  <div className='app-container'> 
  
        <h1 className='image'>QR CODE GENERATOR</h1>
        {Loading && <p>Please wait...</p>}
        {Img && <img src={Img} style={{width:`${qrSize}px`,heigth:`${qrSize}px`}} alt="qr"/>} 
   
        <label htmlFor='touch' className='sizeData'>Data for Qr Code</label>
        <input type="text"  className='hello' placeholder='Enter the qr data' value={qrData} onChange={(e)=>setQrData(e.target.value)}/>

        <label htmlFor='touch' className='sizeData' >Image size(e.g.150..)</label>
        <input type="text" className='hello'  placeholder='Enter the image size' value={qrSize}  onChange={(e)=>setQrSize(e.target.value)}/>

      <div className='button'>
         <button className='generate-button' onClick={generateQr} >Generate Qr code</button>
        <button className='download-button' onClick={downloadqr}>Download Qr code</button>
      </div>

        <p className='footer'>Designed by <a href="www.google.com" target='blank'>Kishoremanivel</a></p>
  </div>
  
    </>
  )
}
