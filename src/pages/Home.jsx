import React, { useState } from 'react'
import Card from '../lib/components/card'
import LineChart from '../lib/components/LineChart'
import DonutChart from '../lib/components/DonutChart'

const Home = () => {
  const [value1, setValue1] = useState(300)
  const [text1, setText1] = useState('User Application 1')
  const [value2, setValue2] = useState(400)
  const [text2, setText2] = useState('User Application 2')
  const [value3, setValue3] = useState(500)
  const [text3, setText3] = useState('User Application 3')

  const handleValueChange1 = (e) => {
    setValue1(e.target.value)
  }

  const handleTextChange1 = (e) => {
    setText1(e.target.value)
  }

  const handleValueChange2 = (e) => {
    setValue2(e.target.value)
  }

  const handleTextChange2 = (e) => {
    setText2(e.target.value)
  }

  const handleValueChange3 = (e) => {
    setValue3(e.target.value)
  }

  const handleTextChange3 = (e) => {
    setText3(e.target.value)
  }

  return (
    <div>
      <div className='mt-10 flex flex-wrap'>
        <div className=''>
          <Card 
            value={value1} 
            text={text1} 
            onValueChange={handleValueChange1} 
            onTextChange={handleTextChange1} 
          />
        </div>
        <div className="">
          <Card 
            value={value2} 
            text={text2} 
            onValueChange={handleValueChange2} 
            onTextChange={handleTextChange2} 
          />
        </div>
        <div className="">
          <Card 
            value={value3} 
            text={text3} 
            onValueChange={handleValueChange3} 
            onTextChange={handleTextChange3} 
          />
        </div>
      </div>
      <div className='container flex mt-10'>
          <LineChart />
          <span className='mx-4'></span>
          <DonutChart />
      </div>
    </div>
  )
}

export default Home;
