'use client'

import { createClient } from "@/utils/supabase/client"
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditRecipePage() {
    const supabase = createClient();
    const router = useRouter();
    const params = useParams();
    const slug = params.slug as string;
    
    const [loading, setLoading] = useState(true)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [ingredients, setIngredients] = useState([''])
    const [steps, setSteps] = useState([''])
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchRecipe = async () => {
            // データの取得
            const {data, error} = await supabase.from('recipes').select('*').eq('slug', slug).single();
            if (data && !error) {
                setTitle(data.title)
                setDescription(data.description)
                setIngredients(data.ingredients)
                setSteps(data.steps)
                setLoading(false)
            } else {
                setError(error?.message || 'エラーメッセージが出ました。');
                setLoading(false)
                return
            }
        }
        fetchRecipe();
    }, [slug, supabase])

    // 材料のindexごとにvalueを保存する
    const handleIngredientChange = (index: number, value: string) => {
        const newIngredients = [...ingredients]
        newIngredients[index] = value
        setIngredients(newIngredients)
    }

    // 材料の追加ボタン
    const addIngredient = () => {
        setIngredients([...ingredients, ''])
    }

    // 作り方のindexごとにvalueを保存する
    const handleStepChange = (index: number, value: string) => {
        const newSteps = [...steps]
        newSteps[index] = value
        setSteps(newSteps)
    }

    // 作り方の追加ボタン
    const addStep = () => {
        setSteps([...steps, ''])
    }

    // 保存ボタンでsupabaseのデータをupdate
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        // ユーザー認証
        const {data: {user}, error: userError} = await supabase.auth.getUser()

        if (userError || !user) {
            setError('ユーザー情報の取得に失敗しました。')
            return
        }

        const {error: updateError} = await supabase.from('recipes').update({
            title,
            description,
            ingredients,
            steps,
        }).eq('slug', slug)

        if (updateError) {
            setError(updateError.message)
            return
        }
        router.push('/recipes')
    }


    if (error) return <p className="text-red-500 p-4">{error}</p>;
    if (loading) return <p className="p-4">読み込み中...</p>
    
    return (
        <div className="min-h-screen bg-amber-200">
            <div className="max-w-3xl mx-auto py-12 px-5">
                <h1 className="text-2xl font-bold mb-6">レシピを編集</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-1 font-semibold">タイトル</label>
                        <input 
                            type="text"
                            className="w-full border border-gray-300 rounded px-3 py-2 bg-white"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength={30}
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold">レシピの詳細</label>
                        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="w-full border border-gray-300 rounded px-3 py-2 bg-white" rows={3} maxLength={100} required></textarea>
                    </div>

                    <div className="flex flex-col">
                        <label className="block mb-1 font-semibold">材料</label>
                        {ingredients.map((ing, i) => (
                            <div key={i} className="flex items-center mb-1.5">
                                <p>・</p>
                                <input 
                                    type="text"
                                    className="w-sm border border-gray-300 rounded px-3 py-2 bg-white ml-1.5"
                                    value={ing}
                                    onChange={(e) => handleIngredientChange(i, e.target.value)}
                                />
                            </div>
                        ))}
                        <button type="button" className="text-blue-600 hover:underline self-start ml-5" onClick={addIngredient}>
                            ＋材料を追加
                        </button>
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold">作り方</label>
                        {steps.map((step, i) => (
                            <div key={i} className="flex items-center mb-1.5">
                                <p>{i + 1}.</p>
                                <input 
                                    type="text"
                                    className="w-full border border-gray-300 rounded px-3 py-2 bg-white ml-1.5"
                                    value={step}
                                    onChange={(e) => handleStepChange(i, e.target.value)}
                                />
                            </div>
                        ))}
                        <button type="button" className="text-blue-600 hover:underline self-start ml-5" onClick={addStep}>
                            ＋作り方を追加
                        </button>
                    </div>

                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <button type="submit" className="bg-orange-400 text-white px-6 py-2 rounded hover:bg-orange-500">
                        更新する
                    </button>
                </form>
            </div>
        </div>
    )
}