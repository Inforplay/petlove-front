import { useMutation, useQuery } from "@tanstack/react-query"
import { AXIOS, QUERYCLIENT } from "../services"

export const useLogin = () => {
    return useMutation({
        mutationFn: async (data) => {
            const response = await AXIOS.post("/login", data);
            return response.data
        }
    })
}

export const useBuscarUsuario = () => {
    return useQuery({
        queryKey: ["usuarios"],
        queryFn: async () => {
            const response = await AXIOS.get("/usuarios");
            return response.data
        }
    });
}

export const useCriarUsuario = () => {
    return useMutation({
        mutationFn: async (data) => {
            const response = await AXIOS.post("/usuarios", data);
            return response.data
        },
        onSuccess: () => {
            QUERYCLIENT.invalidateQueries({
                queryKey: ["usuarios"]
            });
        }
    });
}

export const useEditarUsuario = () => {
    return useMutation({
        mutationFn: async (data) => {
            const response = await AXIOS.post(`/usuarios/${data.id}`, data);
            return response.data
        },
        onSuccess: () => {
            QUERYCLIENT.invalidateQueries({
                queryKey: ["usuarios"]
            });
        }
    });
}

export const useDeletarUsuario = () => {
    return useMutation({
        mutationFn: async (id) => {
            const response = await AXIOS.delete(`/usuarios/${id}`);
            return response.data
        },
        onSuccess: () => {
            QUERYCLIENT.invalidateQueries({
                queryKey: ["usuarios"]
            });
        }
    });
}