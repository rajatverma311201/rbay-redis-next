import { AuthForm } from "@/components/auth-form";

interface SignUpPageProps {}

const SignUpPage: React.FC<SignUpPageProps> = ({}) => {
    return (
        <>
            <AuthForm isSignUp={true} />
        </>
    );
};

export default SignUpPage;
