import React from 'react'
import { masterLogoDark, masterLogoLight } from '../ThemeControlers'
import { FaGoogleScholar } from "react-icons/fa6"
import { FaLinkedin,FaOrcid } from "react-icons/fa";
import { VscGithub } from "react-icons/vsc";

export default function Header({isDarkTheme}){
  return (
    <div className='Header'>
        {isDarkTheme? (
            <img src={masterLogoDark} alt="logo" />
        ):(
            <img src={masterLogoLight} alt="logo" />
        )}
        <FaGoogleScholar className='SMlinks' onClick={() => window.open('https://scholar.google.com/citations?user=T-zYiH8AAAAJ&hl=en')}/>
        <div className='seperators'/>
        <FaLinkedin className='SMlinks' onClick={() => window.open('https://www.linkedin.com/in/iftekharul-abedeen')}/>
        <div className='seperators'/>
        <VscGithub className='SMlinks' onClick={() => window.open('https://github.com/abedeen25')}/>
        <div className='seperators'/>
        <FaOrcid className='SMlinks' onClick={() => window.open('https://orcid.org/0009-0003-7986-5954')}/>
        <div className='seperators'/>
        <div className='UIU-prof' onClick={() => window.open('https://cse.uiu.ac.bd/abedeen-iftekharul')}>UIU</div>
    </div>
  )
}
