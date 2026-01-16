import { Button, Form, Input } from "antd";
import logoImage from "../../assets/logo.png";

const Login = () => {
    return (
        <div className="h-screen bg-roxo flex justify-center items-center p-4">

            <Form className="w-full bg-areia rounded-[30px] px-4! py-12.5!">
                <img className="m-auto mb-10 mix-blend-multiply" src={logoImage} alt="logo do petlove" />
                <Form.Item
                    name={"email"}
                    rules={[{ required: true, message: "campo obrigatório!" }]}
                    label="E-mail"
                >
                    <Input placeholder="E-mail" className="px-4!"/>
                </Form.Item>
                <Form.Item
                    name={"senha"}
                    rules={[{ required: true, message: "Campo obrigatório" }]}
                    label="senha"
                >
                    <Input.Password placeholder="******" className="px-5!"/>
                </Form.Item>
                <div className="flex flex-col justify-center items-center gap-6.5">
                    <a href="/recuperar" className="font-bold text-roxo!">Esqueci minha senha</a>
                    <div className="text-center">
                        <Button shape="round" size="large" className="w-37.5" type="primary"> Logar </Button>
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default Login;