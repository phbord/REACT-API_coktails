import { useEffect, useRef, useState } from "react";
import {useCocktails} from "../hook/useCocktail";

const Cocktails = () => {
    const [url, setUrl] = useState('margarita');
    const [cocktails, loading, validRequest] = useCocktails(url);
    const [drinks, setDrinks] = useState(cocktails);
    const inputRef = useRef()

    useEffect(() => {
        setDrinks(cocktails);
    }, [cocktails, drinks])

    const handleSubmit = (e) => {
        e.preventDefault()
        setUrl(inputRef.current.value);
    }

    return ( <>
        <h2 className="mt-4">Cocktails</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="saisir une cocktail" className="me-2" ref={inputRef} />
            <input type="submit" value="rechercher" />
        </form>
        {
            loading
                ? <>Données en cours de chargement</>
                : validRequest
                    ? <div className="row mt-4">
                        {
                            drinks.map((item) => {
                                return <article className="col-3" key={item.id}>
                                    <h2>{item.nom}</h2>
                                    <img src={item.img} alt="" className="img-fluid" />
                                    <p>{item.description}</p>
                                </article>
                            })
                        }
                    </div>
                    : <div className="mt-3">Nom du cocktail saisi innexistant !</div>
        }
    </> );
}
 
export default Cocktails;

// synthèse : 
// créer des composants
// faire communiquer des composants Parent Enfant (props) / Cousins (context)
// hook 
// useState / useEffect / useReducer / useRef / useContext (createContext)
// créer nos propres hooks
// jsx 

// pas vue ensemble
// useMemo useCallback 
// redux 