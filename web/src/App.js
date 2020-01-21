import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

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

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs(); 
  }, []);

  async function handleAddDev(data){
    const response = await api.post('/devs', data)
    //mudar estado dos Devs.
    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>


  );
}

export default App;
