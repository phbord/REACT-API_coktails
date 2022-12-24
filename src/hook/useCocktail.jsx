import { useState, useEffect } from "react";

export function useCocktails(url) {
    const [cocktails, setCocktails] = useState([])
    const [loading, setLoading] = useState(true)
    const [validRequest, setValidRequest] = useState(true)

    async function getCocktails() {
        try {
            const reponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${url}`)
            const cocktails = await reponse.json()
            setLoading(false)
            setValidRequest(true)
            setCocktails(cocktails.drinks.map((item) => {
                return {
                    id : item.idDrink,
                    nom : item.strDrink,
                    img : item.strDrinkThumb,
                    description : `${item.strInstructions.slice(0, 100)}...`
                }
            }).slice(0,4))
        } catch (error) {
            setValidRequest(false)
            console.log('Erreurs de connexion : ', error)
        }
    }

    useEffect(() => {
        getCocktails()
    }, [url, validRequest])

    return [cocktails, loading, validRequest]
}