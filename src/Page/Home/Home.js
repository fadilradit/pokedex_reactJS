import React, {Component} from "react";
import axios from 'axios'
import {Link} from 'react-router-dom'

import pokeball from '../../Image/Pokeball.png'
import './Home.css'

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            pokemon: []
        }
    }


    componentDidMount(){
        this.getPokemonData()
    }

    async getPokemonData(){
        
       await axios.get('https://pokeapi.co/api/v2/pokemon/')
        .then(res => {
            const resArr = res.data.results
            const resData = resArr.length

            for (let i = 0; i < resData; i++) {
                const linkUrl = resArr[i].url

                axios.get(linkUrl)
                .then(res => {
                    const fixData = res.data
                    this.setState({pokemon: [...this.state.pokemon, fixData]})
                })

                
                
            }


        })

    }

    renderList(){
        const {pokemon} = this.state
        
        return pokemon.map(item => {

            const type = item.types.length
            let typeList;

            if(type > 1){
                typeList =  <div className = "type-list" id = "type-list" >
                                <p>{item.types[0].type.name}</p>
                                <p>{item.types[1].type.name}</p>
                            </div>
            }else{
                typeList =  <div className = "type-list" id = "type-list" >
                                <p>{item.types[0].type.name}</p>
                                
                            </div>
            }

            return(
                <Link to = {'/detail/'+item.id} className = "card" id = "card" >

                    <div className = "card-title" id = "card-title" >
                        <h2>{item.name}</h2>
                        {typeList}
                    </div>
                    
                    <img className = "char-img" id = "char-img" alt = 'Not Found'  src = {item.sprites.front_default}    />
                    <img className = "back-img" id = "back-img" alt = 'Not Found'  src = {pokeball}    />
                    
                </Link>
            )
        })
    }

    render(){
        const {pokemon} = this.state
        console.log(window.location);
        
        return(
            <div className = "home-body" id = "home-body" >
                <div className = "home-title" id = "home-title" >
                <h1 className = "title" >Pokedex</h1>
                <img src = {pokeball} alt = ""  />
                </div>
                
                <div className = "card-container" id = "card-container" >{this.renderList()}</div>
                
                
            </div>
        )
    }


}

export default Home;