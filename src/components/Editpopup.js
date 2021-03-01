import React from 'react';
import CLOSE from '../../src/close.png';

class AddPopup extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            orderDate : "",
            approvedBy :"",
            orderID :"",
            companyName : "",
            companyID : "",
            orderAmount : "",
            approvalStatus :"",
            Notes :"",
            show :this.props.show,
        }
        this.onClose= this.onClose.bind(this)
        this.onSave= this.onSave.bind(this)
    }

    componentWillReceiveProps(nextProps){
        this.setState({show: nextProps.show});
    }

    onClose(){
        this.setState({
            orderDate : "",
            approvedBy :"",
            orderID :"",
            companyName : "",
            companyID : "",
            orderAmount : "",
            approvalStatus :"",
            Notes :"",
            show :false, 
        })
        this.props.setShow()
    }

    onSave(){

        //payload
        console.log(this.state.orderID+this.state.orderAmount+this.state.Notes+this.state.companyID+this.state.companyName+this.state.approvalStatus)
        //send to backend
        //CALL HERE

        var reqdata = {
            "orderID": this.state.orderID,
            "companyName": this.state.companyName,
            "companyID": this.state.companyID,
            "orderAmount": this.state.orderAmount,
            "approvalStatus": this.state.approvalStatus,
            "approvedBy": this.state.approvedBy,
            "Notes": this.state.Notes,
            "orderDate": this.state.orderDate
        }
        var url = 'http://localhost:8080/1706545/order';
        fetch(url, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqdata),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                this.props.setShow()
            })
            .catch((error) => {
                console.error('Error:', error);
                this.props.setShow()
            });


        //reset
        this.setState({
            orderDate : "",
            approvedBy :"",
            orderID :"",
            companyName : "",
            companyID : "",
            orderAmount : "",
            approvalStatus :"",
            Notes :"",
            show :false, 
        })
        this.props.setShow()

    }

     //Text Changes
    onOrderDate(e){
        this.setState({orderDate:e.target.value})
    }
    onapprovedBy(e){
        this.setState({approvedBy:e.target.value})
    }
    onorderID(e){
        this.setState({orderID:e.target.value})
    }
    oncompanyName(e){
        this.setState({companyName:e.target.value})
    }
    oncompanyID(e){
        this.setState({companyID:e.target.value})
    }
    onorderAmount(e){
        this.setState({orderAmount:e.target.value})
        if(e.target.value<=10000 || e.target.value == "")
        this.setState({approvedBy:"David_Lee", approvalStatus :"Approved"})
        else if(e.target.value>10000 && e.target.value<=50000)
        this.setState({approvedBy:"", approvalStatus :"Awaiting Approval"})
        else
        this.setState({approvedBy:"", approvalStatus :"Awaiting Approval"})
    }
    onapprovalStatus(e){
        this.setState({approvalStatus:e.target.value})
    }
    onNotes(e){
        this.setState({Notes:e.target.value})
    }


    render(){
        if(this.state.show !== true)
        return null
        return(
            <div className="popupouter">
                <div className="popupinner fontNormal">
                    <font size="5" className = "fontNormal"><b>Add Invoice</b></font>
                    <img src={CLOSE} className="popupclose" onClick={this.onClose}/>
                    <hr className='hrpopup'/>
                    <br/>
                    <div className = "fontNormalIn">
                    <font size="5" ><b>Invoice Added</b></font>
                    </div>
                    <div className = "popinbtn">
                    <font className="btnpopaction" onClick ={this.onClose}>Cancel</font>
                    </div>
                    <div className = "popinbtn1">
                    <button className="btnpopaction1" onClick ={this.onClose}>Clear</button>
                    </div>
                    <div className = "popinbtn2">
                    <button className="btnpopaction2" onClick ={this.onSave}>ADD</button>
                    </div>

                </div>
            </div>
        )
    }
}
export default AddPopup;