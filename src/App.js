import logo from './logo.svg';
import './style.css';
import axios from "axios" ; 
import { useState, useEffect } from 'react' ; 

function App() {

  const [data, setData] = useState(null); 
  const [conv , setConv] = useState(null) ; 
  const [notYou , setNotYou] = useState(null) ; 
  const [active , setActive] = useState("no one") ; 

  useEffect(() => {
    // Axios GET request
    const headers = {
      "x-auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjExZTBiZjU1MGIwZWExMDhkZTdkODUiLCJmaXJzdG5hbWUiOiJvdXNzYW1hIiwibGFzdE5hbWUiOiJiZW4gaGFzc2VuIiwiZW1haWwiOiJvdXNzYW1hYmgyMDAzQGdtYWlsLmNvbSIsImlhdCI6MTcxMjg3ODUwMSwiZXhwIjoxNzEzNDgzMzAxfQ.qUTMYc1KiasneweJxCTdXWD2GcaDLNAntgBFm9sLyiw"
    }
    axios.get('http://localhost:3002/api/messages/conv',{
      headers: headers 
    })
      
      .then(response => {
        setData(response.data); // Store the response data in state
        console.log(response.data) ; 
      })
      .catch(error => {
        console.error('Error fetching data:', error); // Log the error to the console
      });
  }, []); // Empty dependency array means the effect runs once after the first render

  function clickHandler(event){
      const id = event.target.id; 
      const user = event.target.dataset.name ; 
      const headers = {
        "x-auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjExZTBiZjU1MGIwZWExMDhkZTdkODUiLCJmaXJzdG5hbWUiOiJvdXNzYW1hIiwibGFzdE5hbWUiOiJiZW4gaGFzc2VuIiwiZW1haWwiOiJvdXNzYW1hYmgyMDAzQGdtYWlsLmNvbSIsImlhdCI6MTcxMjg3ODUwMSwiZXhwIjoxNzEzNDgzMzAxfQ.qUTMYc1KiasneweJxCTdXWD2GcaDLNAntgBFm9sLyiw"
      }
      setTimeout(() => {
        axios.get('http://localhost:3002/api/messages/msg/' + id, {
            headers: headers
        })
        .then(res => {
            setConv(res.data.messages);
            setNotYou(id);
            setActive(user);

            console.log(conv); // Move inside the `then` callback
            console.log(notYou);
        })
        .catch(err => {
            console.error(err);
        });
    }, 1000);
}
    
  

  return (
    <div className="container">
  <div className="row clearfix">
    <div className="col-lg-12">
        <div className="card chat-app">
            <div id="plist" className="people-list">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fa fa-search"></i></span>
                    </div>
                    <input type="text" className="form-control" placeholder="Search..."></input>
                </div>
                <ul className="list-unstyled chat-list mt-2 mb-0">


                {data && data.map((user, index) => (
                  <li data-name={user.name} key={user.id} className="clearfix" id={user.id} onClick={clickHandler}>
                    <div className="about">
                      <div className="name">{user.name}</div>
                    </div>
                  </li>
                ))}
                        
                            
                            
                        
                    

                </ul>
            </div>
            <div className="chat">
                <div className="chat-header clearfix">
                    <div className="row">
                        <div className="col-lg-6">
                            <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                                <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar"></img>
                            </a>
                            <div className="chat-about">
                                <h6 className="m-b-0">{active}</h6>
                            </div>
                        </div>
                        <div className="col-lg-6 hidden-sm text-right">
                            <a href="javascript:void(0);" className="btn btn-outline-secondary"><i className="fa fa-camera"></i></a>
                            <a href="javascript:void(0);" className="btn btn-outline-primary"><i className="fa fa-image"></i></a>
                            <a href="javascript:void(0);" className="btn btn-outline-info"><i className="fa fa-cogs"></i></a>
                            <a href="javascript:void(0);" className="btn btn-outline-warning"><i className="fa fa-question"></i></a>
                        </div>
                    </div>
                </div>


                <div className="chat-history">


                    <ul className="m-b-0">

                    

                <ul class="m-b-0">
                  {conv && conv.map((message, index) => (

                      <li className='clearfix'>
                        {message.sender != notYou ? (
                          
                          <>
                          <div class="message-data text-right">
                                <span class="message-data-time">{message.timeStamp}</span>
                            </div>
                            <div class="message other-message float-right"> {message.content} {/* Render message.sender directly */} </div>
                          </>
                          
                        ): (
                          <>
                            <div class="message-data">
                                <span class="message-data-time">{message.timeStamp}</span>
                            </div>
                            <div class="message my-message">{message.content}</div>       
                        </>
                        )}
                          
                      </li>
                  ))}
                </ul>
                    </ul>
                </div>
                <div className="chat-message clearfix">
                    <div className="input-group mb-0">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><i className="fa fa-send"></i></span>
                        </div>
                        <input type="text" className="form-control" placeholder="Enter text here..."></input>                                    
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
  );
}

export default App;
