import React, { useEffect, useState, ChangeEvent, useRef } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './App.css';
import { Button, Pagination } from '@mui/material';
import Stack from '@mui/material/Stack';

interface User {
  id: string;
  image: string;
  firstName: string;
  maidenName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  username: string;
  password: string;
  birthDate: string;
  bloodGroup: string;
  height: string;
  weight: string;
  eyeColor: string;
  showMore:boolean,
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [stateFetch, setStateFetch] = useState<boolean>(false);
  const [page,setPage] = useState(1)
  const [lengthusers,setLengthUsers] = useState(0)
  const [searchValue,setSearchValue] = useState('')
  const number_item_perpage = 6
  const fetchUsers = async (value: string='') => {
    try {
      console.log(searchValue)
      const response = await fetch('http://localhost:3001/users'+'?limit='+number_item_perpage+"&skip="+(page-1)*number_item_perpage+"&criteria="+value);
      const data = await response.json();
      setUsers(data.users);
      setStateFetch(false);
      setLengthUsers(data.total)
      return data;
    } catch (error: any) {
      setStateFetch(true);
    }
  };
  useEffect(() => {
    fetchUsers(searchValue);
  }, [page]);

  const toggleShowMore = (index: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user, i) =>
        i === index ? { ...user, showMore: !user.showMore } : user
      )
    );
  };
  const searching = (e: ChangeEvent<HTMLInputElement>) => {
    setPage(1)
    setSearchValue(e.target.value)
    fetchUsers(e.target.value)
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box className="input_search">
          <TextField id="standard-basic" label="Inser A Keyword" value={searchValue} variant="standard" inputProps={{onInput: searching}} />
      </Box>
      <Grid container sx={{ p: 2 }}>
      {stateFetch && <h3>error while fetching users</h3>}
        {!stateFetch && users.length > 0 && users.map((user,index)=>{    
          return(
            <Grid sx={{ p: 2 }} className="card_item" item key={user.id} xs={12} sm={6} md={4}>
              <Card>
                <CardContent className="persons">
                <CardMedia
                  sx={{p:1,height: 140}}
                  image={user.image}
                  title="green iguana"
                />
                <Box>
                  <p>{user.id}</p>
                    <p><span>FullName : </span>{user.firstName} {user.maidenName} {user.lastName}</p>                
                    <p><span>Age : </span>{user.age}</p>                  
                    <p><span>Gender : </span>{user.gender}</p>                  
                    <p><span>Email : </span>{user.email}</p>                  
                    <p><span>Username : </span>{user.username}</p>                  
                    <p><span>Password : </span>{user.password}</p>
                    {user.showMore && (
                      <>
                        <p><span>BirthDate : </span>{user.birthDate}</p>                  
                        <p><span>BloodGroup : </span>{user.bloodGroup}</p>                  
                        <p><span>Height : </span>{user.height}</p>                  
                        <p><span>Weight : </span>{user.weight}</p>                  
                        <p><span>Eye Color : </span>{user.eyeColor}</p>
                      </>
                    )}            
                    <Button variant="contained" size="small" onClick={() => toggleShowMore(index)}>
                      {user.showMore ? 'Show less' : 'Show more'}
                    </Button>
                </Box>
                </CardContent>
              </Card>
            </Grid>
          ) 
        })}
      </Grid>
      <Stack spacing={2}>
        <Pagination page={page} className="pagination" count={Math.ceil(lengthusers/number_item_perpage)} color="primary" onChange={async (_, page) => {
            setPage(page)
        }}/>
      </Stack>
    </Box>
  );
}

export default App;
