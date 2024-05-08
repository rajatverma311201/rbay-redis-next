interface AboutPageProps {}

const AboutPage: React.FC<AboutPageProps> = ({}) => {
    return (
        <>
            <h1 className="text-center text-3xl font-bold md:text-4xl">
                About Us
            </h1>

            <p>RBay lets your auction off your unused stuff</p>
        </>
    );
};
export default AboutPage;
