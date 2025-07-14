import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

// created_atの出力用
function formatData(dateString: string) {
    return new Date(dateString).toISOString().split('T')[0];
}

export default async function Recipespage() {
    const supabase = await createClient()

    // ユーザー情報の取得
    const {data: {user}} = await supabase.auth.getUser()

    if (!user) throw new Error('User not found')

    // DBから入力されたid, title, description, slugを受け取る
    const {data: recipes, error} = await supabase.from('recipes').select('id, title, description, created_at, slug').eq('user_id', user.id).order('created_at', {ascending: false})

    if(error) {
        return <p>エラーが発生しました：{error.message}</p>
    }
    
    return (
        <div className="min-h-screen bg-amber-200">
            <div className="max-w-3xl mx-auto py-12 px-5">
                <ul className="space-y-4">
                    {recipes && recipes.length > 0 ? (
                        recipes.map((recipe) => (
                            <li key={recipe.id} className="bg-white border border-gray-300 rounded-md shadow-sm p-4 mb-5">
                                <Link href={`recipes/${recipe.slug}`}>
                                    <h2 className="text-lg font-semibold text-gray-800">{recipe.title}</h2>
                                </Link>
                                <p className="text-sm text-gray-600 mt-1">{recipe.description}</p>
                                <p className="text-xs text-gray-500 mt-1">{formatData(recipe.created_at)}</p>
                            </li>
                        ))
                    ) : (
                        <p>まだレシピがありません。</p>
                    )}
                </ul>
            </div>
        </div>
    )
}