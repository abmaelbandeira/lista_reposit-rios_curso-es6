import api from './api';

class App{
    constructor(){
        this.repositories = [];

        this.formEl = document.getElementById('repo-form');
        this.inputEl = document.querySelector('input[name=repository]');
        this.listEl = document.getElementById('repo-list');

        this.registerHandlers();
    }

    //pega os eventos
    registerHandlers(){
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    setLoading(loading = true){
        if(loading === true){
            let loadingEl = document.createElement('span');
            loadingEl.appendChild(document.createTextNode('Carregando'));
            loadingEl.setAttribute('id','loading');

            this.formEl.appendChild(loadingEl);

        }else{
            document.getElementById('loading').remove();
        }
    }

    async addRepository(event){
        event.preventDefault();

        const repoInput = this.inputEl.value;

        if(repoInput.length === 0){
            return;
        }

        this.setLoading();

        try{
        //procura repositório
        const response = await api.get(`/repos/${repoInput}`);
        //desestruturando
        const { name, description, html_url, owner: { avatar_url } } = response.data;

        this.repositories.push({
            name,
            description,
            avatar_url,
            html_url,
        });

        this.inputEl.value = '';

        this.render();
        } catch(err){
            alert('O repositório não existe!');
        }

        this.setLoading(false);
    }
    
    render(){
        //apaga todos os elementos da lista
        this.listEl.innerHTML = '';

        this.repositories.forEach(repo => {
            //cria um elemento img e seta seu valor
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);
            //cria um elemento strong e seta o seu valor
            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.name));
            //cria um elemento p e seta o seu valor
            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.description));

            //cria um elemento a e seta o seu valor
            let linkEl = document.createElement('a');
            linkEl.setAttribute('target', '_blank');
            linkEl.setAttribute('href', repo.html_url);
            linkEl.appendChild(document.createTextNode('Acessar'));

            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(titleEl);
            listItemEl.appendChild(descriptionEl);
            listItemEl.appendChild(linkEl);

            this.listEl.appendChild(listItemEl);
        });
    }
}

new App();














// import axios from 'axios';

// class Api{
//     static async getUserInfo(username){
//         try{
//             const response = await axios.get(`https://api.github.com/users/${username}`);
//             console.log(response);
//         } catch (err){
//             console.warn('Erro na API');
//         }
//     }
// }

// Api.getUserInfo('abmaelbandeira');