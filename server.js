
const express = require('express')
const app = express()
const port = 3000
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const path =require('path');

app.use(express.static(path.join(__dirname,'public')));

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'public','index.html'))
})
app.get('/api/artists', async (req, res) => {
    const{data,error} = await supabase.from('artists').select("*");
    if(error){
        console.log("Error fetching artists:",error.message);
        return res.send(error.message)
    }
    console.log("Sending Artist: ",data);
    res.json(data);
})
app.get('/api/songs', async (req, res) => {
    const{data,error} = await supabase.from('songs').select("*");
    if(error){
        console.log("Error fetching artists:",error.message);
        return res.send(error.message)
    }
    console.log("Sending Songs: ",data);
    res.json(data);
})
app.get(`/api/songs/:artist`, async (req, res) => {
    const artist=req.params.artist;
    const{data,error} = await supabase.from('songs').select("*").eq('artist_name',artist);
    if(error){
        console.log("Error fetching songs:",error.message);
        return res.send(error.message)
    }
    console.log("Sending Songs: ",data);
    res.json(data);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
