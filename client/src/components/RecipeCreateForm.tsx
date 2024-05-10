import { FormEvent, useState } from "react";
import { useCreateRecipe } from "../hooks/useCreateRecipe";

const RecipeCreateForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const { mutate: addRecipe, isPending } = useCreateRecipe();

  const onAddRecipe = (ingredient: string): void => {
    if (!ingredient) return;
    setIngredients((prev) => [...prev, ingredient]); //[...[prevStr],string]
    setIngredient("");
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { title, description, ingredients };
    addRecipe(data);
  };

  return (
    <div className="flex justify-center">
      <form
        onSubmit={onSubmit}
        className="p-10 mt-10 border border-black rounded-md w-[400px]"
      >
        <h1 className="mb-5 text-2xl font-bold text-center">Create Form</h1>
        <div className="flex flex-col gap-y-3">
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="title"
            className="py-3 ps-2 border border-gray-500 w-[300px] rounded-md"
          />
          <input
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            type="text"
            placeholder="description"
            className="py-3 ps-2 border border-gray-500 w-[300px] rounded-md"
          />
          <div className="flex items-center gap-x-3">
            <input
              onChange={(e) => setIngredient(e.target.value)}
              value={ingredient}
              type="text"
              placeholder="ingredients"
              className="py-3 ps-2 border border-gray-500 w-[300px] rounded-md"
            />
            <button
              type="button"
              onClick={() => onAddRecipe(ingredient)}
              className="w-10 h-10 text-2xl text-white bg-black rounded-full"
            >
              +
            </button>
          </div>
          <div className="flex flex-wrap items-center w-full gap-3">
            {ingredients.map((ingredient: string, i: number) => (
              <div
                key={i}
                className="px-3 py-2 text-white bg-black rounded-3xl"
              >
                {ingredient}
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="p-3 text-center text-white bg-black rounded-md cursor-pointer"
          >
            {isPending ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeCreateForm;
