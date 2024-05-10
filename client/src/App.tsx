import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import { useGetAllRecipes } from "./hooks/useGetAllRecipes";
import { Recipe } from "./types";
import { MouseEvent } from "react";
import { useDeleteRecipe } from "./hooks/useDeleteRecipe";
import Pagination from "./components/Pagination";

function App() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { data, isLoading } = useGetAllRecipes();
  const { mutate: deleteRecipe } = useDeleteRecipe();

  const searchParams = new URLSearchParams(search);
  const page = searchParams.get("page");

  const onDelete = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    deleteRecipe(id);
    alert("deleted");
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="flex flex-col mx-5 mt-5 gap-y-3">
      {data.recipes.map((recipe: Recipe) => (
        <div
          onClick={() => navigate(`/${recipe._id}`)}
          key={recipe._id}
          className="flex items-center justify-between p-5 border border-gray-300 cursor-pointer"
        >
          <div>
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
          <button
            onClick={(e) => onDelete(e, recipe._id)}
            className="px-3 py-2 text-white bg-red-600 rounded-md cursor-pointerx"
          >
            Delete
          </button>
        </div>
      ))}
      <Pagination page={page || "1"} link={data.link} />
    </div>
  );
}

export default App;
