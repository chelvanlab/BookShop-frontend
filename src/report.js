import React from "react";
import axios from "axios";
import { apiUrl } from "./util";
import './App.css';
import back from "./book.jpg";

export class WeeklyReports extends React.Component {
    constructor() {
        super();
        
        this.state = {
            quantity:"",
            email:'',
            phoneNo:"",
            address:"",
            version:"",
        }
    }
    componentDidMount() {
        if (this.props.owner) {
            let url = apiUrl + `report/`;
            let options = {
                url: url,
                method: "GET",

            }
            axios(options).then((resp) => {
                this.setState({ employees: resp.data })
            }).catch((err) => {

            })
        }
    }
    modal(){
        return(
            <div onClick={(e)=>{e.stopPropagation();this.setState({registerClicked:false})}} style={{backgroundColor:"#000000d6",position:"absolute", zIndex:99, top:0,bottom:0,left:0,right:0, display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center"}}>
                <div onClick={(e)=>{e.stopPropagation();}} style={{textAlign:"left",padding:"20px",width:"500px", backgroundColor:"white"}}>
                    <div><input value={this.state.quantity} onChange={(e)=>{this.setState({name:e.target.value})}} style={{height:"30px", width:"300px", marginBottom:"10px"}} type="text" placeholder="name"/></div>
                    <div><input value={this.state.email} onChange={(e)=>{this.setState({email:e.target.value})}} style={{height:"30px", width:"300px",marginBottom:"10px"}} type="email" placeholder="email"/></div>
                    <div><input value={this.state.phone} onChange={(e)=>{this.setState({phone:e.target.value})}}style={{height:"30px", width:"300px",marginBottom:"10px"}} type="text" placeholder="phone number"/></div>
                    <div><input value={this.state.address} onChange={(e)=>{this.setState({address:e.target.value})}} style={{height:"30px", width:"300px",marginBottom:"10px"}} type="text" placeholder="address"/></div>
                    <div><input value={this.state.version} onChange={(e)=>{this.setState({password:e.target.value})}} style={{height:"30px", width:"300px",marginBottom:"10px"}} type="password" placeholder="password"/></div>
                    {this.state.error&&<div style={{color:"red"}}>{this.state.error}</div>}  
                </div>
            </div>
        )
    }

    render() {
        return (
            <div style={{ padding: "20px" }}>
                <div className="App-back"><img src={back} /></div>
                <div>
                    <div style={{color:"white", backgroundColor:"#03a9f4", fontWeight:"bold",cursor:"pointer", padding:"10px",width:"200px", marginBottom:"20px", marginTop:"200px"}} onClick={()=>{
                        this.setState({registerClicked:true});
                    }}></div>
                    <div style={{ color:"white", backgroundColor:"#03a9f4",display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr", gridTemplateRows:"30px", gridGap:"5px" }}>
                        <div>quantity</div>
                        <div>address</div>
                        <div>email</div>
                        <div>phoneNo</div>
                        <div>Address</div>
                        <div>version</div>
                    </div>
                    {this.state.employees && this.state.employees.map((emp) => {
                        return (
                            <div style={{ backgroundColor:"white",display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr", gridTemplateRows:"30px", gridGap:"5px" }}>

                                <div>{emp.quantity}</div>
                                <div>{emp.name}</div>
                                <div>{emp.email}</div>
                                <div>{emp.phoneNo}</div>
                                <div>{emp.address}</div>
                                <div style={{cursor:"pointer"}} onClick={
                                    ()=>{
                                        let url=apiUrl+"report/info/"+emp._id
                                        let options={
                                            method:"DELETE",
                                            url:url

                                        }
                                        axios(options).then(r=>{
                                            if (this.props.owner) {
                                                let url = apiUrl + `employees/info/${this.props.owner.owner._id}`;
                                                let options = {
                                                    url: url,
                                                    method: "GET",
                                    
                                                }
                                                axios(options).then((resp) => {
                                                    this.setState({ employees: resp.data })
                                                }).catch((err) => {
                                    
                                                })
                                            }
                                        }).catch(err=>{

                                        })
                                    }
                                }><i class="fas fa-trash-alt"></i></div>
                            </div>
                        )
                    })}
                </div>
                {this.state.registerClicked&&this.modal()}
            </div>
        )
    }
}