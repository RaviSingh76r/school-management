"use client";

import React from "react";

// Next Ui Components
import {
	Card as NextUICard,
	CardHeader,
	CardBody,
	CardFooter,
} from "@nextui-org/react";

interface ICardProps {
	type?: string;
	icon?: any;
	value?: string;
}

const Card: React.FC<ICardProps> = ({ icon: Icon, type, value }) => {
	return (
		<NextUICard className="min-w-36">
			<div className="w-full flex flex-col items-center justify-center bg-default-50">
				<CardHeader className="text-lg w-full flex items-center justify-center font-semibold text-default-900">
					{type}
				</CardHeader>
				<CardBody className="text-4xl m-0 p-0 w-full flex items-center justify-center">
					<Icon />
				</CardBody>
				<CardFooter className="text-xl w-full flex items-center justify-center font-semibold text-default-900">
					{value}
				</CardFooter>
			</div>
		</NextUICard>
	);
};

export default Card;
