import React from 'react';
import AddPopup from '../components/Addpopup';
import EditPopup from '../components/Editpopup';
import HRC from './assets/branding.png';
import ABC from './assets/companyLogo.svg'
import mockData from '.././dataMock.json';

class Dash extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            level : this.props.level,
            orderList :mockData,
            searchValueText : "",
            addMode : false,
            checkedId : -1,
            editMode :false,
            totalPage :1,
            currentPage:1,
        };
        this.onPredict = this.onPredict.bind(this)
        this.onAdd = this.onAdd.bind(this)
        this.onEdit = this.onEdit.bind(this)
        this.hideAddPopup = this.hideAddPopup.bind(this);
        this.hideEditPopup = this.hideEditPopup.bind(this);
        this.onCheck = this.onCheck.bind(this);
        this.getRecordForPage =this.getRecordForPage.bind(this)
        this.getAllData = this.getAllData.bind(this)
    }

    //MOUNT LOGIC
    componentDidMount(){
        //first time
        //GET order List from backend and fill the orderList Array
        //this.getRecordForPage(1)
        this.getAllData()
    }

    getAllData(){

        var pageNumber = 1
        var pageSize =1000
        var url = 'http://localhost:4000/cms/tovo/v1/getInvoices.do?pageNumber='+pageNumber+'&pageSize='+pageSize;
        fetch(url, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ orderList: data })
                console.log('orderList:', data);
            })
            .catch((error) => {
                this.setState({ orderList: [] })
                console.error('Error:', error);
            });
    }


    //Predict
    onPredict(){
        this.setState({predictMode:true})
    }

    //ADD LOGIC
    hideAddPopup(){
        this.setState({addMode:false})
        //refersh fro new orders
        //BACKEND CALL -> add new order here
        this.getRecordForPage(this.state.currentPage)
    }
    onAdd(){
        this.setState({addMode:true})
    }

    //EDIT LOGIC
    onEdit(){
        this.setState({editMode:true})
    }
    hideEditPopup(){
        this.setState({editMode:false})
        //refersh fro new orders
        //BACKEND CALL -> edit orders here
        this.getRecordForPage(this.state.currentPage)
        //uncheck post edit
        if(this.state.checkedId!==-1)
        document.getElementById(this.state.checkedId).click()
    }

    //CheckBox Magic
    onCheck(e){
        var id = e.target.id
        var checkboxes = document.getElementsByName('tableCheck');
        var checkboxesChecked = [];
        // loop over them all
        for (var i=0; i<checkboxes.length; i++) {
           // And stick the checked ones onto an array...
           if (checkboxes[i].checked) {
              checkboxesChecked.push(checkboxes[i]);
           }
        }
        //console.log(checkboxesChecked)
        if(id=='allCheck'){
        this.setState({checkedId:-1})
        for (var i=0; i<checkboxes.length; i++) {
                if(e.target.checked)
               checkboxes[i].checked=true
               else
               checkboxes[i].checked=false
            }
        }
        else if(checkboxesChecked.length==1 && checkboxesChecked[0].id!=='allCheck')
        this.setState({checkedId:checkboxesChecked[0].id})
        else if(checkboxesChecked.length==1 && checkboxesChecked[0].id=='allCheck'){
            this.setState({checkedId:-1})
            checkboxes[0].checked=false
        }
        else if (checkboxesChecked.length==2 && (checkboxesChecked[0].id=='allCheck' || checkboxesChecked[1].id=='allCheck')){
            // console.log("hereeeee")
            checkboxes[0].id=='allCheck'? this.setState({checkedId:checkboxes[1].id}) : this.setState({checkedId:checkboxes[1].id})
        }
        else if(checkboxesChecked.length>1)
        this.setState({checkedId:-1})
        else if(e.target.checked)
        this.setState({checkedId:id})
        else
        this.setState({checkedId:-1})
        
        //console.log(this.state.checkedId)
    }


    getRecordForPage(page){
    }
    handleScroll(e){   
    }

    
    render(){
        console.log(this.state.checkedId)
        return(
        <div className="container">
            <div>
                <div>
                <img src={ABC} className="left"/> 
                <h1 className="logo" style={{position:'fixed'}}>ABC Product</h1>
                <img src={HRC} className="center"/>
                <br/><br/><br/>
                <br/><br/><br/>
                </div>

                <div ><h3>Invoice List</h3></div>
                
                <div className="content">

                        <div>
                           {this.state.checkedId===-1?
                            <button className="button1">Predict</button>
                            :<button className="button0">Predict</button>}
                            <button className="buttondisabled" disabled>View Coresspondance</button>
                                                            
                            <div style={{display:'flex', marginTop:'-6vh',marginLeft:'120vh'}} >
                            {this.state.level===0?
                            <div>
                                <button className="button2" onClick={this.onAdd}> + Add</button>
                                {this.state.checkedId!==-1?
                                <button className="button3">✏ Edit</button>
                                :<button className="buttondisabledEd" disabled>✏ Edit</button>}
                                {this.state.checkedId!==-1?
                                <button className="button4"> - Delete</button>
                                :<button className="buttondisabledDel"> - Delete</button>} 
                            </div>
                            :null} 
                            <input className="searchbox" type ="search" onKeyPress={this.onSearch} onChange={this.onSearchTextChange} value = {this.state.searchValueText} placeholder="Search by Invoice Number"/>
                            </div>
                        

                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <div className="tableScroll" onScroll={this.handleScroll.bind(this)}>
                        <table className="tableWhole" >
                            <thead>
                            <tr className='headrow' >
                                <th> <label><input className="checkbox" type ="checkbox" id={'allCheck'} onChange={this.onCheck} name="tableCheck" /> </label></th>
                                <th>&nbsp;&nbsp;Customer Name </th>
                                <th>Customer # </th>
                                <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Invoice # </th>
                                <th>&nbsp;&nbsp;&nbsp;&nbsp;Invoice Amount </th>
                                <th>&nbsp;&nbsp;Due Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                <th>Payment Date &nbsp;&nbsp;&nbsp;&nbsp;</th>
                                <th>Aging Bucket &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
                                <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Notes </th>
                            </tr>
                            </thead>
                            
                            <br/>
                            <tbody>
                        {
                        
                            this.state.orderList.map(
                                (rowData,key)=>{
                                    if(key%2==0)
                                    return(
                                    <tr className='tablerow' id={key}>
                                    <td> <label><input type ="checkbox" id={"tableData"+key} onChange={this.onCheck} name="tableCheck" /> </label> </td>
                                        <td className="null">{rowData.customerName}</td>
                                        <td className="null2">{rowData.customerNumber}</td>
                                        <td className="null2">{rowData.invoiceNumber}</td>
                                        <td className="null1">{rowData.invoiceAmount}</td>
                                        <td className="null3">{rowData.dueDate}</td>
                                        <td></td>
                                        <td></td>
                                        <td className="notes">{rowData.notes}</td>
                                    </tr>)
                                    else
                                    return(
                                        <tr className='tablerowalt' id={key}>
                                            <td> <label><input type ="checkbox" id={"tableData"+key} onChange={this.onCheck} name="tableCheck" /> </label> </td>
                                        <td className="null">{rowData.customerName}</td>
                                        <td className="null2">{rowData.customerNumber}</td>
                                        <td className="null2">{rowData.invoiceNumber}</td>
                                        <td className="null1">{rowData.invoiceAmount}</td>
                                        <td className="null3">{rowData.dueDate}</td>
                                        <td ></td>
                                        <td></td>
                                        <td className="notes">{rowData.notes}</td>
                                        </tr>)
                                }
                            )
                           
                        }
                        </tbody>
                        </table>
                        </div>
                        <br/>
                       
                    </div>
                    <AddPopup show={this.state.addMode} setShow={this.hideAddPopup}/>
                        { this.state.checkedId===-1 ?null:
                        <div>
                        <EditPopup show={this.state.editMode} setShow={this.hideEditPopup}
                        orderID = {this.state.orderList[this.state.checkedId.toString().substr(9)].orderID}
                        orderAmount = { this.state.orderList[this.state.checkedId.toString().substr(9)].orderAmount}
                        Notes ={ this.state.orderList[this.state.checkedId.toString().substr(9)].Notes}
                        approvalStatus ={ this.state.orderList[this.state.checkedId.toString().substr(9)].approvalStatus}
                        approvalBy ={ this.state.orderList[this.state.checkedId.toString().substr(9)].orderAmount<=10000?"David_Lee":this.state.orderList[this.state.checkedId.toString().substr(9)].orderAmount>50000?"Matthew_Vance":"Laura_Smith"}
                        />
                        </div>
                        }

            </div>
            </div>
        )
    }

}

export default Dash;




