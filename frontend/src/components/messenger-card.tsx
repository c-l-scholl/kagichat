import { Card, Heading } from "@chakra-ui/react";

type MessengerCardProps = {
	merchantName: string;
	dateCreated: string;
}
const MessengerCard = ({ merchantName, dateCreated }: MessengerCardProps) => {

	const merchantCreatedDate = new Date(dateCreated);
	const formatDate = (date: Date): string => {
		const year = date.getFullYear();
		const month = date.getMonth();
		return `${month}/${year}`
	}
	const strMerchantCreatedDate: string = formatDate(merchantCreatedDate)
	return (
		<Card.Root size="sm">
			<Card.Header>
				<Heading size="md">{merchantName}</Heading>
			</Card.Header>
			<Card.Body color="fg.muted">
				{`Member since ${strMerchantCreatedDate}`}
			</Card.Body>
		</Card.Root>
	);
};

export default MessengerCard;
