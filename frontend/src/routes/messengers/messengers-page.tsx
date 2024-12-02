import MessengerCard from "@/components/messenger-card";
import useAuth from "@/hooks/useAuthContext";
import { useEffect, useState } from "react";
import { MerchantType } from "@/utils/types";
import LogoutButton from "@/components/logout-button";
import "./messengers.styles.css";


const MessengersPage = () => {
	const [merchants, setMerchants] = useState<MerchantType[] | null>(null);
	const { state } = useAuth();

	useEffect(() => {
		// get merchants from db
		const getMerchants = async () => {
			const res = await fetch("/api/merchants");
			const data = (await res.json()) as MerchantType[];
			const merchantData = data.filter((merchant) => merchant.uid !== state.authUser?.uid)
			setMerchants(merchantData);
		};
		getMerchants();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="page-container">
			<header className="messengers-header">
				<h1>Chats</h1>
				<LogoutButton />
			</header>
			<div className="messengers-container">
				{merchants &&
					merchants.map((merchant) => (
						<MessengerCard
							key={merchant.uid}
							merchantName={merchant.merchantName}
							dateCreated={merchant.createdAt}
							merchantUid={merchant.uid}
						/>
					))}
			</div>
		</div>
	);
};

export default MessengersPage;
