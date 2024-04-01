import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

function AddMovieForm() {
  const [title, setTitle] = useState('');
  const [posterPath, setPosterPath] = useState('');
  const [overview, setOverview] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!title || !posterPath || !overview || !videoLink || !price || !type) {
        console.error('Please fill in all the fields.');
        return;
      }

      const movieData = {
        title: title,
        poster_path: posterPath,
        overview: overview,
        link_film: videoLink, // Thay đổi ở đây
        price: price,
        type: type,
      };

      const response = await axios.post('https://api-caycanh.vercel.app/api/addtree', movieData);

      console.log('Response:', response.data);

      setTitle('');
      setPosterPath('');
      setOverview('');
      setVideoLink('');
      setPrice('');
      setType('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <AddCss>
      <div className="App">
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label>Poster Path:</label>
          <input
            type="text"
            value={posterPath}
            onChange={(e) => setPosterPath(e.target.value)}
          />
        </div>

        <div>
          <label>Overview:</label>
          <textarea
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
          />
        </div>

        <div>
          <label>Video Link:</label>
          <input
            type="text"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
          />
        </div>

        <div>
          <label>Price:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label>Type:</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>

        <button onClick={handleSubmit}>Submit</button>
      </div>
    </AddCss>
  );
}

export default AddMovieForm;

const AddCss = styled.div`
  .App {
    display: flex;
    flex-direction: column;
    button {
      border-radius: 10px;
    }
    button:hover {
      background-color: #e8ed62;
    }
  }
  .App div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 10px;
    label {
      margin-right: 20px;
    }
  }
`;
