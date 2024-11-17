// import useAuth from "@/hooks/useAuthContext";
import { Card, Heading } from "@chakra-ui/react";
// import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";

type MessengerCardProps = {
	merchantName: string;
	dateCreated: string;
	merchantUid: string;
}
const MessengerCard = ({ merchantName, dateCreated, merchantUid }: MessengerCardProps) => {
	// const { state } = useAuth();
	const navigate = useNavigate();
	const merchantCreatedDate = new Date(dateCreated);
	const formatDate = (date: Date): string => {
		const year = date.getFullYear();
		const month = date.getMonth();
		return `${month}/${year}`
	}
	const strMerchantCreatedDate: string = formatDate(merchantCreatedDate)

	const handleSelectMessenger = () => {
		// const [id1, id2] = [merchantUid, state.authUser?.uid].sort();
		// const conversationId = CryptoJS.SHA256(`${id1}-${id2}`).toString();
		// console.log(conversationId);
		navigate(`/${merchantUid}`);
	}

	return (
		<Card.Root size="sm" onClick={() => handleSelectMessenger()}>
			<Card.Header>
				<Heading size="md">{merchantName}</Heading>
			</Card.Header>
			<Card.Body color="fg.info">
				{`Member since ${strMerchantCreatedDate}`}
			</Card.Body>
		</Card.Root>
	);
};

export default MessengerCard;
