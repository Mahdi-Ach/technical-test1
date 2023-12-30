const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());

app.get('/users', async (req, res) => {
  try {
    const response = await axios.get('https://dummyjson.com/users/search?q='+req.query.criteria+"&limit="+req.query.limit+"&skip="+req.query.skip);
    const users = response.data;
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
