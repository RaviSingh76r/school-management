"use client";

import React from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from "@nextui-org/react";

import LoginForm from "@/ui/auth/LoginForm";

import { useModal } from "@/context/modalContext";

const Page = () => {

  const {isOpen, setIsOpen} = useModal()

	return (
		<>
			<Modal
				backdrop="opaque"
				isOpen={isOpen}
				onOpenChange={()=>setIsOpen(false)}
				radius="lg"
				classNames={{
					body: "py-6",
					backdrop: "bg-black opacity-70",
					base: "border-[#292f46] bg-default-50 dark:bg-[#19172c] text-[#a8b0d3]",
					header: "border-b-[1px] border-[#292f46]",
					footer: "border-t-[1px] border-[#292f46]",
					closeButton: "hover:bg-white/5 active:bg-white/10",
				}}
				className="h-2/3"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1 h-2/3">
								Login to Account! 🙋‍♂️🙋‍♂️
							</ModalHeader>
							<ModalBody>
								<LoginForm/>
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onClick={()=>setIsOpen(false)}>
									Close
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default Page;
