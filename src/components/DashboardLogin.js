import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';

function DashboardLogin({success,setSuccess}) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error , setError] = useState('')

    function Login() {
        if (username === "root" && password === "admin") {
            localStorage.setItem('admin', "true")
            setError('')
            setSuccess(true)
        } else {
            setError("Invalid credentials")
        }
    }

    return (
        <Card sx={{ width: '90%', maxWidth: 345, /*position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)'*/ }} >
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
                    <TextField value={username} onChange={(e)=>{setUsername(e.target.value)}} id="outlined-basic" label="Username" variant="outlined" style={{ width: '100%', marginBottom: '20px', marginTop: '30px' }} />
                    <TextField value={password} onChange={(e)=>{setPassword(e.target.value)}} id="outlined-basic" label="Password" variant="outlined" style={{ width: '100%', marginBottom: '20px' }} />
                </Typography>
            </CardContent>

            <CardActions>
                <Button size="large" style={{ marginLeft: 'auto' }} onClick={()=>Login()} >Login</Button>
            </CardActions>
        <p style={{color:'red'}} >{error}</p>
        </Card>
    )
}

export default DashboardLogin