import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

//import Header from './Header';

// REACT é  baseado em 3 pilares:
// Componente : é uma função que retorna algum conteúdo HTML, js. (Isolamento de um trecho da aplicação, 
// que não inflinja o resto dos outros componentes.)

// Estado: Uma informação mantida pelo proprio componente. (lida e mantida pelo proprio componente)

// Propriedade:  Informações que um componente pai (App()) passa par ao componente FILHO.
//-----------------------------------------------------------------------------------------
// Desestruturação:  Pega rum OBJETO ou um VETOR e dividir ele em VARIAVEIS.
//IMUTABILIDADE : React acredita que NUNCA VAI ALTERAR UM DADO E SEMPRE VAI CRIAR UM NOVO DADO A PARTIR DO VALOR ANTERIOR DELE!

function App() {
  const [devs, setDevs] = useState([]);


  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => { 
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude }  = position.coords;


        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );
  }, []);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(e){
    e.preventDefault();

    const response = await api.post('/devs', {
      github_username,
      techs,
      latitude,
      longitude,
    })

    setGithubUsername('');
    setTechs('');
  }


  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleAddDev}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do GitHub</label>
            <input 
              name="github_username" 
              id="github_username" 
              required
              value={github_username}
              onChange={e => setGithubUsername(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input 
              name="techs" 
              id="techs" 
              required
              value={techs}
              onChange={e => setTechs(e.target.value)}
            />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input 
                type="number"
                name="latitude" 
                id="latitude" 
                required 
                value={latitude} 
                onChange={e => setLatitude(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input 
                type="number"
                name="longitude" 
                id="longitude" 
                required 
                value={longitude}
                onChange={e => setLongitude(e.target.value)}
              />
            </div>
          </div>

          <button type="submit">Salvar</button>
        </form>
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <li className="dev-item">
            <header>
              <img src="https://avatars1.githubusercontent.com/u/9930662?s=400&u=2702013821662f419e02c91f915fab9771e558b2&v=4" alt="Lucas Fazzi"/>
              <div className="user-info">
                <strong>Lucas Fazzi</strong>
                <span> Python, React Native, Node.js</span>
              </div>
            </header>
            <p>Developer, Gamer, CyberSecurity Enthusiast</p>
            <a href="https://github.com/lucasfazzib">Acessar perfil no Github</a>
          </li>
          ))}
        </ul>
      </main>
    </div>


  );
}

export default App;
