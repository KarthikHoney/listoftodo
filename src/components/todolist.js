import {Component} from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./todolist.css"

class Todo extends Component{
    state={userInput:"",notes:[]}

    componentDidMount(){
        const saveNotes = JSON.parse(localStorage.getItem('notes'))
        if(saveNotes){
            this.setState({notes:saveNotes})
        }
    }

    componentDidUpdate(prevProps,prevState){
        if(prevState.notes !== this.state.notes){
            localStorage.setItem('notes',JSON.stringify(this.state.notes))
        }
    }

    

    onChangeUser =(e)=>{
        this.setState({userInput:e.target.value})
    }

    onClickEnterOnAddButton=()=>{
        const {userInput,notes}=this.state;
        const newNotes={
            id:notes.length+1,
            text:userInput,
        }
        this.setState({notes:[...notes,newNotes],userInput:""});
    }

    onClickDeleteButton=(id)=>{
        const {notes}=this.state;
        const filterData = notes.filter((item)=>item.id!==id)
        

        this.setState({notes:filterData})
    }
    render(){
        const {userInput,notes}=this.state;
        const findData = notes.filter((each)=>each.text.toLowerCase().includes(userInput.toLowerCase()))
        return(
            <div className="container">
                <h1 className="head">Todo List  <i class="bi bi-journal-bookmark-fill"></i> </h1>
                <div className="cardContainer">
                <input className="search" placeholder="search" onChange={this.onChangeUser} value={userInput} type="search"/>
                <button className="button" onClick={this.onClickEnterOnAddButton}>Adding Todos</button>
                <div>
  {findData.length === 0 ? (
    <p className="para">No data</p>
  ) : (
    <ol style={{listStyleType:"none"}}>
      {findData.map(each => (
        <div className="listContainer" key={each.id}>
          <li className="list">{each.text}</li>
          <li>
            <button className="buttonD" onClick={() => this.onClickDeleteButton(each.id)}>
              <i className="bi bi-trash2-fill"></i>
            </button>
          </li>
        </div>
      ))}
    </ol>
  )}
</div>

                </div>
            </div>
        )
    }
}
export default Todo;