import { request } from 'graphql-request'
import React from 'react'
import { useState } from 'react'

const url = 'http://localhost:4000/graphql'

const query = `
  query helloWorld {
    helloWorld
  }
`

export const App = () => {
  const [hello, setHello] = useState('')

  const graphQL = async () => {
    try {
      const result = await request(url, query)
      setHello(result.helloWorld)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className="App" data-testid="text">
      <button onClick={graphQL}>Click</button>
      <div>{hello}</div>
    </div>
  )
}
