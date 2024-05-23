"use client";

import React from "react";

import Register from "./components/auth/Register";
import { Card, CardBody, Tabs, Tab } from "@nextui-org/react";
import Login from "./components/auth/Login";

const Page = () => {

	return (
		<div className="min-h-screen min-w-full flex items-center justify-center ">
			<div className="flex w-full flex-col min-h-screen justify-center">
				<Tabs color="primary" variant="bordered" radius="full" className="w-full pt-4 items-center justify-center">
					<Tab key="login" title="Login">
						<Card>
							<CardBody>
								<div className="min-w-full min-h-screen flex items-center justify-center">
                  <Login/>
                </div>
							</CardBody>
						</Card>
					</Tab>
					<Tab key="register" title="Register">
						<Card>
							<CardBody>
								<div className="min-w-full min-h-screen flex items-center justify-center">
                  <Register/>
                </div>
							</CardBody>
						</Card>
					</Tab>
				</Tabs>
			</div>
		</div>
	);
};

export default Page;
