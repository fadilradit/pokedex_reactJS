import React, {Component} from "react";
import {TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col} from 'reactstrap'
import axios from 'axios'

import './Detail.css'


class Detail extends Component{

    constructor(props){
        super(props);
        this.state = {
            activeTab: '1',
            pokemonData: '',
            pokPict: '',
            abilities:[],
            types: [],
            stats: []
        }
    }

    componentDidMount(){
        this.getData()
    }

    getData(){

        const id = this.props.match.params.id

        axios.get('https://pokeapi.co/api/v2/pokemon/'+id)
        .then(res => {
            this.setState({
                pokemonData: res.data,
                pokPict: res.data.sprites.front_default

            })

            const dataType = res.data.types
            const typesLength = dataType.length
            
            for (let i = 0; i < typesLength; i++) {
                const fixData = dataType[i].type.name
                this.setState({types: [...this.state.types, fixData]})
                
            }

            const dataAbilities = res.data.abilities
            const abbilitiesLength = dataAbilities.length

            for (let i = 0; i < abbilitiesLength; i++) {
                const fixData = dataAbilities[i].ability.name
                this.setState({abilities: [...this.state.abilities, fixData]})
                
            }

            const dataStats = res.data.stats
            const statsLength = dataStats.length
            

            for (let i = 0; i < statsLength; i++) {
                const fixData = dataStats[i].base_stat
                this.setState({stats: [...this.state.stats, fixData]})
                console.log(dataStats[i].base_stat);
                
            }
            
            



        })

    }

    toogle = (tab) => {
        if(tab !== this.state.activeTab){
            this.setState({activeTab: tab})
            console.log("Pindah");
        }
       
    }

    typeRender(){

        const {types} = this.state
        const typeLength = types.length
        let typeList;

        if( typeLength > 1 ){
            typeList =  <div className = "detail-type" >
                            <p>{types[0].type.name}</p>
                            <p>{types[1].type.name}</p>
                        </div>
        }
        else{
            console.log(types[0]);
        }
        return typeList

    }

    render(){
        const item = this.state.pokemonData
        const {types, pokPict, abilities, stats} = this.state
        console.log(stats);
        console.log(item);

        return(

            <main className = "detail-body" id = "detail-body" >

                <div className = "detail-container" id = "detail-container" >
                    <section className = "detail-head" id = "detail-head" >
                        <div className = "detail-title" id = "detail-title" >
                            <h1>{item.name}</h1>
                            
                                {
                                    types.length > 1
                                    ? <div className = "detail-type" id = "detail-type" >
                                        <p>{types[0]}</p>
                                        <p>{types[1]}</p>
                                    </div>
                                    :<div className = "detail-type" id = "detail-type">
                                        <p>{types[0]}</p>
                                    </div>
                                }
                                {/* <p>{types[0].type.name}</p>
                                <p>{types[1].type.name}</p> */}
                            
                        </div>
                        <div className = "detail-id" id = "detail-id" >
                                <p>#{item.id}</p>
                        </div>
                    </section>
                    
                    <section className = "box">
                    <img src = {pokPict} alt = ""  />

                        <div className = "tabs" >

                            <div onClick = {() => {this.toogle('1')}}  className = {`${this.state.activeTab==='1' ? "tab active-tab" : 'tab'}`} >
                                About
                            </div>

                            <div onClick = {() => {this.toogle('2')}} className = {`${this.state.activeTab==='2' ? "tab active-tab" : 'tab'}`} >
                                Base Stats
                            </div>

                        </div>

                        {/* Contents */}
                        <div className = "contents" >
                            <div className = {`${this.state.activeTab==='1' ? "content active-content" : 'content'}`} >
                                <table>
                                    <tr>
                                        <td>Height</td>
                                        <td>:</td>
                                        <td>{(item.height*0.1).toFixed(2)+" cm"}</td>
                                    </tr>
                                    <tr>
                                        <td>Weight</td>
                                        <td>:</td>
                                        <td>{item.weight*0.1+" kg"}</td>
                                    </tr>
                                    <tr>
                                        <td>Abilities</td>
                                        <td>:</td>
                                        <td>{abilities[0]+","+abilities[1]}</td>
                                    </tr>
                                </table>
                            </div>

                            <div className = {`${this.state.activeTab==='2' ? "content active-content" : 'content'}`} >
                                <table>
                                    <tr>
                                        <td>Hp</td>
                                        <td>{stats[0]}</td>
                                    </tr>
                                    <tr>
                                        <td>Attack</td>
                                        <td>{stats[1]}</td>
                                    </tr>
                                    <tr>
                                        <td>Defense</td>
                                        <td>{stats[2]}</td>
                                    </tr>
                                    <tr>
                                        <td>Sp. Attack</td>
                                        <td>{stats[3]}</td>
                                    </tr>
                                    <tr>
                                        <td>Sp. Defense</td>
                                        <td>{stats[4]}</td>
                                    </tr>
                                    <tr>
                                        <td>Speed</td>
                                        <td>{stats[5]}</td>
                                    </tr>
                                </table>
                            </div>
                        
                        </div>
                        
                    </section>
                </div>
                
            </main>

            // <div  style = {{display: "flex", flexDirection: "row", width:"100%"}}>
            //     <h1 
            // onClick={() => {this.toogle('1')}} style ={{marginRight: "10px"}}>Coba1</h1>
            //     <h1 
            // onClick={() => {this.toogle('2')}}>Coba2</h1>
            //     <TabContent activeTab = {this.state.activeTab} >
            //         <TabPane tabId = "1">
            //             <Row>
            //                 <Col sm="12">
            //                     <h4>Tab 1 Contents</h4>
            //                 </Col>
            //             </Row>
            //         </TabPane>
            //         <TabPane tabId = "2">
            //             <Row>
            //                 <Col sm="12">
            //                     <h4>Tab 2 Contents</h4>
            //                 </Col>
            //             </Row>
            //         </TabPane>
            //     </TabContent>
            // </div>
    
        )
    }
    


}


export default Detail;