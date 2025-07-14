'use client'

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation"
import { useState } from "react"

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

type Props = {
    recipe: Recipe;
}

export default function RecipeActions({recipe}: Props) {
    const [showActions, setShowActions] = useState(false)
    const router = useRouter();
    const supabase = createClient();

    // 削除ボタンを押したときの機能実装
    const handleDelete = async () => {
        const confirmed = confirm("このレシピを削除してもいいですか？");
        if (!confirmed) return;

        const {error} = await supabase.from('recipes').delete().eq('id', recipe.id);
        if (!error) {
            router.push('/recipes');
        }
    }

    return (
        <div className="relative">
        <button onClick={() => setShowActions(!showActions)} className=" text-2xl font-bold text-gray-700 hover:text-gray-900">
            ⋮
        </button>
        {showActions && (
            <div className="absolute flex flex-col right-0 mt-2 w-24 bg-white border rounded shadow">
                <button onClick={() => router.push(`/recipes/${recipe.slug}/edit`)} className="block w-full text-left px-4 py-2 border-b hover:bg-gray-100">
                    編集
                </button>
                <button onClick={handleDelete} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100">
                    削除
                </button>
            </div>
        )}
    </div>
    )
}