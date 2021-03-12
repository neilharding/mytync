import React from 'react'
import { AnimatedName } from '../components/AnimatedName'

import styles from './index.module.css'

export default function Animate() {
  const names = [
    { name: "Macy", color: '#F45D01', startingIndices: [0, 3] },
    { name: "Tyler", color: '#97CC04', startingIndices: [0, 1] },
    { name: "Neil", color: '#2D7DD2', startingIndices: [0] },
    { name: "Celeste", color: '#A35279', startingIndices: [0] }
  ]

  return <>
    <div className={styles.center}><AnimatedName name="MyTyNC" startingIndices={[0,1,2,3,4,5]} shortDelay={0} exitDelay={2000} /></div>
    <div className={styles.names}>
      {names.map(({ name, color, startingIndices }) => (
        <AnimatedName key={name} name={name} color={color} startingIndices={startingIndices} shortDelay={2300} longDelay={5000} />
      ))}

      <style jsx global>{`
        body {
          background-color: #3D3D3D;
        }
      `}</style>
    </div>
  </>
}
