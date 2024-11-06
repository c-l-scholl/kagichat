import MessengerCard from "@/components/messenger-card";
import { useEffect, useState } from "react";

type Merchant = {
	merchantName: string;
	publicKey: string;
	uid: string;
	createdAt: string;
	// do not include password here
};

const MessengersPage = () => {
	const [merchants, setMerchants] = useState<Merchant[] | null>(null);

	useEffect(() => {
		// get merchants from db
		const getMerchants = async () => {
			const res = await fetch("/api/merchants");
			const data = (await res.json()) as Merchant[];
			console.log(data);
			setMerchants(data);
		};
		getMerchants();
	}, []);

	return (
		<div className="page-container">
			<header>
				<h1>Chats</h1>
			</header>
			<div className="messengers-container">
				{merchants &&
					merchants.map((merchant) => (
						<MessengerCard
							key={merchant.uid}
							merchantName={merchant.merchantName}
							dateCreated={merchant.createdAt}
						/>
					))}
			</div>
		</div>
	);
};

export default MessengersPage;
