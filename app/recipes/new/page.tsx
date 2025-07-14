'use client'

import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import slugify from "slugify"

export default function NewRecipePage() {
    const router = useRouter()
    const supabase = createClient()
    
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [ingredients, setIngredients] = useState([''])
    const [steps, setSteps] = useState([''])
    const [error, setError] = useState('')

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

    // 保存ボタンで入力データを保存する
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // ユーザー認証
        const {data: {user}, error: userError} = await supabase.auth.getUser()

        if (userError || !user) {
            setError('ユーザー情報の取得に失敗しました。')
            return
        }

        // slugをタイトル名（日本語を変換）＋idにする
        const generateSlug = (title: string) => {
            return slugify(title, {
                replacement: '-',
                lower: true,
                strict: true,
                locale: 'ja'
            })
        }
        const baseSlug = generateSlug(title);
        
        // 入力データの保存（slugは一旦空でinsertしてidを取得する）
        const {data: insertedData, error: insertError} = await supabase.from('recipes').insert({
            title,
            description,
            ingredients,
            steps,
            user_id: user.id,
            slug: '',
        })
        .select('id')
        .single();

        if (insertError || !insertedData) {
            setError(insertError?.message || 'レシピの保存に失敗しました。')
            return
        }

        // idを取得して最終的なslugを作ってDBを更新する
        const newSlug = `${baseSlug}-${insertedData.id}`;
        const {error: updateError} = await supabase.from('recipes').update({slug: newSlug}).eq('id', insertedData.id);

        if (updateError) {
            setError(updateError.message);
            return;
        }

        router.push('/recipes');
    }


    return (
        <div className="min-h-screen bg-amber-200">
            <div className="max-w-3xl mx-auto py-12 px-5">
                <h1 className="text-2xl font-bold mb-6">レシピを追加</h1>

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
                        保存する
                    </button>
                </form>
            </div>
        </div>
    )
}