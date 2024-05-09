import { useNavigate } from "react-router-dom";
import "./App.css";
import { useGetAllRecipes } from "./hooks/useGetAllRecipes";
import { Recipe } from "./types";

function App() {
  const navigate = useNavigate();
  const { data: recipes, isLoading } = useGetAllRecipes();

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="flex flex-col mx-5 mt-5 gap-y-3">
      {recipes.map((recipe: Recipe) => (
        <div
          onClick={() => navigate(`/${recipe._id}`)}
          key={recipe._id}
          className="p-5 border border-gray-300 cursor-pointer"
        >
          <h1 className="text-2xl font-bold">{recipe.title}</h1>
          <p>{recipe.description}</p>
          <div className="flex mt-3 gap-x-3">
            {recipe.ingredients.map((ingredient: string) => (
              <div
                className="flex items-center justify-center px-3 text-white bg-black rounded-xl"
                key={ingredient}
              >
                {ingredient}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
