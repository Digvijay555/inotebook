import React,{useContext} from 'react'
import noteContext from '../context/note/noteContex'

const About = () => {

  const a = useContext(noteContext)
  return (
    <div>This is About {a.name} he is in {a.class}</div>
  )
}

export default About