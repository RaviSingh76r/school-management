"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface IModalContextProps {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
}

export const modalContext = createContext<IModalContextProps>({
	isOpen: false,
	setIsOpen: () => {},
});

export const ModalContextProvider = ({ children }: { children: ReactNode }) => {
	const [isOpen, setIsOpen] = useState(false); // Correct initial state

	return (
		<modalContext.Provider value={{isOpen, setIsOpen}}>
			{children}
		</modalContext.Provider>
	);
};

export const useModal = () => {
  const {isOpen, setIsOpen} = useContext(modalContext);
  return {isOpen, setIsOpen};
}
