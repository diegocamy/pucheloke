import React from 'react'

export default function Mensaje(props) {
  return (
    <div className={props.clase}>
      <div className="cuerpo">
        <p>{props.msj}</p>
      </div>
      <div className="hora">
        <p>{props.hora}</p>
      </div>
    </div>
  )
}
