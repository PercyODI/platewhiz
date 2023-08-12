import {recipes} from '@/public/data'

import React from 'react'

const Recipe = () => {
  return (
    <pre>{JSON.stringify(recipes[0], null, 2)}</pre>
  )
}

export default Recipe