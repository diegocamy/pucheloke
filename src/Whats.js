import React, { Component } from 'react'
import uuid from 'uuid'
import './Whats.css'
import Mensaje from './Mensaje'
import { recibir, enviar } from './Mensajes'
import Puche from './puche.jpg'

export default class Whats extends Component {
  constructor(props) {
    super(props);
    this.state = { msjs: [], escribiendo: false };
    this.recibirMensaje = this.recibirMensaje.bind(this);
    this.enviarMensaje = this.enviarMensaje.bind(this);
  }

  recibirMensaje() {
    this.setState(prevSt => {
      return {
        escribiendo: !prevSt.escribiendo
      }
    });

    setTimeout(() => {
      const idx = Math.floor(Math.random() * recibir.length);

      let hora = new Date().getHours();
      hora = (hora < 10) ? `0${hora}` : hora;
      let min = new Date().getMinutes();
      min = (min < 10) ? `0${min}` : min;

      const mensaje = { msj: recibir[idx], hora: `${hora}:${min}`, tipo: 'recibido' }
      this.setState(prevSt => {
        return {
          msjs: [...prevSt.msjs, mensaje],
          escribiendo: !prevSt.escribiendo
        }
      })
    }, 1000);

  }

  enviarMensaje() {
    setTimeout(() => {
      const idx = Math.floor(Math.random() * enviar.length);

      let hora = new Date().getHours();
      hora = (hora < 10) ? `0${hora}` : hora;
      let min = new Date().getMinutes();
      min = (min < 10) ? `0${min}` : min;

      const mensaje = { msj: enviar[idx], hora: `${hora}:${min}`, tipo: 'enviado' }
      this.setState(prevSt => {
        return {
          msjs: [...prevSt.msjs, mensaje]
        }
      })
    }, 200);

  }

  componentDidUpdate() {
    const element = document.querySelector('.mensajes');

    element.scrollTo(0, 99999999)
  }

  render() {
    return (
      <div className="whats">
        <nav className="navbar">
          <div className="foto"><img src={Puche} alt="" />
            <div className="info">
              <h2>Puche</h2>
              <p>{this.state.escribiendo ? 'Escribiendo...' : 'En linea'}</p>
            </div>
          </div>
          <div className="iconos">
            <i className="fas fa-video"></i>
            <i className="fas fa-phone"></i>
            <i className="fas fa-ellipsis-v"></i>
          </div>
        </nav>
        <section id="chat">
          <div className="mensajes">
            {this.state.msjs.map(mensaje => <Mensaje key={uuid()} msj={mensaje.msj} hora={mensaje.hora} clase={mensaje.tipo} />)}
          </div>
        </section>
        <div className="pie">
          <button onClick={this.recibirMensaje}>Recibir msj</button>
          <button onClick={this.enviarMensaje}>Enviar msj</button>
        </div>
      </div>
    )
  }
}
