import RecipeActions from "@/components/RecipeActions";
import { createClient } from "@/utils/supabase/server";

type Recipe = {
    id: string;
    title: string;
    description: string;
    slug: string;
    ingredients: string[];
    steps: string[];
    user_id: string;
    created_at: string;
};

export default async function RecipeDetailPage({params}: {params: Promise<{slug: string}>}) {
    const supabase = await createClient()
    const slug = (await params).slug

    // ユーザー情報の取得
    const {data: {user}} = await supabase.auth.getUser()

    if (!user) throw new Error('User not found')

    // DBからデータを受け取る
    const {data: recipe, error} = await supabase.from('recipes').select('*').eq('slug', slug).single<Recipe>();

    if(error) {
        return <p>エラーが発生しました：{error.message}</p>
    }

    return (
        <div className="min-h-screen bg-amber-200">
            <div className="max-w-3xl mx-auto py-12 px-5">
                <div className="flex justify-between items-start mb-4">
                    <h1 className="text-3xl font-bold text-gray-800">{recipe.title}</h1>
                    <RecipeActions recipe={recipe}/>
                </div>

                <p className="text-gray-700 mb-6">
                    {recipe.description}
                </p>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">材料</h2>
                    <ul className="list-disc list-inside w-sm bg-white rounded p-4">
                        {recipe.ingredients.map((item, index) => (
                            <li key={index} className="text-gray-700">{item}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2">作り方</h2>
                    <ol className="list-decimal list-inside w-full bg-white rounded p-4 space-y-2">
                        {recipe.steps.map((step, index) => (
                            <li key={index} className="text-gray-700">{step}</li>                            
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    )
}