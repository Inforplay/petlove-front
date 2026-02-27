import { Button, Drawer, Form, Input, Popconfirm, Table, Tag } from "antd";
import { useContext, useState } from "react";
import { useBuscarUsuario, useCriarUsuario, useDeletarUsuario, useEditarUsuario } from "../../hooks/UsuarioHooks";
import { AuthContext } from "../../contexts/AuthProvider";
import { LuPencil, LuTrash2 } from "react-icons/lu";

const Usuarios = () => {

    const [gavetaCriar, setGavetaCriar] = useState(false);
    const [gavetaEditar, setGavetaEditar] = useState(false);
    const { api } = useContext(AuthContext);
    const { data: usuarios = [] } = useBuscarUsuario();
    const { mutate: criarUsuario, isPending: criarPending } = useCriarUsuario();
    const { mutate: editarUsuario, isPending: editarPending } = useEditarUsuario();
    const { mutate: deletarUsuario, isPending: deletarPending } = useDeletarUsuario();

    const [formEditar] = Form.useForm();

    function criar(dados){
        criarUsuario(dados, {
            onSuccess: (response) => {
                api[response.type]({
                    description: response.description,
                    onClose: () => {
                        setGavetaCriar(false);
                    }
                })
            },
            onError: ({ type, description }) => {
                api[type]({
                    description
                })
            }
        })
    }

    function editar(dados){
        editarUsuario(dados, {
            onSuccess: (response) => {
                api[response.type]({
                    description: response.description,
                    onClose: () => {
                        setGavetaEditar(false);
                    }
                })
            },
            onError: ({ type, description }) => {
                api[type]({
                    description
                })
            }
        })
    }

    function deletar(id){
        deletarUsuario(id, {
            onSuccess: (response) => {
                api[response.type]({
                    description: response.description
                })
            },
            onError: ({ type, description }) => {
                api[type]({
                    description
                })
            }
        })
    }


    return (
        <div>
            <h2 className="text-xl mb-2 font-bold text-roxo">Usuários</h2>
            <Button
                onClick={() => setGavetaCriar(true)}
                className="w-full h-12! mb-4"
                shape="round"
                type="primary"
            >
                Novo usuário
            </Button>

            <div className="lg:hidden">
                <Table
                    dataSource={usuarios}
                    rowKey={"id"}
                >
                    <Table.Column 
                        title="Usuário"
                        render={(_, linha) => (
                            <div>
                                <Tag variant="outlined">{linha.id}</Tag>
                                <h6><strong>Nome:</strong> {linha.nome}</h6>
                                <h6><strong>Email:</strong> {linha.email}</h6>
                                <div className="flex justify-end gap-2">
                                    <Button
                                        icon={<LuPencil />}
                                        shape="circle"
                                        type="primary"
                                        onClick={() => {
                                            delete linha.senha;
                                            formEditar.setFieldsValue({ ...linha });
                                            setGavetaEditar(true);
                                        }}
                                    />
                                    <Popconfirm
                                        title="Aviso:"
                                        description="Deseja realmente apagar?"
                                        okText="Sim"
                                        cancelText="Não"
                                        onConfirm={() => deletar(linha.id)}
                                    >
                                        <Button
                                            icon={<LuTrash2 />}
                                            shape="circle"
                                            type="primary"
                                        />
                                    </Popconfirm>
                                </div>
                            </div>
                        )}
                    />
                </Table>
            </div>
            <div className="hidden lg:block">
                <Table
                    dataSource={usuarios}
                    rowKey={"id"}
                >
                    <Table.Column 
                        rowKey="id"
                        dataIndex={"id"}
                        title="Id"
                    />
                    <Table.Column 
                        rowKey="nome"
                        dataIndex={"nome"}
                        title="Nome"
                    />
                    <Table.Column 
                        rowKey="email"
                        dataIndex={"email"}
                        title="Email"
                    />
                    <Table.Column 
                        title="Ações"
                        render={(_, linha) => (
                            <div className="flex">
                                <Button
                                    icon={<LuPencil />}
                                    shape="circle"
                                    type="primary"
                                />
                                <Button
                                    icon={<LuTrash2 />}
                                    shape="circle"
                                    type="primary"
                                />
                            </div>
                        )}
                    />
                </Table>
            </div>

            <Drawer
                open={gavetaCriar}
                onClose={() => setGavetaCriar(false)}
                title="Criar"
            >
                <Form
                    onFinish={criar}
                >
                    <Form.Item
                        label={"Nome"}
                        name={"nome"}
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input className="pl-3!"/>
                    </Form.Item>
                    <Form.Item
                        label={"Email"}
                        name={"email"}
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input type="email" className="pl-3!"/>
                    </Form.Item>
                    <Form.Item
                        label={"Senha"}
                        name={"senha"}
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input className="pl-3!"/>
                    </Form.Item>
                    <Button
                        className="w-full h-12!"
                        shape="round"
                        type="primary"
                        htmlType="submit"
                        loading={criarPending}
                    >
                        Criar
                    </Button>
                </Form>
            </Drawer>

            <Drawer
                open={gavetaEditar}
                onClose={() => setGavetaEditar(false)}
                title="Editar"
            >
                <Form
                    onFinish={editar}
                    form={formEditar}
                >
                    <Form.Item
                        name={"id"}
                        hidden
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label={"Nome"}
                        name={"nome"}
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input className="pl-3!"/>
                    </Form.Item>
                    <Form.Item
                        label={"Email"}
                        name={"email"}
                        rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                        <Input type="email" className="pl-3!"/>
                    </Form.Item>
                    <Form.Item
                        label={"Senha"}
                        name={"senha"}
                    >
                        <Input className="pl-3!"/>
                    </Form.Item>
                    <Button
                        className="w-full h-12!"
                        shape="round"
                        type="primary"
                        htmlType="submit"
                        loading={editarPending}
                    >
                        Editar
                    </Button>
                </Form>
            </Drawer>
        </div>
    );
}

export default Usuarios;