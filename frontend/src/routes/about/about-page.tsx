import "./about.styles.css";

const AboutPage = () => {
	return (
		<div className="about-container">
			<section>
				<div className="intro-container">
					<h1>About</h1>
					<h2>What is kagiChat?</h2>
					<p>
						kagiChat is our computer science capstone project. We want to
						demonstrate how end-to-end encryption could be implemented within a
						messenger app, as well as the consequences for not having encryption
						at all.
					</p>
				</div>
				<div className="background-container">
					<h2>What cryptography methods are we using?</h2>
					<p>
						As of right now, we are using P256 curve from ECC to create the key
						pairs, Delfie-Hellman key exchange to create a shared secret, and
						AES for encrypting the text.
					</p>
				</div>
			</section>
		</div>
	);
};

export default AboutPage;
