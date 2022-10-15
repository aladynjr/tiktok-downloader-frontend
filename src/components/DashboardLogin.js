import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import LinesAnimation from './LinesAnimation'
import { db } from "../firebase-config";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy, where, serverTimestamp } from "firebase/firestore";
import LoadingButton from '@mui/lab/LoadingButton';

function DashboardLogin({ success, setSuccess }) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const [loading, setLoading] = useState(false)

    const [usernames, setUsernames] = useState([]);

    const GetUsernames = async (username, password) => {
        setLoading(true)

        username = username.toLowerCase();
        password = password.toLowerCase();

        const q = query(collection(db, "admin_accs"), where("username", "==", username), where("password", "==", password));

        const querySnapshot = await getDocs(q);

        var usernames = []
        querySnapshot.forEach((doc) => {
            usernames.push(doc.data()) 
        });

        if(usernames.length > 0) {
               localStorage.setItem('admin', "true")
              setSuccess(true)
                setError('')
            } else {
                setError("Invalid credentials")
            }
            setLoading(false)
          console.log( usernames);

    };

            //wait for the promise to be fulfilled then log the usernames to the console
            /* const querySnapshot = await getDocs(collec); 
             setUsernames(querySnapshot.docs.map(doc => doc.data()))*/
     
          
function SortObjectByKey(object, key){
    var result = Object.keys(object).sort(function(a,b){
        return object[a][key] >= object[b][key];
    })
    return result;
}
        
    return (
        <div>

            <Card sx={{ width: '90%', maxWidth: 345, position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', zIndex: '10' }} >
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="70"
                    image="https://st3.depositphotos.com/22053566/36340/v/600/depositphotos_363404864-stock-illustration-colored-modern-background-style-social.jpg"
                    title="Activ8 brain building up your brain"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        TokDownload <b>Dashboard</b>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <TextField value={username} defaultValue={username} onChange={(e) => { setUsername(e.target.value) }} id="outlined-basic" label="Username" variant="outlined" style={{ width: '100%', marginBottom: '20px', marginTop: '30px' }} />
                        <TextField value={password} defaultValue={password} type={"password"} onChange={(e) => { setPassword(e.target.value) }} id="outlined-basic" label="Password" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} />
                    </Typography>
                </CardContent>

                <CardActions>
                    <LoadingButton loading={loading} size="large" style={{ marginLeft: 'auto' }} onClick={() => GetUsernames(username, password)} >Login</LoadingButton>
                </CardActions>
                <p style={{ color: 'red' }} >{error}</p>
            </Card>

        </div>
    )
}

export default DashboardLogin