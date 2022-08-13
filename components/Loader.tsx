import Image from 'next/image'
import React from 'react'

export const Loader = () => {
  return (
    

<div className="loader">
<Image src={"/loader.svg"} alt="loader" width="45" height="45"/>
</div>
  )
}
