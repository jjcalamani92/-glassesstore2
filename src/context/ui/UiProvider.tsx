import React, { useEffect, useState } from "react";
import { useReducer } from "react";
import { Site } from "../../interfaces";
import { UiContext, uiReducer } from "./";

export interface UiState {
	isMenuOpen: boolean;
	isSearchOpen: boolean;
	isCartOpen: boolean;
	site: Site
}

const UI_INITIAL_STATE: UiState = {
	isMenuOpen: false,
	isSearchOpen: false,
	isCartOpen: false,
	site: {
		_id: "w",
		title: "Aviador",
		domain: "aviador.com",
		// logo: "https://res.cloudinary.com/dvcyhn0lj/image/upload/v1647095547/piccoletti-logo_j6hxbw.jpg",
		logo: "https://res.cloudinary.com/dvcyhn0lj/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1647700196/glass/zarla-ojo-de-aviador-1x1-2400x2400-20220209-b9jctd87gxk7k8vvfkpf_pkvxv9.png",
		numberPhone: "68175851",
		address: "av fatima",
		description: "tienda de lentes",
		type: "ecommerce",
		categories: [],
		pages: [],
	}
};

export const UiProvider = ({ children }: React.PropsWithChildren<{}>) => {
	const [site, setSite] = useState([]);
	const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);
	useEffect(() => {
		fetch(`${process.env.APIS_URL}/api/site/${process.env.API_SITE}`)
			.then(res => res.json())
			.then(data => {
				dispatch({
	 				type: '[UI] - initialSite',
					payload: data
				})
			})
	}, [])
	// useEffect(() => {
	//   fetch('http://localhost:8000/api/robots')
	//     .then(res => res.json())
	//     .then(data => {
	//       dispatch({
	// 				type: '[UI] - initialSite',
	//         payload: {
	//           ...UI_INITIAL_STATE,
	//           sites: data?.data,
	//         }
	//       });
	//     });
	// }, []);


	const toggleSideMenu = () => {
		dispatch({ type: "[UI] - ToggleMenu" });
	};
	const toggleSideSearch = () => {
		dispatch({ type: "[UI] - ToggleSearch" });
	};
	const toggleSideCart = () => {
		dispatch({ type: "[UI] - ToggleCart" });
	};

	return (
		<UiContext.Provider
			value={{
				...state,

				// Methods
				toggleSideMenu,
				toggleSideSearch,
				toggleSideCart,

			}}
		>
			{children}
		</UiContext.Provider>
	);
};
