import React from "react";
import {
	Table,
	TableHeader,
	TableRow,
	TableColumn,
	Tooltip,
	User,
	Link,
	TableBody,
	TableCell,
	Avatar,
} from "@nextui-org/react";
import { EditIcon, DeleteIcon, EyeIcon } from "@/components/icons";

const AssignmentTable = () => {
	const columns = [
		{ name: "TEACHER", uid: "teacher" },
		{ name: "ASSIGNMENT", uid: "assignment" },
		{ name: "DUE DATE", uid: "dueDate" },
		{ name: "ACTIONS", uid: "actions" },
	];

	const assignments = [
		{
			id: 1,
			teacher: {
				name: "John Doe",
				avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
			},
			assignment: {
				title: "Math Homework",
				link: "https://example.com/assignment/1",
			},
			dueDate: "2024-06-01",
		},
		{
			id: 2,
			teacher: {
				name: "Jane Smith",
				avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
			},
			assignment: {
				title: "Science Project",
				link: "https://example.com/assignment/2",
			},
			dueDate: "2024-06-15",
		},
		// Add more data as needed
	];

	const renderCell = (item: any, columnKey: any) => {
		const cellValue = item[columnKey];
		switch (columnKey) {
			case "teacher":
				return (
					<Avatar
							as="button"
							color="secondary"
							size="md"
							src={item.teacher.avatar}
						/>
				);
			case "assignment":
				return (
					<Link
						href={item.assignment.link}
						target="_blank"
						rel="noopener noreferrer"
					>
						{item.assignment.title}
					</Link>
				);
			case "dueDate":
				return <span>{item.dueDate}</span>;
			case "actions":
				return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
          </div>
        );
			default:
				return cellValue;
		}
	};

	return (
		<Table aria-label="Assignments Table" className={"min-w-[100%] h-auto"}>
			<TableHeader columns={columns}>
				{(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
			</TableHeader>
			<TableBody items={assignments}>
				{(item) => (
					<TableRow key={item.id}>
						{(columnKey) => (
							<TableCell>{renderCell(item, columnKey)}</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};

export default AssignmentTable;
