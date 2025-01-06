"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IContact } from "@/types/contact-types";
import { Archive, Calendar, Mail, MapPin, Phone, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function ContactDetails({ contact }: { contact: IContact }) {
	const [isEditing, setIsEditing] = useState(false);
	const [editedContact, setEditedContact] = useState(contact);

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleSave = () => {
		console.log("Saving updated contact:", editedContact);
		setIsEditing(false);
	};
	const cancelEdit = () => {
		console.log("Saving cancelled");
		setIsEditing(false);
	};

	const handleArchive = () => {
		console.log("Archive contact:", contact._id);
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setEditedContact((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<Card className="w-full ">
			<CardContent className="p-6">
				<div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 mb-6">
					{contact.profileImgURL && (
						<div className="relative w-32 h-32">
							<Image
								src={contact.profileImgURL}
								alt={`${contact.firstName} ${contact.lastName}`}
								layout="fill"
								objectFit="cover"
								className="rounded-full border-4 border-primary"
							/>
						</div>
					)}
					<div className="text-center md:text-left">
						<h2 className="text-3xl font-bold text-primary">{`${contact.firstName} ${contact.lastName}`}</h2>
						<p className="text-xl text-muted-foreground">{contact.type}</p>
					</div>
				</div>

				{isEditing ? (
					<form className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<Label htmlFor="firstName">First Name</Label>
								<Input
									id="firstName"
									name="firstName"
									value={editedContact.firstName}
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<Label htmlFor="lastName">Last Name</Label>
								<Input
									id="lastName"
									name="lastName"
									value={editedContact.lastName}
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									name="email"
									type="email"
									value={editedContact.email}
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<Label htmlFor="phone">Phone</Label>
								<Input
									id="phone"
									name="phone"
									value={editedContact.phone}
									onChange={handleInputChange}
								/>
							</div>
						</div>
						<div>
							<Label htmlFor="address">Address</Label>
							<Textarea
								id="address"
								name="address"
								value={editedContact.address}
								onChange={handleInputChange}
							/>
						</div>
					</form>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<InfoItem
							icon={<Mail className="w-5 h-5" />}
							label="Email"
							value={contact.email}
						/>
						<InfoItem
							icon={<Phone className="w-5 h-5" />}
							label="Phone"
							value={contact.phone}
						/>
						<InfoItem
							icon={<MapPin className="w-5 h-5" />}
							label="Address"
							value={contact.address}
						/>
						<InfoItem
							icon={<User className="w-5 h-5" />}
							label="Created By"
							value={contact.createdBy.email}
						/>
						{contact.createdAt && (
							<InfoItem
								icon={<Calendar className="w-5 h-5" />}
								label="Created At"
								value={new Date(contact.createdAt).toLocaleDateString()}
							/>
						)}
						{contact.updatedAt && (
							<InfoItem
								icon={<Calendar className="w-5 h-5" />}
								label="Updated At"
								value={new Date(contact.updatedAt).toLocaleDateString()}
							/>
						)}

						<InfoItem
							icon={<Archive className="w-5 h-5" />}
							label="Archived"
							value={contact.archive ? "Yes" : "No"}
						/>
					</div>
				)}
			</CardContent>
			<CardFooter className="flex justify-end space-x-2 bg-secondary p-4">
				{isEditing ? (
					<>
						<Button onClick={handleSave}>Save</Button>
						<Button onClick={cancelEdit} variant="destructive">
							Cancel
						</Button>
					</>
				) : (
					<>
						<Button onClick={handleEdit}>Edit</Button>
						<Dialog>
							<DialogTrigger asChild>
								<Button variant="destructive">Archive</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>
										Are you sure you want to archive this contact?
									</DialogTitle>
								</DialogHeader>
								<div className="flex justify-end space-x-2 mt-4">
									<Button variant="outline" onClick={() => {}}>
										Cancel
									</Button>
									<Button variant="destructive" onClick={handleArchive}>
										Archive
									</Button>
								</div>
							</DialogContent>
						</Dialog>
					</>
				)}
			</CardFooter>
		</Card>
	);
}

function InfoItem({
	icon,
	label,
	value,
}: {
	icon: React.ReactNode;
	label: string;
	value?: string;
}) {
	return (
		<div className="flex items-center space-x-2">
			<div className="text-primary">{icon}</div>
			<div>
				<p className="text-sm font-medium text-muted-foreground">{label}</p>
				<p className="text-base">{value || "N/A"}</p>
			</div>
		</div>
	);
}
