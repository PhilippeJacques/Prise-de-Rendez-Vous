import React, {useEffect, useState} from 'react'
import Navbar from '../Navbar';
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from '@mui/material/Button';
import SnackBar from "material-ui/Snackbar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";








const Associations = (props) => {
  const [associations, setAssociations] = useState([]);
  const [appointmentooh, setAppointmentooh] = useState([]);
  const [datathis, setDatathis] = useState();
  const [check, setCheck] = useState([]);

  

        
      useEffect(() => {
        axios.get(`api/associations`)
        .then(res => {
          const associations = res.data;
          setAssociations(associations);
         
        })
        axios.get(`/appointments`)
        .then(res => {
          const appointmentooh = res.data;
  
         setAppointmentooh(appointmentooh);
        })
        axios.get('http://localhost:5000/appointmentByAssocs/'+user.name) .then(res => {
        const check = res.data[0];
        if(check != undefined){
        setCheck(check);}
     

      })
       
          
      }, [appointmentooh,check])

      const deleteAppoint = async() => {
        await axios.delete(`http://localhost:5000/appointmentDelete/`+datathis);
        window.location.reload();

      }
      useEffect(() => {deleteAppoint();}, [datathis]);
      const { user } = props.auth;

      

        
       
      

     

    return (
        <>
        <Navbar />
        <div >
        <div className="container">
        {user.role === "etudiant" ? 
        <ul className="name-lable">
        { associations.map(assocs =>
          <ul className="container">
        <Card sx={{ maxWidth: 250 }}>
      
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        { assocs.name }
        </Typography>
        <Typography variant="body2" color="text.primary">
       <strong> email: { assocs.email }</strong>
        </Typography>
        <Typography variant="body2" color="text.primary">
        <strong>Tel: { assocs.phone }</strong>
        </Typography>
      </CardContent>
      <CardActions>
      <Link to={{
pathname: '/appoint',
state: assocs.name
}} className="btn btn-primary">Prendre Rendezvous</Link>

<Button color="secondary" variant="contained" >Infos</Button> 
      </CardActions>
    </Card> </ul>)} </ul>

         : "" }










         { user.role ==="association" ? 
         <ul className="container">
          
         { appointmentooh.map(appoints =>
           <ul className="container">
             { user.name === check.nameAssocs ?
         <Card sx={{ maxWidth: 300 }}>
       
       <CardContent>
         <Typography gutterBottom variant="h5" component="div">
         { appoints.name }
         </Typography>
         <Typography variant="body2" color="text.secondary">
         email: { appoints.email }
         </Typography>
        
         <Typography variant="body2" color="text.primary">
         Tel: { appoints.phone }
         </Typography>
         <Typography variant="body2" color="text.primary">
        Date: { appoints.slots.slot_date }
         </Typography>
         <Typography variant="body2" color="text.primary">
         l'heure: { appoints.slots.slot_time }
         </Typography>
       </CardContent>
       <CardActions>
       <Button color="secondary"  variant="contained"  onClick={() => {setDatathis(appoints._id);deleteAppoint();}}>Supprimer</Button>
              <Button color="primary" variant="contained" >Modifier</Button> 
       </CardActions>
     </Card> :"" } </ul> )} </ul>
         
         : ""}
         </div>
         </div>
        </>
    )
}

 
Associations.propTypes = {
    auth: PropTypes.object.isRequired
  };
const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps
  )(Associations);
  