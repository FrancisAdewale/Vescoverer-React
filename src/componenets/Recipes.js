import React, { useEffect, useState } from "react"
import Recipe from "./Recipe"

export default function Recipes() {

    const [recipesData, setRecipesData] = useState([])

    useEffect(() => {
        fetch("https://api.spoonacular.com/recipes/complexSearch?apiKey=e742b07ea05f4a00ade106e82a60e347&diet=vegan&number=100&addRecipeInformation=True")
        .then(res => res.json())
        .then(data => setRecipesData(data.results))
    }, [])

    const viewRecipe = (link) => {
        window.open(link)
    }
    return (
        <div className="recipe-horizontal-scroll">
            {
                recipesData.map(item => {
                    return <Recipe 
                    image={item.image}
                    title={item.title}
                    time={item.readyInMinutes}
                    rating={item.healthScore}
                    handleClick={viewRecipe}
                    link={item.spoonacularSourceUrl
                    }
                    />
                })
            }
        </div>
    )  
}