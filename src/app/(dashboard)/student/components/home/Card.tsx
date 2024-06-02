"use client";

import React from "react";

// Next Ui Components
import {
	Card as NextUICard,
	CardHeader,
	CardBody,
	CardFooter,
	Skeleton,
} from "@nextui-org/react";

interface ICardProps {
	type?: string;
	icon?: any;
	value?: string;
	isLoaded?: boolean;
}

const Card: React.FC<ICardProps> = ({ icon: Icon, type, value, isLoaded }) => {
	return (
		<NextUICard className="min-w-36">
			<div className="w-full flex flex-col items-center justify-center bg-default-50">
				<CardHeader className="text-lg w-full flex items-center justify-center font-semibold text-default-900">
					<Skeleton isLoaded={isLoaded} className="w-full rounded-lg text-center" >{type}</Skeleton>
				</CardHeader>
				<CardBody className="text-4xl m-0 p-0 w-full flex items-center justify-center">
					<Skeleton isLoaded={isLoaded} className="w-1/2 h-1/2 rounded-lg flex items-center justify-center">
						<Icon />
					</Skeleton>
				</CardBody>
				<CardFooter className="text-xl w-full flex items-center justify-center font-semibold text-default-900">
					<Skeleton isLoaded={isLoaded} className="w-1/2 rounded-lg text-center" >{value}</Skeleton>
				</CardFooter>
			</div>
		</NextUICard>
	);
};

export default Card;
