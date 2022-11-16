
import { useState } from 'react';
import gitLogo from '../assets/github.png'
import Input from '../components/Input';
import Button from '../components/Button';
import ItemRepo from '../components/ItemRepo';
import { api } from '../services/api';

import { Container } from './styles';

function App() {

  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);

//Função async pq a gente vai acessar uma API e pode demorar a resposta!
  const handleSearchRepo = async () => {

    const {data} = await api.get(`repos/${currentRepo}`)

    if(data.id){

      const isExist = repos.find(repo => repo.id === data.id);

      if(!isExist){
        setRepos(prev => [...prev, data]);
        setCurrentRepo('')
        return
      }

    }
    alert('Repositório já encontrado')
//Alert não indica repositorio nao encontrado, apenas os já encontrados.
  }

  const handleRemoveRepo = (id) => {
    setRepos(repos.filter((repo) => repo.id !== id));

    // utilizar filter.
  }


  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt="github logo"/>

      <Input 
      value={currentRepo.trim()}
      onChange={(e) => setCurrentRepo(e.target.value)} />
      <Button onClick={handleSearchRepo}/>
      {repos.map(repo => (
      <ItemRepo repo={repo} handleRemoveRepo={handleRemoveRepo}/>))}
    </Container>
  );
}

export default App;
