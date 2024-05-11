interface NotFoundPageProps {}

const NotFoundPage: React.FC<NotFoundPageProps> = ({}) => {
    return (
        <>
            <div className="flex h-full items-center justify-center bg-gray-100">
                <div className="space-y-4 p-4 text-center">
                    <h1 className="text-4xl font-bold text-gray-800">404</h1>
                    <p className="text-lg text-gray-600">Page not found</p>
                </div>
            </div>
        </>
    );
};
export default NotFoundPage;
