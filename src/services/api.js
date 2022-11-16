import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://api.github.com'
})

//Configurando nosso API para pegar os dados do github