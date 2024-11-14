import React, { useState } from 'react';
import './FoodRecipeFinder.css';

const FoodRecipeFinder = () => {
    const [searchValue, setSearchValue] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const searchRecipes = async () => {
        if (!searchValue.trim()) {
            setError('Please enter a search term.');
            setRecipes([]);
            return;
        }

        setLoading(true);
        setError('');
        try {
            const response = await fetch(`https://api.edamam.com/search?q=${searchValue}&app_id=7aa516a5&app_key=dc836a223fb788b11ae390504d9e97ce&from=0&to=10`);
            if (!response.ok) throw new Error('Failed to fetch recipes');
            const data = await response.json();
            setRecipes(data.hits);
            if (data.hits.length === 0) setError('No recipes found.');
        } catch (err) {
            setError('Failed to fetch recipes. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main">
            <div className="search-container">
                <div className="search-box">
                    <input
                        type="text"
                        className="input"
                        placeholder="Search food or ingredients..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                searchRecipes();
                            }
                        }}
                    />
                    <button className="btn-icon-content" onClick={searchRecipes}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="search-icon">
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" fill="#fff"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div classname="MSG">
                <h1>Food Recipe Finder</h1>
                {loading ? (
                    <p>Loading ...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <div className="recipe-result">
                        <ul id="results">
                            {recipes.map((recipeData, index) => (
                                <li key={index} className="recipe-item">
                                    <div>
                                        <img src={recipeData.recipe.image} alt={recipeData.recipe.label} />
                                        <h3>{recipeData.recipe.label}</h3>
                                    </div>
                                    <div className="recipe-link">
                                        <a href={recipeData.recipe.url} target="_blank" rel="noopener noreferrer">
                                            View Recipe
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FoodRecipeFinder;