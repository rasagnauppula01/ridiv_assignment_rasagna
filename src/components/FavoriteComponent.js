import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './FavoriteComponent.css';

function FavoriteComponent({ favorites, onFavoritesUpdate }) {
  const [newFavorite, setNewFavorite] = useState('');
  
  const fetchFavorites = useCallback(async () => {
    const response = await axios.get('https://backenddata-f1y7.onrender.com/favorites');
    onFavoritesUpdate(response.data);
  }, [onFavoritesUpdate]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const addFavorite = async () => {
    if (newFavorite) {
      const response = await axios.post('https://backenddata-f1y7.onrender.com/favorites', { name: newFavorite });
      onFavoritesUpdate([...favorites, response.data]);
      setNewFavorite('');
    }
  };

  const removeFavorite = async (id) => {
    await axios.delete(`https://backenddata-f1y7.onrender.com/favorites/${id}`);
    onFavoritesUpdate(favorites.filter(fav => fav.id !== id));
  };

  return (
    <>
    <h2>Favorites Cities</h2>
    <div className="favorite-container">
      <h3>Favorites</h3>
      <input 
        type="text" 
        value={newFavorite} 
        onChange={(e) => setNewFavorite(e.target.value)} 
        placeholder="Add favorite city" 
      />
      <button onClick={addFavorite}>Add</button>
      <ul>
        {favorites.map(fav => (
          <li key={fav.id}>
            {fav.name}
            <button onClick={() => removeFavorite(fav.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default FavoriteComponent;
