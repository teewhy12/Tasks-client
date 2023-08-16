import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import Loading from "../components/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import logo2 from "../assets/logo2.png";

const Update = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState("")
  const [tag, setTags] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const redirect = useNavigate();

  const { taskId} = useParams()

  const url = `https://teewhytaskproject.onrender.com/api/tasks/${taskId}`;
  const getTask = async () =>{
    const res = await fetch(url)
    const {tasks} = await res.json()

    setIsLoading(false)
    setTitle(tasks.title);
    setDescription(tasks.description)
    setTags(tasks.tag);
  }

  useEffect(() => {
    getTask();
  }, [taskId]);

  const handleUpdate = async (e) =>{
    e.preventDefault()
    try {
      const res = await fetch(url, {
       method: 'PATCH',
       headers: {
        "Content-Type":"application/json"
       },
       body: JSON.stringify({title, description, tag})
      })
      const data = await res.json()
      if (data.success){
        toast.success('Goal edited successfully')
        redirect('/all')
      } else {
        toast.error("error occured while updating, try again")
      }
    } catch (error) {
      console.log(error);
    }
  } 
  return (
    <div>
      <div>
<Navbar expand="lg" className="bg-white border-bottom border-2 head">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <div className="ms-auto my-2 my-lg-0 d-flex">
              <div className="mt-3 me-3 ">
                <Nav className="m-auto my-2 my-lg-0" navbarScroll>


                  <Link
                    to="/all"
                    className="text-decoration-none text-dark fw-bold tag"
                  >
                    All Tasks
                  </Link>
                </Nav>
              </div>
              <img src={logo2} alt="" className="mx-2 my-2 my-lg-0 d-block" />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </div>

     
      
      {isLoading ? (
        <Loading />
      ) : (
        <div className='container'>
          <form onSubmit={handleUpdate}>
            <ToastContainer />
              <div>
                 <h3>Edit Task</h3>

              <label className="title">
                <legend className="Task-header">Task Title:</legend>
              </label>
              <fieldset>
                <input
                  type="text"
                  className="title-input ps-2"
                  placeholder="E.g Project Defense, Assignment ..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </fieldset>
            </div>

            <div>
              <label className="title">
                <legend className="Task-header ">Description:</legend>
              </label>
              <fieldset>
                <textarea
                  className="area ps-2"
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </fieldset>
            </div>

            <div>
              <label>
                <legend className="Task-header">Tags:</legend>
              </label>
              <fieldset>
                <input
                  type="text"
                  className="title-input ps-2"
                  value={tag}
                  onChange={(e) => setTags(e.target.value)}
                />
              </fieldset>
            </div>

            <div>
              <button className="form-done mt-5">Done</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
export default Update;