import { Component, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { RestaurantDetails } from "./components/RestaurantDetails";
import axios from "axios";
import { Button, Heading, Input, Text } from '@chakra-ui/react';
function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [ratingOrder, setRatingOrder] = useState("asc");
  const [costOrder, setCostOrder] = useState("asc");
  const [show, setShow] = useState(false);
  const [filterRating, setFilterRating] = useState(0);
  const [q, setQ] = useState("");
  const [text, setText] = useState("");
  const [show2, setShow2] = useState(false);
  useEffect(() => {
    getdetails({ page, ratingOrder, costOrder, filterRating, q });
  }, [page, ratingOrder, costOrder, filterRating, q]);

    if (page > 5) {
      setPage(5);
    }

  const getdetails = async ({
    page,
    ratingOrder,
    costOrder,
    filterRating,
    q,
  }) => {
    try {
      setLoading(true);
      const res = await axios({
        method: "get",
        url: "http://localhost:8080/food",
        params: {
          _page: page,
          _limit: 5,
          _sort: "rating,cost",
          _order: `${ratingOrder},${costOrder}`,
          // _sort: "cost",
          // _order: costOrder,
          rating_gte: filterRating,
          q: q,
        },
      });

      setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("error", error);
    }
  };
  console.log(page);

  return (
    <div className="App">
      <Heading>Restaurants</Heading>
      {loading ? <Text>loading</Text> : null}
      {/* sort in cost Ascending & Descending Button*/}
      <div style={{ marginTop: '5px'}}>
        {show ? <Button variant='outline' colorScheme='teal' onClick={() => {setShow(!show); setCostOrder('asc')}}>Ascending</Button> : <Button variant='outline' colorScheme='teal' onClick={() => {setShow(!show); setCostOrder('desc')}}>Descending</Button>}
      </div>
      {/* sort by rating in  Ascending & Descending Button*/}
      <div style={{ marginTop: '5px'}}>
        {show2 ? <Button variant='outline' colorScheme='teal' onClick={() => {setShow2(!show2); setRatingOrder('asc')}}>Sort by Ascending rating</Button> : <Button variant='outline' colorScheme='teal' onClick={() => {setShow2(!show2); setRatingOrder('desc')}}>Sort by Descending rating</Button>}
      </div>

      <div style={{ marginTop: '5px'}}>
        <Button
          disabled={page === 1}
          style={{marginRight: '5px'}}variant='outline' colorScheme='teal' onClick={() => {
            setPage(page - 1);
          }}
        >
          Prev
        </Button>
        <Button
          variant='outline' colorScheme='teal' onClick={() => {
            setPage(page + 1);
          }}
        >
          Next
        </Button>
      </div>

      <div style={{ marginTop: '5px'}}>
        <Button style={{ marginLeft: '5px'}} variant='outline' colorScheme='teal' onClick={() => setFilterRating(1)}>
          Rating Greater than 1
        </Button>
        <Button style={{ marginLeft: '5px'}} variant='outline' colorScheme='teal' onClick={() => setFilterRating(2)}>
          Rating Greater than 2
        </Button>
        <Button style={{ marginLeft: '5px'}} variant='outline' colorScheme='teal' onClick={() => setFilterRating(3)}>
          Rating Greater than 3
        </Button>
        <Button style={{ marginLeft: '5px'}} variant='outline' colorScheme='teal' onClick={() => setFilterRating(4)}>
          Rating Greater than 4
        </Button>
        <Button style={{ marginLeft: '5px'}} variant='outline' colorScheme='teal' onClick={() => setFilterRating(0)}>Rating All</Button>
      </div>
      <br />

      {/*  seach using keywords input search as well*/}
      <div style={{ marginTop: '5px'}}>
        <Input style={{ marginRight: '5px'}} variant='filled' htmlSize={15} width='auto' value={text} type='text' onChange={(e) => {
          setText(e.target.value);
        }} />
        <Button variant='outline' colorScheme='teal'
          onClick={() => {
            setQ(text);
          }}
        >
          Search
        </Button >
      </div>

      <div>
        {data.map((item) => {
          return <RestaurantDetails key={item.id} {...item} />;
        })}
      </div>
    </div>
  );
}
export default App;
